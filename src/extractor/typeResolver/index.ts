import ts, { isJSDocDeprecatedTag } from "typescript";
import { GenerateMetadataError, GenerateMetaDataWarning } from "../exceptions";
import { getJSDocDescription, getJSDocExample, getJSDocFormat } from "../jsDoc";
import { getClassProperties } from "./classType";
import { getDateType, getLiteralValue, getPrimitiveType } from "./primitiveType";
import { contextualizedName, createCircularDependencyResolver, getEnumerateType, getModelTypeDeclaration, getRefTypeName, typeArgumentsToContext } from "./referenceType";
import { Tspec } from "../../types/tspec";

export const resolve = (params: Tspec.ResolveParamsBase): Tspec.Type => {
  const { typeNode, current, parentNode, context = {}, referencer } = params;
  const primitiveType = getPrimitiveType(typeNode, parentNode);
  if (primitiveType) {
    return primitiveType;
  }

  if (typeNode.kind === ts.SyntaxKind.NullKeyword) {
    return <Tspec.EnumType>{
      typeName: 'enum',
      enums: [null],
    };
  }

  if (typeNode.kind === ts.SyntaxKind.UndefinedKeyword) {
    return <Tspec.UndefinedType>{
      typeName: 'undefined',
    };
  }

  if (ts.isArrayTypeNode(typeNode)) {
    return <Tspec.ArrayType>{
      typeName: 'array',
      itemType: resolve({ typeNode: typeNode.elementType, current, parentNode, context }),
    };
  }

  if (ts.isTupleTypeNode(typeNode)) {
    return <Tspec.TupleType>{
      typeName: 'tuple',
      types: typeNode.elements.map(elementType => resolve({ typeNode: elementType, current, parentNode, context})),
    };
  }

  if (ts.isUnionTypeNode(typeNode)) {
    return <Tspec.UnionType>{
      typeName: 'union',
      types: typeNode.types.map(type => {
        return resolve({ typeNode: type, current, parentNode, context });
      }),
    };
  }

  if (ts.isIntersectionTypeNode(typeNode)) {
    return <Tspec.IntersectionType>{
      typeName: 'intersection',
      types: typeNode.types.map(type => {
        return resolve({ typeNode: type, current, parentNode, context });
      }),
    };
  }

  if (typeNode.kind === ts.SyntaxKind.AnyKeyword || typeNode.kind === ts.SyntaxKind.UnknownKeyword) {
    return <Tspec.AnyType> {
      typeName: 'any',
    };
  }

  if (ts.isLiteralTypeNode(typeNode)) {
    return <Tspec.EnumType>{
      typeName: 'enum',
      enums: [getLiteralValue(typeNode)],
    };
  }

  if (ts.isTypeLiteralNode(typeNode)) {
    return resolveTypeLiteralNode({ typeNode, current, parentNode, context, referencer });
  }

  if (typeNode.kind === ts.SyntaxKind.ObjectKeyword) {
    return <Tspec.ObjectsNoPropsType>{ typeName: 'object' };
  }

  if (ts.isMappedTypeNode(typeNode) && referencer) {
    return resolveMappedTypeNode({ typeNode, current, parentNode, context, referencer });
  }

  if (ts.isConditionalTypeNode(typeNode) && referencer && ts.isTypeReferenceNode(referencer)) {
    return resolveConditionalTypeNode({ typeNode, current, parentNode, context, referencer });
  }

  // keyof
  if (ts.isTypeOperatorNode(typeNode) && typeNode.operator === ts.SyntaxKind.KeyOfKeyword) {
    return resolveKeyofTypeNode({ typeNode, current, parentNode, context, referencer });
  }

  // Handle `readonly` arrays
  if (ts.isTypeOperatorNode(typeNode) && typeNode.operator === ts.SyntaxKind.ReadonlyKeyword) {
    return resolve({
      typeNode: typeNode.type,
      current, parentNode: typeNode, context, referencer,
    });
  }

  if (ts.isIndexedAccessTypeNode(typeNode)) {
    const result = resolveIndexedAccessTypeNode({ typeNode, current, parentNode, context, referencer });
    if (result) {
      return result;
    }
  }

  if (ts.isTemplateLiteralTypeNode(typeNode)) {
    const type = current.typeChecker.getTypeFromTypeNode(referencer || typeNode);
    if (type.isUnion() && type.types.every(unionElementType => unionElementType.isStringLiteral())) {
      const stringLiteralEnum: Tspec.EnumType = {
        typeName: 'enum',
        enums: (type.types as ts.StringLiteralType[]).map((stringLiteralType) => stringLiteralType.value),
      };
      return stringLiteralEnum;
    } else {
      throw new GenerateMetadataError(`Could not the type of ${current.typeChecker.typeToString(current.typeChecker.getTypeFromTypeNode(typeNode), typeNode)}`, typeNode);
    }
  }

  if (ts.isParenthesizedTypeNode(typeNode)) {
    return resolve({
      typeNode: typeNode.type,
      current, parentNode: typeNode, context, referencer,
    });
  }

  if (typeNode.kind === ts.SyntaxKind.TypeReference) {
    return resolveTypeReferenceNode({ typeNode: typeNode as ts.TypeReferenceNode, current, parentNode, context, referencer });
  }

  throw new GenerateMetadataError(`Unknown type: ${ts.SyntaxKind[typeNode.kind]}`, typeNode);
}


