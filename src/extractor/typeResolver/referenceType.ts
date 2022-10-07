import ts, { isJSDocDeprecatedTag } from "typescript";
import { GenerateMetadataError } from "../exceptions";
import { getJSDocDescription } from "../jsDoc";
import { getSymbolAtLocation } from "../typeChecker";
import { Tspec } from "../../types/tspec";

const nodeIsUsable = (node: ts.Node): node is Tspec.UsableDeclarationWithoutPropertySignature => {
  switch (node.kind) {
    case ts.SyntaxKind.InterfaceDeclaration:
    case ts.SyntaxKind.ClassDeclaration:
    case ts.SyntaxKind.TypeAliasDeclaration:
    case ts.SyntaxKind.EnumDeclaration:
    case ts.SyntaxKind.EnumMember:
      return true;
    default:
      return false;
  }
}

export const contextualizedName = (name: string, context: Tspec.Context): string => {
  return name;
  // FIXME: infinite loop
  // return Object.entries(context).reduce((acc, [key, entry]) => {
  //   return acc
  //     .replace(new RegExp(`<\\s*([^>]*\\s)*\\s*(${key})(\\s[^>]*)*\\s*>`, 'g'), `<$1${entry.getText()}$3>`)
  //     .replace(new RegExp(`<\\s*([^,]*\\s)*\\s*(${key})(\\s[^,]*)*\\s*,`, 'g'), `<$1${entry.getText()}$3,`)
  //     .replace(new RegExp(`,\\s*([^>]*\\s)*\\s*(${key})(\\s[^>]*)*\\s*>`, 'g'), `,$1${entry.getText()}$3>`)
  //     .replace(new RegExp(`<\\s*([^<]*\\s)*\\s*(${key})(\\s[^<]*)*\\s*<`, 'g'), `<$1${entry.getText()}$3<`);
  // }, name);
}

export const getRefTypeName = (name: string): string => {
  return encodeURIComponent(
    name
      .replace(/<|>/g, '_')
      .replace(/\s+/g, '')
      .replace(/,/g, '.')
      .replace(/'([^']*)'/g, '$1')
      .replace(/"([^"]*)"/g, '$1')
      .replace(/&/g, '-and-')
      .replace(/\|/g, '-or-')
      .replace(/\[\]/g, '-Array')
      .replace(/{|}/g, '_') // SuccessResponse_{indexesCreated-number}_ -> SuccessResponse__indexesCreated-number__
      .replace(/([a-z]+):([a-z]+)/gi, '$1-$2') // SuccessResponse_indexesCreated:number_ -> SuccessResponse_indexesCreated-number_
      .replace(/;/g, '--')
      .replace(/([a-z]+)\[([a-z]+)\]/gi, '$1-at-$2'), // Partial_SerializedDatasourceWithVersion[format]_ -> Partial_SerializedDatasourceWithVersion~format~_,
  );
}

export const typeArgumentsToContext = (
  type: ts.TypeReferenceNode | ts.ExpressionWithTypeArguments, targetEntity: ts.EntityName,
  current: Tspec.Current, context: Tspec.Context): Tspec.Context => {
  const declaration = getModelTypeDeclaration(targetEntity, current);
  const typeParameters = 'typeParameters' in declaration ? declaration.typeParameters : undefined;

  if (typeParameters) {
    for (let index = 0; index < typeParameters.length; index++) {
      const typeParameter = typeParameters[index];
      const typeArg = type.typeArguments && type.typeArguments[index];
      let resolvedType: ts.TypeNode;

      // Argument may be a forward reference from context
      if (typeArg && ts.isTypeReferenceNode(typeArg) && ts.isIdentifier(typeArg.typeName) && context[typeArg.typeName.text]) {
        resolvedType = context[typeArg.typeName.text];
      } else if (typeArg) {
        resolvedType = typeArg;
      } else if (typeParameter.default) {
        resolvedType = typeParameter.default;
      } else {
        throw new GenerateMetadataError(`Could not find a value for type parameter ${typeParameter.name.text}`, type);
      }

      context[typeParameter.name.text] = resolvedType
    }
  }
  return context;
}

