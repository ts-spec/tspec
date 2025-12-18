import * as ts from 'typescript';
import * as glob from 'glob';

import {
  NestControllerMetadata,
  NestMethodMetadata,
  NestParameterMetadata,
  NestParserOptions,
  ParsedNestApp,
  HttpMethod,
} from './types';

const HTTP_METHOD_DECORATORS = ['Get', 'Post', 'Put', 'Patch', 'Delete', 'Options', 'Head'];
const PARAM_DECORATORS = ['Param', 'Query', 'Body', 'Headers'];

export const parseNestControllers = (options: NestParserOptions): ParsedNestApp => {
  const { tsconfigPath, controllerGlobs } = options;

  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(`Failed to read tsconfig: ${configFile.error.messageText}`);
  }

  const parsedConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    process.cwd(),
  );

  const files = controllerGlobs.flatMap((pattern) =>
    glob.sync(pattern, { ignore: ['**/node_modules/**'] })
  );

  const program = ts.createProgram(files, parsedConfig.options);
  const checker = program.getTypeChecker();

  const controllers: NestControllerMetadata[] = [];
  const imports = new Map<string, string>();

  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) continue;
    if (!files.some((f) => sourceFile.fileName.includes(f.replace(/\*/g, '')))) continue;

    ts.forEachChild(sourceFile, (node) => {
      if (ts.isClassDeclaration(node)) {
        const controller = parseController(node, checker, sourceFile);
        if (controller) {
          controllers.push(controller);
          collectImports(sourceFile, imports);
        }
      }
    });
  }

  return { controllers, imports };
};

const parseController = (
  node: ts.ClassDeclaration,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
): NestControllerMetadata | null => {
  const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
  if (!decorators) return null;

  const controllerDecorator = decorators.find((d) =>
    ts.isCallExpression(d.expression) &&
    ts.isIdentifier(d.expression.expression) &&
    d.expression.expression.text === 'Controller'
  );

  if (!controllerDecorator) return null;

  const controllerPath = getDecoratorStringArg(controllerDecorator);
  const className = node.name?.text || 'UnnamedController';

  const methods: NestMethodMetadata[] = [];

  node.members.forEach((member) => {
    if (ts.isMethodDeclaration(member)) {
      const method = parseMethod(member, checker);
      if (method) {
        methods.push(method);
      }
    }
  });

  return {
    name: className,
    path: controllerPath || '',
    filePath: sourceFile.fileName,
    methods,
  };
};

const parseMethod = (
  node: ts.MethodDeclaration,
  checker: ts.TypeChecker,
): NestMethodMetadata | null => {
  const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
  if (!decorators) return null;

  let httpMethod: HttpMethod | null = null;
  let methodPath = '';

  for (const decorator of decorators) {
    if (!ts.isCallExpression(decorator.expression)) continue;
    if (!ts.isIdentifier(decorator.expression.expression)) continue;

    const decoratorName = decorator.expression.expression.text;
    if (HTTP_METHOD_DECORATORS.includes(decoratorName)) {
      httpMethod = decoratorName.toLowerCase() as HttpMethod;
      methodPath = getDecoratorStringArg(decorator) || '';
      break;
    }
  }

  if (!httpMethod) return null;

  const methodName = ts.isIdentifier(node.name) ? node.name.text : 'unknownMethod';
  const parameters = parseParameters(node, checker);
  const returnType = getReturnType(node, checker);

  const jsDocTags = ts.getJSDocTags(node);
  const description = getJsDocDescription(node);
  const summary = jsDocTags.find((t) => t.tagName.text === 'summary')?.comment?.toString();
  const tags = jsDocTags
    .filter((t) => t.tagName.text === 'tag')
    .map((t) => t.comment?.toString())
    .filter((t): t is string => !!t);

  return {
    name: methodName,
    httpMethod,
    path: methodPath,
    parameters,
    returnType,
    description,
    summary,
    tags: tags.length > 0 ? tags : undefined,
  };
};

const parseParameters = (
  node: ts.MethodDeclaration,
  checker: ts.TypeChecker,
): NestParameterMetadata[] => {
  const params: NestParameterMetadata[] = [];

  node.parameters.forEach((param) => {
    const decorators = ts.canHaveDecorators(param) ? ts.getDecorators(param) : undefined;
    if (!decorators) return;

    for (const decorator of decorators) {
      if (!ts.isCallExpression(decorator.expression)) continue;
      if (!ts.isIdentifier(decorator.expression.expression)) continue;

      const decoratorName = decorator.expression.expression.text;
      if (!PARAM_DECORATORS.includes(decoratorName)) continue;

      const category = decoratorName.toLowerCase() as NestParameterMetadata['category'];
      const paramName = ts.isIdentifier(param.name) ? param.name.text : 'unknown';
      const fieldName = getDecoratorStringArg(decorator) || paramName;
      const paramType = getTypeString(param.type, checker);
      const required = !param.questionToken;

      params.push({
        name: category === 'body' ? paramName : fieldName,
        type: paramType,
        category,
        required,
      });
      break;
    }
  });

  return params;
};

const getDecoratorStringArg = (decorator: ts.Decorator): string | undefined => {
  if (!ts.isCallExpression(decorator.expression)) return undefined;
  const args = decorator.expression.arguments;
  if (args.length === 0) return undefined;

  const firstArg = args[0];
  if (ts.isStringLiteral(firstArg)) {
    return firstArg.text;
  }
  return undefined;
};

const getReturnType = (node: ts.MethodDeclaration, checker: ts.TypeChecker): string => {
  if (node.type) {
    return getTypeString(node.type, checker);
  }

  const signature = checker.getSignatureFromDeclaration(node);
  if (signature) {
    const returnType = checker.getReturnTypeOfSignature(signature);
    return checker.typeToString(returnType);
  }

  return 'void';
};

const getTypeString = (
  typeNode: ts.TypeNode | undefined,
  checker: ts.TypeChecker,
): string => {
  if (!typeNode) return 'any';

  if (ts.isTypeReferenceNode(typeNode)) {
    const typeName = typeNode.typeName;
    if (ts.isIdentifier(typeName)) {
      const name = typeName.text;
      if (name === 'Promise' && typeNode.typeArguments?.length) {
        return getTypeString(typeNode.typeArguments[0], checker);
      }
      return name;
    }
  }

  const type = checker.getTypeFromTypeNode(typeNode);
  return checker.typeToString(type);
};

const getJsDocDescription = (node: ts.Node): string | undefined => {
  const jsDocComments = (node as any).jsDoc as ts.JSDoc[] | undefined;
  if (!jsDocComments?.length) return undefined;

  const comment = jsDocComments[0].comment;
  if (typeof comment === 'string') return comment;
  if (Array.isArray(comment)) {
    return comment.map((c) => (typeof c === 'string' ? c : c.text)).join('');
  }
  return undefined;
};

const collectImports = (
  sourceFile: ts.SourceFile,
  imports: Map<string, string>,
): void => {
  sourceFile.statements.forEach((stmt) => {
    if (ts.isImportDeclaration(stmt)) {
      const moduleSpecifier = stmt.moduleSpecifier;
      if (!ts.isStringLiteral(moduleSpecifier)) return;

      const importPath = moduleSpecifier.text;
      const importClause = stmt.importClause;
      if (!importClause) return;

      if (importClause.name) {
        imports.set(importClause.name.text, importPath);
      }

      const namedBindings = importClause.namedBindings;
      if (namedBindings && ts.isNamedImports(namedBindings)) {
        namedBindings.elements.forEach((element) => {
          imports.set(element.name.text, importPath);
        });
      }
    }
  });
};