const resolveTypeLiteralNode = ({ typeNode, current, parentNode, context }: Tspec.ResolveTypeLiteralParams): Tspec.NestedObjectLiteralType => {
    const properties: Tspec.Property[] = typeNode.members
    .filter(ts.isPropertySignature)
    .map((propertySignature) => {
      return {
        ...buildBaseProperty(propertySignature, current),
        name: (propertySignature.name as ts.Identifier).text,
        required: !propertySignature.questionToken,
        type: resolve({
          typeNode: propertySignature.type as ts.TypeNode,
          current, parentNode: propertySignature, context
        }),
      };
    });

  const indexMember = typeNode.members.find(member => ts.isIndexSignatureDeclaration(member));
  let additionalType: Tspec.Type | undefined;

  if (indexMember) {
    const indexSignatureDeclaration = indexMember as ts.IndexSignatureDeclaration;
    const indexType = resolve({
      typeNode: indexSignatureDeclaration.parameters[0].type as ts.TypeNode,
      current, parentNode, context
    });
    if (indexType.typeName !== 'string') {
      throw new GenerateMetadataError(`Only string indexers are supported.`, typeNode);
    }

    additionalType = resolve({
      typeNode: indexSignatureDeclaration.type,
      current, parentNode, context
    });
  }

  const objLiteral: Tspec.NestedObjectLiteralType = {
    additionalProperties: indexMember && additionalType,
    typeName: 'nestedObjectLiteral',
    properties,
  };
  return objLiteral;
}

