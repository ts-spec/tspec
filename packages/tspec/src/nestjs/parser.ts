import * as ts from 'typescript';
import { globSync } from 'glob';

import {
  NestControllerMetadata,
  NestMethodMetadata,
  NestParameterMetadata,
  NestParserOptions,
  ParsedNestApp,
  HttpMethod,
  TypeDefinition,
  PropertyDefinition,
  EnumDefinition,
  NestApiResponse,
} from './types';

const HTTP_METHOD_DECORATORS = ['Get', 'Post', 'Put', 'Patch', 'Delete', 'Options', 'Head'];
const PARAM_DECORATORS = ['Param', 'Query', 'Body', 'Headers'];
const FILE_DECORATORS = ['UploadedFile', 'UploadedFiles'];

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
    globSync(pattern, { ignore: ['**/node_modules/**'] })
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

  // Collect type definitions from all source files
  const typeDefinitions = new Map<string, TypeDefinition>();
  const typesToResolve = new Set<string>();

  // Collect all type names used in controllers
  for (const controller of controllers) {
    for (const method of controller.methods) {
      collectTypeNames(method.returnType, typesToResolve);
      for (const param of method.parameters) {
        collectTypeNames(param.type, typesToResolve);
      }
    }
  }

  // Resolve type and enum definitions with multiple passes to handle nested types
  const enumDefinitions = new Map<string, EnumDefinition>();
  const allEnums = new Map<string, ts.EnumDeclaration>();
  const allTypes = new Map<string, ts.ClassDeclaration | ts.InterfaceDeclaration>();
  const allTypeAliases = new Map<string, ts.TypeAliasDeclaration>();

  // First pass: collect all type/enum declarations (including .d.ts files for Prisma enums)
  // Also collect Prisma-style const enums
  const prismaConstEnums = new Map<string, string[]>(); // enumName -> values

  // Helper to recursively visit all nodes
  const visitNode = (node: ts.Node) => {
    if (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
      const typeName = node.name?.text;
      if (typeName && !allTypes.has(typeName)) {
        allTypes.set(typeName, node);
      }
    }
    if (ts.isTypeAliasDeclaration(node)) {
      if (!allTypeAliases.has(node.name.text)) {
        allTypeAliases.set(node.name.text, node);
      }
    }
    if (ts.isEnumDeclaration(node)) {
      if (!allEnums.has(node.name.text)) {
        allEnums.set(node.name.text, node);
      }
    }
    // Handle Prisma-style const enum: export const Gender: { MALE: 'MALE', ... }
    if (ts.isVariableStatement(node)) {
      const declaration = node.declarationList.declarations[0];
      if (declaration && ts.isIdentifier(declaration.name) && declaration.type) {
        const enumName = declaration.name.text;
        if (ts.isTypeLiteralNode(declaration.type)) {
          const values: string[] = [];
          declaration.type.members.forEach((member) => {
            if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
              // Check if the type is a string literal
              if (member.type && ts.isLiteralTypeNode(member.type) && 
                  ts.isStringLiteral(member.type.literal)) {
                values.push(member.type.literal.text);
              }
            }
          });
          if (values.length > 0 && !prismaConstEnums.has(enumName)) {
            prismaConstEnums.set(enumName, values);
          }
        }
      }
    }
    ts.forEachChild(node, visitNode);
  };

  for (const sourceFile of program.getSourceFiles()) {
    // Skip node_modules except for .prisma/client (where Prisma generates enums)
    const fileName = sourceFile.fileName;
    if (fileName.includes('node_modules') && !fileName.includes('.prisma/client')) {
      continue;
    }

    visitNode(sourceFile);
  }

  // Second pass: resolve types and collect nested type references
  const resolveTypes = () => {
    let newTypesFound = false;
    
    for (const typeName of typesToResolve) {
      if (typeDefinitions.has(typeName) || enumDefinitions.has(typeName)) continue;

      const typeNode = allTypes.get(typeName);
      if (typeNode) {
        const typeDef = parseTypeDefinition(typeNode, checker);
        if (typeDef) {
          typeDefinitions.set(typeName, typeDef);
          // Collect nested types from properties
          for (const prop of typeDef.properties) {
            const prevSize = typesToResolve.size;
            collectTypeNames(prop.type, typesToResolve);
            if (typesToResolve.size > prevSize) newTypesFound = true;
          }
        }
      }

      const typeAliasNode = allTypeAliases.get(typeName);
      if (typeAliasNode) {
        const typeDef = parseTypeAliasDefinition(typeAliasNode, checker);
        if (typeDef) {
          typeDefinitions.set(typeName, typeDef);
          for (const prop of typeDef.properties) {
            const prevSize = typesToResolve.size;
            collectTypeNames(prop.type, typesToResolve);
            if (typesToResolve.size > prevSize) newTypesFound = true;
          }
        }
      }

      const enumNode = allEnums.get(typeName);
      if (enumNode) {
        const enumDef = parseEnumDefinition(enumNode);
        if (enumDef) {
          enumDefinitions.set(typeName, enumDef);
        }
      }

      // Check Prisma-style const enums
      const prismaEnumValues = prismaConstEnums.get(typeName);
      if (prismaEnumValues) {
        enumDefinitions.set(typeName, {
          name: typeName,
          values: prismaEnumValues,
          description: `Prisma enum ${typeName}`,
        });
      }
    }

    return newTypesFound;
  };

  // Keep resolving until no new types are found
  let maxIterations = 10;
  while (resolveTypes() && maxIterations-- > 0) {
    // Continue resolving nested types
  }

  return { controllers, imports, typeDefinitions, enumDefinitions };
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

  // Parse @ApiTags decorator
  const tags = parseApiTags(decorators, checker);

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
    tags,
  };
};