export const getModelTypeDeclaration = (type: ts.EntityName, current: Tspec.Current) => {
  const typeName = type.kind === ts.SyntaxKind.Identifier ? type.text : type.right.text;

  const symbol = getSymbolAtLocation(type, current.typeChecker);
  const declarations = symbol?.getDeclarations();

  if (!declarations) {
    throw new GenerateMetadataError(`No declarations found for referenced type ${typeName}.`);
  }

  let modelTypes = declarations.filter((node): node is Tspec.UsableDeclarationWithoutPropertySignature => {
    return nodeIsUsable(node) && node.name?.getText() === typeName;
  });

  if (!modelTypes.length) {
    throw new GenerateMetadataError(`No matching model found for referenced type ${typeName}.`);
  }

  if (modelTypes.length > 1) {
    // remove types that are from typescript e.g. 'Account'
    modelTypes = modelTypes.filter(modelType => {
      return modelType.getSourceFile().fileName.replace(/\\/g, '/').toLowerCase().indexOf('node_modules/typescript') <= -1;
    });
  }
  if (modelTypes.length > 1) {
    const conflicts = modelTypes.map(modelType => modelType.getSourceFile().fileName).join('"; "');
    throw new GenerateMetadataError(`Multiple matching models found for referenced type ${typeName}; please make model names unique. Conflicts found: "${conflicts}".`);
  }

  return modelTypes[0];
}

const hasFlag = (type: ts.Symbol | ts.Declaration, flag: any) => {
  return (type.flags & flag) === flag;
}

export const getEnumerateType = (typeName: ts.EntityName, current: Tspec.Current): Tspec.RefEnumType | undefined => {
  const enumName = (typeName as ts.Identifier).text;

  const symbol = getSymbolAtLocation(typeName, current.typeChecker);

  // resolve value
  let declaredType = (current.typeChecker.getDeclaredTypeOfSymbol(symbol)?.symbol || symbol) as ts.Symbol & { parent?: ts.Symbol };

  // if we are a EnumMember, return parent instead (this happens if a enum has only one entry, not quite sure why though...)
  if (hasFlag(declaredType, ts.SymbolFlags.EnumMember) && declaredType.parent?.valueDeclaration?.kind === ts.SyntaxKind.EnumDeclaration) {
    declaredType = declaredType.parent;
  }

  const declarations = declaredType.getDeclarations();

  if (!declarations) {
    return;
  }

  let enumNodes = declarations.filter((node): node is ts.EnumDeclaration => {
    return ts.isEnumDeclaration(node) && node.name.getText() === enumName;
  });

  if (!enumNodes.length) {
    return;
  }

  if (enumNodes.length > 1) {
    throw new GenerateMetadataError(`Multiple matching enum found for enum ${enumName}; please make enum names unique.`);
  }

  const enumDeclaration = enumNodes[0];

  const isNotUndefined = <T>(item: T): item is Exclude<T, undefined> => {
    return item === undefined ? false : true;
  };

  const enums = enumDeclaration.members.map(e => current.typeChecker.getConstantValue(e)).filter(isNotUndefined);
  const enumVarnames = enumDeclaration.members.map(e => e.name.getText()).filter(isNotUndefined);

  return {
    typeName: 'refEnum',
    description: getJSDocDescription(enumDeclaration, current.typeChecker),
    enums,
    enumVarnames,
    refName: enumName,
    deprecated: isJSDocDeprecatedTag(enumDeclaration),
  };
}

export const createCircularDependencyResolver = (refName: string, current: Tspec.Current) => {
  const referenceType = {
    typeName: 'refObject',
    refName,
  } as Tspec.ReferenceType;

  // current.OnFinish(referenceTypes => {
  //   const realReferenceType = referenceTypes[refName];
  //   if (!realReferenceType) {
  //     return;
  //   }
  //   referenceType.description = realReferenceType.description;
  //   if (realReferenceType.dataType === 'refObject' && referenceType.dataType === 'refObject') {
  //     referenceType.properties = realReferenceType.properties;
  //   }
  //   referenceType.dataType = realReferenceType.dataType;
  //   referenceType.refName = realReferenceType.refName;
  // });

  return referenceType;
}