const resolveMappedTypeNode = ({ typeNode, current, context, referencer }: Tspec.ResolveMappedTypeParams): Tspec.NestedObjectLiteralType => {
  const type = current.typeChecker.getTypeFromTypeNode(referencer);
  const mappedTypeNode = typeNode;
  const getDeclaration = (prop: ts.Symbol) => prop.declarations && (prop.declarations[0] as ts.Declaration | undefined);
  const properties: Tspec.Property[] = type
    .getProperties()
    // Transform to property
    .map(property => {
      const propertyType = current.typeChecker.getTypeOfSymbolAtLocation(property, typeNode);
      const declaration = getDeclaration(property) as ts.PropertySignature | ts.PropertyDeclaration | ts.ParameterDeclaration | undefined;

      if (declaration && ts.isPropertySignature(declaration)) {
        return { ...propertyFromSignature(declaration, current, context, mappedTypeNode.questionToken), name: property.getName() };
      } else if (declaration && (ts.isPropertyDeclaration(declaration) || ts.isParameter(declaration))) {
        return { ...propertyFromDeclaration(declaration, current, context, mappedTypeNode.questionToken), name: property.getName() };
      }

      // Resolve default value, required and typeNode
      let required = false;
      const propertyTypeNode = current.typeChecker.typeToTypeNode(propertyType, undefined, ts.NodeBuilderFlags.NoTruncation)!;
      if (mappedTypeNode.questionToken && mappedTypeNode.questionToken.kind === ts.SyntaxKind.MinusToken) {
        required = true;
      } else if (mappedTypeNode.questionToken && mappedTypeNode.questionToken.kind === ts.SyntaxKind.QuestionToken) {
        required = false;
      }

      // Push property
      return {
        name: property.getName(),
        required,
        // Mapped types with any amount of indirection (template strings, unions, Exclude<>, etc.)
        // don't provide an underlying declaration in the AST, thus we cannot know if the original
        // property is deprecated. This matches intellisense's behavior in vscode.
        deprecated: false,
        type: resolve({
          typeNode: propertyTypeNode,
          current, parentNode: typeNode, context, referencer
        }),
      };
    });

  return {
    typeName: 'nestedObjectLiteral',
    properties,
  };
}

const resolveKeyofTypeNode = ({ typeNode, current, context, referencer }: Tspec.ResolveKeyofTypeParams): Tspec.EnumType => {
  const type = current.typeChecker.getTypeFromTypeNode(typeNode);

  if (type.isUnion()) {
    const literals = type.types
      .filter((t): t is ts.LiteralType => t.isLiteral())
      .map(t => t.value.toString());

    // Warn on nonsense (`number`, `typeof Symbol.iterator`)
    if (type.types.find(t => !t.isLiteral()) !== undefined) {
      const problems = type.types.filter(t => !t.isLiteral()).map(t => current.typeChecker.typeToString(t));
      console.warn(new GenerateMetaDataWarning(`Skipped non-literal type(s) ${problems.join(', ')}`, typeNode).toString());
    }

    return {
      typeName: 'enum',
      enums: literals,
    };
  } else if (type.isLiteral()) {
    return {
      typeName: 'enum',
      enums: [type.value.toString()],
    };
  } else if ((type.getFlags() & ts.TypeFlags.Never) !== 0) {
    throw new GenerateMetadataError(`TypeOperator 'keyof' on node produced a never type`, typeNode);
  } else {
    const warning = new GenerateMetaDataWarning(
      `Couldn't resolve keyof reliably, please check the resulting type carefully.
        Reason: Type was not a literal or an array of literals.`,
      typeNode,
    );

    console.warn(warning.toString());

    try {
      return resolve({
        typeNode: current.typeChecker.typeToTypeNode(type, undefined, ts.NodeBuilderFlags.NoTruncation)!,
        current, parentNode: typeNode, context, referencer,
      }) as unknown as any;
    } catch (err) {
      const indexedTypeName = current.typeChecker.typeToString(current.typeChecker.getTypeFromTypeNode(typeNode.type));
      throw new GenerateMetadataError(`Could not determine the keys on ${indexedTypeName}`, typeNode);
    }
  }
}