// Parse @ApiResponse decorators to extract response definitions
const parseApiResponses = (
  decorators: readonly ts.Decorator[],
  checker: ts.TypeChecker,
): NestApiResponse[] => {
  const responses: NestApiResponse[] = [];

  for (const decorator of decorators) {
    if (!ts.isCallExpression(decorator.expression)) continue;
    if (!ts.isIdentifier(decorator.expression.expression)) continue;

    const decoratorName = decorator.expression.expression.text;
    if (decoratorName !== 'ApiResponse') continue;

    const args = decorator.expression.arguments;
    if (args.length === 0) continue;

    const firstArg = args[0];
    if (!ts.isObjectLiteralExpression(firstArg)) continue;

    let status: number | undefined;
    let description: string | undefined;
    let type: string | undefined;

    for (const prop of firstArg.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      if (!ts.isIdentifier(prop.name)) continue;

      const propName = prop.name.text;
      const propValue = prop.initializer;

      switch (propName) {
        case 'status':
          if (ts.isNumericLiteral(propValue)) {
            status = parseInt(propValue.text, 10);
          }
          break;
        case 'description':
          if (ts.isStringLiteral(propValue)) {
            description = propValue.text;
          }
          break;
        case 'type':
          if (ts.isIdentifier(propValue)) {
            type = propValue.text;
          } else if (ts.isArrayLiteralExpression(propValue) && propValue.elements.length > 0) {
            const firstElement = propValue.elements[0];
            if (ts.isIdentifier(firstElement)) {
              type = `${firstElement.text}[]`;
            }
          }
          break;
      }
    }

    if (status !== undefined) {
      responses.push({ status, description, type });
    }
  }

  return responses;
};

// Parse @ApiTags decorator to extract tag names
const parseApiTags = (
  decorators: readonly ts.Decorator[],
  checker: ts.TypeChecker,
): string[] | undefined => {
  const apiTagsDecorator = decorators.find((d) =>
    ts.isCallExpression(d.expression) &&
    ts.isIdentifier(d.expression.expression) &&
    d.expression.expression.text === 'ApiTags'
  );

  if (!apiTagsDecorator || !ts.isCallExpression(apiTagsDecorator.expression)) {
    return undefined;
  }

  const args = apiTagsDecorator.expression.arguments;
  const tags: string[] = [];

  for (const arg of args) {
    if (ts.isStringLiteral(arg)) {
      tags.push(arg.text);
    } else if (ts.isPropertyAccessExpression(arg)) {
      // Handle enum-like access: ApiTag.MY_FOOD -> resolve to actual value
      const type = checker.getTypeAtLocation(arg);
      if (type.isStringLiteral()) {
        tags.push(type.value);
      } else if (ts.isIdentifier(arg.name)) {
        // Fallback to member name if value can't be resolved
        tags.push(arg.name.text);
      }
    } else if (ts.isIdentifier(arg)) {
      // Handle variable reference - try to resolve value
      const type = checker.getTypeAtLocation(arg);
      if (type.isStringLiteral()) {
        tags.push(type.value);
      } else {
        tags.push(arg.text);
      }
    }
  }

  return tags.length > 0 ? tags : undefined;
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

  // Parse @ApiResponse decorators
  const responses = parseApiResponses(decorators, checker);

  return {
    name: methodName,
    httpMethod,
    path: methodPath,
    parameters,
    returnType,
    description,
    summary,
    tags: tags.length > 0 ? tags : undefined,
    responses: responses.length > 0 ? responses : undefined,
  };
};

