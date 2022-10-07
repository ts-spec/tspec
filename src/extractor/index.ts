import ts from "typescript";
import fs from "fs"
import { ApiSpec } from "../types/DefineApiSpec";
import { resolve } from "./typeResolver";

const isNodeExported = (node: ts.Node): boolean =>
  (ts.getCombinedModifierFlags(node as ts.Declaration) &
    ts.ModifierFlags.Export) !==
    0 ||
  (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);

type ParsedSpec = {
  name: string;
  method: string;
  url: string;
  description: string;
};

type ParsedSpecBase = Pick<ParsedSpec, "name"> &
  Partial<Omit<ParsedSpec, "name">>;

type SpecPropertyParser = (type: ts.Type) => any;

const parseString = (type: ts.Type): string => {
  if (!type.isStringLiteral()) {
    throw new Error(`not a string!`);
  }
  return type.value;
};

const parseStringTuple = (type: ts.TupleType): string[] => {
  if (!type.typeArguments) {
    throw new Error(`not a tuple!`);
  }

  return type.typeArguments.map(parseString);
};

const SpecPropertyParsers = {
  url: parseString,
  summary: parseString,
  description: parseString,
  tags: parseStringTuple,
  auth: parseString,
} as Record<keyof ApiSpec, SpecPropertyParser>;

const getVisitor = (
  typeChecker: ts.TypeChecker
): [(node: ts.Node) => void, ParsedSpec[]] => {
  const specRegistry: ParsedSpec[] = [];
  const visitor = (node: ts.Node) => {
    if (!isNodeExported(node)) {
      return;
    }

    if (
      !ts.isTypeAliasDeclaration(node) ||
      !ts.isTypeReferenceNode(node.type)
    ) {
      return;
    }

    // // TODO Assert node is kind of DefineApiSpec
    // // We might brand DefineApiSpec, and access is branded using the type checker

    const output = resolve({ typeNode: node.type, current: { typeChecker } });
    fs.writeFileSync("output2.json", JSON.stringify(output, undefined, 2));

    // const specName = node.name.text;
    // const [specNode] = node.type.typeArguments ?? [];
    // if (!specNode || !ts.isTypeNode(specNode)) {
    //   return;
    // }

    // const specType = typeChecker.getTypeFromTypeNode(specNode);
    // const properties = specType.getProperties();

    // const baseSpec: ParsedSpecBase = { name: specName };
    // const spec = properties.reduce((builtSpec, property) => {
    //   const declaration = property.valueDeclaration;
    //   if (
    //     !declaration ||
    //     !ts.isPropertySignature(declaration) ||
    //     !declaration.type
    //   ) {
    //     throw new Error(
    //       `Cannot parse badly defined property: ${specName}::${property.name}`
    //     );
    //   }

    //   const declarationType = typeChecker.getTypeFromTypeNode(declaration.type);
    //   if (!(property.name in SpecPropertyParsers)) {
    //     return builtSpec;
    //   }

    //   const parseSpecProperty = SpecPropertyParsers[property.name as keyof ApiSpec];
      
    //   try {
    //     const parsedValue = parseSpecProperty(declarationType);
    //     return {
    //       ...builtSpec,
    //       [property.name]: parsedValue,
    //     };
    //   } catch (error) {
    //     throw new Error(
    //       `Cannot parse property ${specName}::${property.name}: ${error}`
    //     );
    //   }
    // }, baseSpec) as ParsedSpec;

    // // TODO check if the spec is well-defined
    // specRegistry.push(spec);
  };

  return [visitor, specRegistry];
};

export const extract = (program: ts.Program) => {
  const [visitor, specRegistry] = getVisitor(program.getTypeChecker());

  const entryPoints = program
    .getRootFileNames()
    .map((entryPointName) => program.getSourceFile(entryPointName));

  for (const sourceFile of entryPoints) {
    if (!sourceFile) continue;
    ts.forEachChild(sourceFile, visitor);
  }
  // console.log(specRegistry);
};