const resolveConditionalTypeNode = ({ typeNode, current, context, referencer }: Tspec.ResolveConditionalTypeParams): Tspec.Type => {
  throw new Error('Not implemented');
  //   const type = current.typeChecker.getTypeFromTypeNode(referencer);
  //   if (type.aliasSymbol) {
  //     let declaration = type.aliasSymbol.declarations?.[0] as ts.TypeAliasDeclaration | ts.EnumDeclaration | ts.DeclarationStatement;
  //     if (declaration.name) {
  //       declaration = getModelTypeDeclaration(declaration.name as ts.EntityName) as ts.TypeAliasDeclaration | ts.EnumDeclaration | ts.DeclarationStatement;
  //     }
  //     const name = getRefTypeName(referencer.getText());
  //     return handleCachingAndCircularReferences(name, () => {
  //       if (ts.isTypeAliasDeclaration(declaration)) {
  //         // Note: I don't understand why typescript lose type for `referencer` (from above with isTypeReferenceNode())
  //         return getTypeAliasReference(declaration, current.typeChecker.typeToString(type), referencer as ts.TypeReferenceNode);
  //       } else if (ts.isEnumDeclaration(declaration)) {
  //         return getEnumerateType(declaration.name) as RefEnumType;
  //       } else {
  //         throw new GenerateMetadataError(
  //           `Couldn't resolve Conditional to TypeNode. If you think this should be resolvable, please file an Issue. We found an aliasSymbol and it's declaration was of kind ${declaration.kind}`,
  //           typeNode,
  //         );
  //       }
  //     });
  //   } else if (type.isClassOrInterface()) {
  //     let declaration = type.symbol.declarations?.[0] as ts.InterfaceDeclaration | ts.ClassDeclaration;
  //     if (declaration.name) {
  //       declaration = getModelTypeDeclaration(declaration.name) as ts.InterfaceDeclaration | ts.ClassDeclaration;
  //     }
  //     const name = getRefTypeName(referencer.getText());
  //     return handleCachingAndCircularReferences(name, () => getModelReference(declaration, current.typeChecker.typeToString(type)));
  //   } else {
  //     try {
  //       return resolve({
  //         typeNode: current.typeChecker.typeToTypeNode(type, undefined, ts.NodeBuilderFlags.NoTruncation)!,
  //         current, parentNode: typeNode, context, referencer,
  //       });
  //     } catch {
  //       throw new GenerateMetadataError(
  //         `Couldn't resolve Conditional to TypeNode. If you think this should be resolvable, please file an Issue. The flags on the result of the ConditionalType was ${type.flags}`,
  //         typeNode,
  //       );
  //     }
  //   }
}