const parseParameters = (
  node: ts.MethodDeclaration,
  checker: ts.TypeChecker,
): NestParameterMetadata[] => {
  const params: NestParameterMetadata[] = [];

  // Extract file field name from @UseInterceptors(FileInterceptor('fieldName')) or FilesInterceptor
  const fileFieldName = extractFileFieldName(node);

  node.parameters.forEach((param) => {
    const decorators = ts.canHaveDecorators(param) ? ts.getDecorators(param) : undefined;
    if (!decorators) return;

    for (const decorator of decorators) {
      if (!ts.isCallExpression(decorator.expression)) continue;
      if (!ts.isIdentifier(decorator.expression.expression)) continue;

      const decoratorName = decorator.expression.expression.text;
      
      // Handle file upload decorators
      if (FILE_DECORATORS.includes(decoratorName)) {
        const paramName = ts.isIdentifier(param.name) ? param.name.text : 'file';
        const isMultiple = decoratorName === 'UploadedFiles';
        const required = !param.questionToken;

        params.push({
          name: paramName,
          type: isMultiple ? 'File[]' : 'File',
          category: isMultiple ? 'files' : 'file',
          required,
          fieldName: fileFieldName || (isMultiple ? 'files' : 'file'),
        });
        break;
      }
      
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

// Extract field name from @UseInterceptors(FileInterceptor('fieldName')) or FilesInterceptor
const extractFileFieldName = (node: ts.MethodDeclaration): string | undefined => {
  const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
  if (!decorators) return undefined;

  for (const decorator of decorators) {
    if (!ts.isCallExpression(decorator.expression)) continue;
    if (!ts.isIdentifier(decorator.expression.expression)) continue;

    const decoratorName = decorator.expression.expression.text;
    if (decoratorName !== 'UseInterceptors') continue;

    // Look for FileInterceptor or FilesInterceptor in the arguments
    for (const arg of decorator.expression.arguments) {
      if (!ts.isCallExpression(arg)) continue;
      if (!ts.isIdentifier(arg.expression)) continue;

      const interceptorName = arg.expression.text;
      if (interceptorName === 'FileInterceptor' || interceptorName === 'FilesInterceptor') {
        // First argument is the field name
        const fieldNameArg = arg.arguments[0];
        if (fieldNameArg && ts.isStringLiteral(fieldNameArg)) {
          return fieldNameArg.text;
        }
      }
    }
  }

  return undefined;
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
      // Unwrap Promise types
      if (name === 'Promise' && typeNode.typeArguments?.length) {
        return getTypeString(typeNode.typeArguments[0], checker);
      }
      // Handle generic types with type arguments (e.g., DataResponse<T>)
      if (typeNode.typeArguments?.length) {
        const typeArgs = typeNode.typeArguments.map((arg) => getTypeString(arg, checker)).join(', ');
        return `${name}<${typeArgs}>`;
      }
      return name;
    }
  }

  // Handle array types
  if (ts.isArrayTypeNode(typeNode)) {
    const elementType = getTypeString(typeNode.elementType, checker);
    return `${elementType}[]`;
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

interface JsDocTags {
  example?: unknown;
  format?: string;
  deprecated?: boolean;
  nullable?: boolean;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  default?: unknown;
}

const getJsDocTags = (node: ts.Node): JsDocTags => {
  const jsDocComments = (node as any).jsDoc as ts.JSDoc[] | undefined;
  if (!jsDocComments?.length) return {};

  const tags: JsDocTags = {};
  
  for (const jsDoc of jsDocComments) {
    if (!jsDoc.tags) continue;
    
    for (const tag of jsDoc.tags) {
      const tagName = tag.tagName.text.toLowerCase();
      const tagComment = typeof tag.comment === 'string' 
        ? tag.comment 
        : Array.isArray(tag.comment) 
          ? tag.comment.map((c: any) => (typeof c === 'string' ? c : c.text)).join('')
          : undefined;
      
      switch (tagName) {
        case 'example':
          // Try to parse as JSON, otherwise keep as string
          if (tagComment) {
            try {
              tags.example = JSON.parse(tagComment);
            } catch {
              tags.example = tagComment;
            }
          }
          break;
        case 'format':
          tags.format = tagComment;
          break;
        case 'deprecated':
          tags.deprecated = true;
          break;
        case 'nullable':
          tags.nullable = true;
          break;
        case 'minimum':
          if (tagComment) tags.minimum = Number(tagComment);
          break;
        case 'maximum':
          if (tagComment) tags.maximum = Number(tagComment);
          break;
        case 'minlength':
          if (tagComment) tags.minLength = Number(tagComment);
          break;
        case 'maxlength':
          if (tagComment) tags.maxLength = Number(tagComment);
          break;
        case 'pattern':
          tags.pattern = tagComment;
          break;
        case 'default':
          if (tagComment) {
            try {
              tags.default = JSON.parse(tagComment);
            } catch {
              tags.default = tagComment;
            }
          }
          break;
      }
    }
  }
  
  return tags;
};

// Helper function to collect type names from a type string
const collectTypeNames = (typeStr: string, typesToResolve: Set<string>): void => {
  // Remove Promise wrapper
  const unwrapped = typeStr.replace(/^Promise<(.+)>$/, '$1');
  
  // Handle union types like "Gender | null" or "string | number"
  if (unwrapped.includes(' | ')) {
    const parts = unwrapped.split(' | ').map((p) => p.trim());
    for (const part of parts) {
      collectTypeNames(part, typesToResolve);
    }
    return;
  }
  
  // Handle array types
  const arrayMatch = unwrapped.match(/^(.+)\[\]$/) || unwrapped.match(/^Array<(.+)>$/);
  if (arrayMatch) {
    collectTypeNames(arrayMatch[1], typesToResolve);
    return;
  }

  // Handle generic types like DataResponse<T>
  const genericMatch = unwrapped.match(/^(\w+)<(.+)>$/);
  if (genericMatch) {
    typesToResolve.add(genericMatch[1]);
    collectTypeNames(genericMatch[2], typesToResolve);
    return;
  }

  // Skip primitive types
  const primitives = ['string', 'number', 'boolean', 'void', 'any', 'unknown', 'null', 'undefined'];
  if (!primitives.includes(unwrapped.toLowerCase())) {
    typesToResolve.add(unwrapped);
  }
};

// Parse class or interface declaration to TypeDefinition
const parseTypeDefinition = (
  node: ts.ClassDeclaration | ts.InterfaceDeclaration,
  checker: ts.TypeChecker,
): TypeDefinition | null => {
  const typeName = node.name?.text;
  if (!typeName) return null;

  const properties: PropertyDefinition[] = [];
  const description = getJsDocDescription(node);

  node.members.forEach((member) => {
    if (ts.isPropertyDeclaration(member) || ts.isPropertySignature(member)) {
      const propName = ts.isIdentifier(member.name) ? member.name.text : undefined;
      if (!propName) return;

      const propType = getTypeString(member.type, checker);
      const required = !member.questionToken;
      const propDescription = getJsDocDescription(member);
      const jsDocTags = getJsDocTags(member);

      // Check if it's an array type
      const isArray = propType.endsWith('[]') || propType.startsWith('Array<');

      properties.push({
        name: propName,
        type: propType,
        required,
        description: propDescription,
        isArray,
        ...jsDocTags,
      });
    }
  });

  return { name: typeName, properties, description };
};

// Parse type alias declaration to TypeDefinition
const parseTypeAliasDefinition = (
  node: ts.TypeAliasDeclaration,
  checker: ts.TypeChecker,
): TypeDefinition | null => {
  const typeName = node.name.text;
  const description = getJsDocDescription(node);

  // Handle object type literals
  if (ts.isTypeLiteralNode(node.type)) {
    const properties: PropertyDefinition[] = [];

    node.type.members.forEach((member) => {
      if (ts.isPropertySignature(member)) {
        const propName = ts.isIdentifier(member.name) ? member.name.text : undefined;
        if (!propName) return;

        const propType = getTypeString(member.type, checker);
        const required = !member.questionToken;
        const propDescription = getJsDocDescription(member);
        const isArray = propType.endsWith('[]') || propType.startsWith('Array<');

        properties.push({
          name: propName,
          type: propType,
          required,
          description: propDescription,
          isArray,
        });
      }
    });

    return { name: typeName, properties, description };
  }

  // For other type aliases, return empty properties
  return { name: typeName, properties: [], description };
};

// Parse enum declaration to EnumDefinition
const parseEnumDefinition = (node: ts.EnumDeclaration): EnumDefinition | null => {
  const enumName = node.name.text;
  const description = getJsDocDescription(node);
  const values: string[] = [];

  node.members.forEach((member) => {
    if (member.initializer) {
      if (ts.isStringLiteral(member.initializer)) {
        values.push(member.initializer.text);
      } else if (ts.isNumericLiteral(member.initializer)) {
        values.push(member.initializer.text);
      }
    } else if (ts.isIdentifier(member.name)) {
      // For enums without explicit values, use the member name
      values.push(member.name.text);
    }
  });

  return { name: enumName, values, description };
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