const resolveIndexedAccessTypeNode = ({ typeNode, current, context, referencer }: Tspec.ResolveIndexedAccessTypeParams): Tspec.Type | undefined => {
  // Indexed by keyword
  if ((typeNode.indexType.kind === ts.SyntaxKind.NumberKeyword || typeNode.indexType.kind === ts.SyntaxKind.StringKeyword)) {
    const numberIndexType = typeNode.indexType.kind === ts.SyntaxKind.NumberKeyword;
    const objectType = current.typeChecker.getTypeFromTypeNode(typeNode.objectType);
    const type = numberIndexType ? objectType.getNumberIndexType() : objectType.getStringIndexType();
    if (type === undefined) {
      throw new GenerateMetadataError(`Could not determine ${numberIndexType ? 'number' : 'string'} index on ${current.typeChecker.typeToString(objectType)}`, typeNode);
    }
    return resolve({
      typeNode: current.typeChecker.typeToTypeNode(type, undefined, ts.NodeBuilderFlags.NoTruncation)!,
      current, parentNode: typeNode, context, referencer,
    });
  }
  
  // Indexed by literal
  if (
    ts.isLiteralTypeNode(typeNode.indexType) &&
    (ts.isStringLiteral(typeNode.indexType.literal) || ts.isNumericLiteral(typeNode.indexType.literal))
  ) {
    const hasType = (node: ts.Node | undefined): node is ts.HasType => node !== undefined && Object.prototype.hasOwnProperty.call(node, 'type');
    const symbol = current.typeChecker.getPropertyOfType(current.typeChecker.getTypeFromTypeNode(typeNode.objectType), typeNode.indexType.literal.text);
    if (symbol === undefined) {
      throw new GenerateMetadataError(
        `Could not determine the keys on ${current.typeChecker.typeToString(current.typeChecker.getTypeFromTypeNode(typeNode.objectType))}`,
        typeNode,
      );
    }
    if (hasType(symbol.valueDeclaration) && symbol.valueDeclaration.type) {
      return resolve({
        typeNode: symbol.valueDeclaration.type,
        current, parentNode: typeNode, context, referencer,
      });
    }
    const declaration = current.typeChecker.getTypeOfSymbolAtLocation(symbol, typeNode.objectType);
    try {
      return resolve({
        typeNode: current.typeChecker.typeToTypeNode(declaration, undefined, ts.NodeBuilderFlags.NoTruncation)!,
        current, parentNode: typeNode, context, referencer,
      });
    } catch {
      throw new GenerateMetadataError(
        `Could not determine the keys on ${current.typeChecker.typeToString(
          current.typeChecker.getTypeFromTypeNode(current.typeChecker.typeToTypeNode(declaration, undefined, ts.NodeBuilderFlags.NoTruncation)!),
        )}`,
        typeNode,
      );
    }
  }

  // Indexed by keyof typeof value
  if (ts.isTypeOperatorNode(typeNode.indexType) && typeNode.indexType.operator === ts.SyntaxKind.KeyOfKeyword) {
    const resolveParenthesis = (node: ts.TypeNode) => (ts.isParenthesizedTypeNode(node) ? node.type : node);
    const objectType = resolveParenthesis(typeNode.objectType);
    const indexType = typeNode.indexType.type;
    const isSameTypeQuery = ts.isTypeQueryNode(objectType) && ts.isTypeQueryNode(indexType) && objectType.exprName.getText() === indexType.exprName.getText();
    const isSameTypeReference = ts.isTypeReferenceNode(objectType) && ts.isTypeReferenceNode(indexType) && objectType.typeName.getText() === indexType.typeName.getText();
    if (isSameTypeQuery || isSameTypeReference) {
      const type = current.typeChecker.getTypeFromTypeNode(referencer || typeNode);
      const node = current.typeChecker.typeToTypeNode(type, undefined, ts.NodeBuilderFlags.InTypeAlias | ts.NodeBuilderFlags.NoTruncation)!;
      return resolve({
        typeNode: node,
        current, parentNode: typeNode, context, referencer,
      });
    }
  }

  return undefined;
}

const resolveTypeReferenceNode = ({ typeNode, current, context, parentNode }: Tspec.ResolveTypeReferenceParams): Tspec.Type => {
  const typeReference = typeNode;
  if (typeReference.typeName.kind === ts.SyntaxKind.Identifier) {
    if (typeReference.typeName.text === 'Date') {
      return getDateType(parentNode);
    }

    if (typeReference.typeName.text === 'Buffer') {
      const bufferMetaType: Tspec.BufferType = { typeName: 'buffer' };
      return bufferMetaType;
    }

    if (typeReference.typeName.text === 'Readable') {
      const streamMetaType: Tspec.BufferType = { typeName: 'buffer' };
      return streamMetaType;
    }

    if (typeReference.typeName.text === 'Array' && typeReference.typeArguments && typeReference.typeArguments.length === 1) {
      const arrayMetaType: Tspec.ArrayType = {
        typeName: 'array',
        itemType: resolve({
          typeNode: typeReference.typeArguments[0], current, parentNode, context
        }),
      };
      return arrayMetaType;
    }

    if (typeReference.typeName.text === 'Promise' && typeReference.typeArguments && typeReference.typeArguments.length === 1) {
      return resolve({
        typeNode: typeReference.typeArguments[0], current, parentNode, context
      });
    }

    if (typeReference.typeName.text === 'String') {
      const stringMetaType: Tspec.StringType = { typeName: 'string' };
      return stringMetaType;
    }

    if (context[typeReference.typeName.text]) {
      return resolve({
        typeNode: context[typeReference.typeName.text], current, parentNode, context
      });
    }
  }

  const referenceType = getReferenceType(typeReference, current, context, parentNode);

  // current.AddReferenceType(referenceType);
  return referenceType;
}

const buildBaseProperty = (
  typeNode: ts.Node,
  current: Tspec.Current,
) => {
  return {
    example: getJSDocExample(typeNode),
    description: getJSDocDescription(typeNode, current.typeChecker),
    format: getJSDocFormat(typeNode),
    deprecated: isJSDocDeprecatedTag(typeNode),
  };
}

type OverrideToken = ts.Token<ts.SyntaxKind.QuestionToken> | ts.Token<ts.SyntaxKind.PlusToken> | ts.Token<ts.SyntaxKind.MinusToken> | undefined;
const propertyFromSignature = (
  propertySignature: ts.PropertySignature,
  current: Tspec.Current,
  context: Tspec.Context,
  overrideToken?: OverrideToken,
) => {
  const identifier = propertySignature.name as ts.Identifier;

  if (!propertySignature.type) {
    throw new GenerateMetadataError(`No valid type found for property declaration.`);
  }

  let required = !propertySignature.questionToken;
  if (overrideToken && overrideToken.kind === ts.SyntaxKind.MinusToken) {
    required = true;
  } else if (overrideToken && overrideToken.kind === ts.SyntaxKind.QuestionToken) {
    required = false;
  }

  const property: Tspec.Property = {
    ...buildBaseProperty(propertySignature, current),
    name: identifier.text,
    required,
    type: resolve({
      typeNode: propertySignature.type,
      current,
      parentNode: propertySignature.type.parent,
      context,
      referencer:  propertySignature.type
    }),
  };
  return property;
}

const propertyFromDeclaration = (
  propertyDeclaration: ts.PropertyDeclaration | ts.ParameterDeclaration,
  current: Tspec.Current,
  context: Tspec.Context,
  overrideToken?: OverrideToken,
) => {
  const identifier = propertyDeclaration.name as ts.Identifier;
  let typeNode = propertyDeclaration.type;

  if (!typeNode) {
    const tsType = current.typeChecker.getTypeAtLocation(propertyDeclaration);
    typeNode = current.typeChecker.typeToTypeNode(tsType, undefined, ts.NodeBuilderFlags.NoTruncation);
  }

  if (!typeNode) {
    throw new GenerateMetadataError(`No valid type found for property declaration.`);
  }

  const type = resolve({
    typeNode,
    current,
    parentNode: propertyDeclaration,
    context,
    referencer: typeNode,
  });

  let required = !propertyDeclaration.questionToken && !propertyDeclaration.initializer;
  if (overrideToken && overrideToken.kind === ts.SyntaxKind.MinusToken) {
    required = true;
  } else if (overrideToken && overrideToken.kind === ts.SyntaxKind.QuestionToken) {
    required = false;
  }

  const property: Tspec.Property = {
    ...buildBaseProperty(propertyDeclaration, current),
    name: identifier.text,
    required,
    type,
  };
  return property;
}

const localReferenceTypeCache: { [typeName: string]: Tspec.ReferenceType } = {};
const inProgressTypes: { [typeName: string]: boolean } = {};

const getReferenceType = (node: ts.TypeReferenceType, current: Tspec.Current, context: Tspec.Context, parentNode?: ts.Node): Tspec.ReferenceType => {
  let type: ts.EntityName;
  if (ts.isTypeReferenceNode(node)) {
    type = node.typeName;
  } else if (ts.isExpressionWithTypeArguments(node)) {
    type = node.expression as ts.EntityName;
  } else {
    throw new GenerateMetadataError(`Can't resolve Reference type.`);
  }

  // Can't invoke getText on Synthetic Nodes
  let resolvableName = node.pos !== -1 ? node.getText() : (type as ts.Identifier).text;
  if (node.pos === -1 && 'typeArguments' in node && Array.isArray(node.typeArguments)) {
    // Add typearguments for Synthetic nodes (e.g. Record<> in TestClassModel.indexedResponse)
    const argumentsString = node.typeArguments.map(arg => {
      if (ts.isLiteralTypeNode(arg)) {
        return `'${String(getLiteralValue(arg))}'`;
      }
      const resolved = getPrimitiveType(arg);
      if (!resolved) return 'any';
      return resolved.typeName;
    });
    resolvableName += `<${argumentsString.join(', ')}>`;
  }

  const name = contextualizedName(resolvableName, context);

  typeArgumentsToContext(node, type, current, context);

  try {
    const existingType = localReferenceTypeCache[name];
    if (existingType) {
      return existingType;
    }

    const refEnumType = getEnumerateType(type, current);
    if (refEnumType) {
      localReferenceTypeCache[name] = refEnumType;
      return refEnumType;
    }

    if (inProgressTypes[name]) {
      return createCircularDependencyResolver(name, current);
    }

    inProgressTypes[name] = true;

    const declaration = getModelTypeDeclaration(type, current);

    let referenceType: Tspec.ReferenceType;
    if (ts.isTypeAliasDeclaration(declaration)) {
      referenceType = getTypeAliasReference(declaration, name, current, context, node);
    } else if (ts.isEnumMember(declaration)) {
      referenceType = {
        typeName: 'refEnum',
        refName: getRefTypeName(name),
        enums: [current.typeChecker.getConstantValue(declaration)!],
        enumVarnames: [declaration.name.getText()],
        deprecated: isJSDocDeprecatedTag(declaration),
      };
    } else {
      referenceType = getModelReference(declaration, name, current, context, parentNode);
    }

    localReferenceTypeCache[name] = referenceType;

    return referenceType;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`There was a problem resolving type of '${name}'.`);
    throw err;
  }
}

const getTypeAliasReference = (
  declaration: ts.TypeAliasDeclaration,
  name: string,
  current: Tspec.Current,
  context: Tspec.Context,
  referencer: ts.TypeReferenceType
): Tspec.ReferenceType => {
  return {
    typeName: 'refAlias',
    description: getJSDocDescription(declaration, current.typeChecker),
    refName: getRefTypeName(name),
    format: getJSDocFormat(declaration),
    type: resolve({
      typeNode: declaration.type,
      current,
      parentNode: declaration,
      context,
      referencer
    }),
    example: getJSDocExample(declaration),
    deprecated: isJSDocDeprecatedTag(declaration),
  };
}

const getModelReference = (
  modelType: ts.InterfaceDeclaration | ts.ClassDeclaration,
  name: string,
  current: Tspec.Current,
  context: Tspec.Context,
  parentNode?: ts.Node
) => {
  const description = getJSDocDescription(modelType, current.typeChecker);
  const deprecated = isJSDocDeprecatedTag(modelType);
  const example = getJSDocExample(modelType);

  // Handle toJSON methods
  if (!modelType.name) {
    throw new GenerateMetadataError("Can't get Symbol from anonymous class", modelType);
  }
  const type = current.typeChecker.getTypeAtLocation(modelType.name);
  const toJSON = current.typeChecker.getPropertyOfType(type, 'toJSON');
  if (toJSON && toJSON.valueDeclaration && (ts.isMethodDeclaration(toJSON.valueDeclaration) || ts.isMethodSignature(toJSON.valueDeclaration))) {
    let nodeType = toJSON.valueDeclaration.type;
    if (!nodeType) {
      const signature = current.typeChecker.getSignatureFromDeclaration(toJSON.valueDeclaration);
      const implicitType = current.typeChecker.getReturnTypeOfSignature(signature!);
      nodeType = current.typeChecker.typeToTypeNode(implicitType, undefined, ts.NodeBuilderFlags.NoTruncation) as ts.TypeNode;
    }
    const referenceType: Tspec.ReferenceType = {
      refName: getRefTypeName(name),
      typeName: 'refAlias',
      description,
      type: resolve({ typeNode: nodeType,current }),
      deprecated: isJSDocDeprecatedTag(modelType),
      example,
    };
    return referenceType;
  }

  const properties = getModelProperties(modelType, current, context);
  const additionalProperties = getModelAdditionalProperties(modelType, current, context, parentNode);
  const inheritedProperties = getModelInheritedProperties(modelType, current, context, parentNode) || [];

  const referenceType: Tspec.ReferenceType & { properties: Tspec.Property[] } = {
    additionalProperties,
    typeName: 'refObject',
    description,
    properties: inheritedProperties,
    refName: getRefTypeName(name),
    deprecated,
    example,
  };

  referenceType.properties = referenceType.properties.concat(properties);

  return referenceType;
}

const getModelProperties = (node: ts.InterfaceDeclaration | ts.ClassDeclaration, current: Tspec.Current, context: Tspec.Context, overrideToken?: OverrideToken): Tspec.Property[] => {
  // Interface model
  if (ts.isInterfaceDeclaration(node)) {
    return node.members
      .filter((member): member is ts.PropertySignature => ts.isPropertySignature(member))
      .map((member) => propertyFromSignature(member, current, context, overrideToken));
  }

  // Class model
  const properties = getClassProperties(node);
  return properties.map(property => propertyFromDeclaration(property, current, context, overrideToken));
}


const getModelAdditionalProperties = (node: Tspec.UsableDeclaration, current: Tspec.Current, context: Tspec.Context, parentNode?: ts.Node) => {
  if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
    const interfaceDeclaration = node;
    const indexMember = interfaceDeclaration.members.find(member => member.kind === ts.SyntaxKind.IndexSignature);
    if (!indexMember) {
      return undefined;
    }

    const indexSignatureDeclaration = indexMember as ts.IndexSignatureDeclaration;
    const indexType = resolve({
      typeNode: indexSignatureDeclaration.parameters[0].type!,
      current, parentNode, context,
    });
    if (indexType.typeName !== 'string') {
      throw new GenerateMetadataError(`Only string indexers are supported.`, indexSignatureDeclaration.parameters[0].type);
    }

    return resolve({
      typeNode: indexSignatureDeclaration.type!,
      current, parentNode, context,
    });
  }

  return undefined;
}

const getModelInheritedProperties = (
  modelTypeDeclaration: Exclude<Tspec.UsableDeclaration, ts.PropertySignature | ts.TypeAliasDeclaration | ts.EnumMember>,
  current: Tspec.Current,
  context: Tspec.Context,
  parentNode?: ts.Node,
): Tspec.Property[] => {
  let properties: Tspec.Property[] = [];

  const heritageClauses = modelTypeDeclaration.heritageClauses;
  if (!heritageClauses) {
    return properties;
  }

  heritageClauses.forEach(clause => {
    if (!clause.types) {
      return;
    }

    clause.types.forEach(t => {
      const baseEntityName = t.expression as ts.EntityName;

      // create subContext
      const resetCtx = typeArgumentsToContext(t, baseEntityName, current, context);

      const referenceType = getReferenceType(t, current, context, parentNode);
      if (referenceType) {
        if (referenceType.typeName === 'refEnum') {
          // since it doesn't have properties to iterate over, then we don't do anything with it
        } else if (referenceType.typeName === 'refAlias') {
          let type: Tspec.Type = referenceType;
          while (type.typeName === 'refAlias') {
            type = type.type;
          }

          if (type.typeName === 'refObject') {
            properties = [...properties, ...type.properties];
          } else if (type.typeName === 'nestedObjectLiteral') {
            properties = [...properties, ...type.properties];
          }
        } else if (referenceType.typeName === 'refObject') {
          referenceType.properties.forEach(property => properties.push(property));
        } else {
          throw new Error(`Unhandled discriminated union member: ${JSON.stringify(referenceType)}`);
        }
      }

      // reset subContext
      context = resetCtx;
    });
  });

  return properties;
}