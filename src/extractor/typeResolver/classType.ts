import ts from "typescript";

const hasStaticModifier = (node: ts.Node) => {
  return (
    node.modifiers &&
    node.modifiers.some(modifier => {
      return modifier.kind === ts.SyntaxKind.StaticKeyword;
    })
  );
}

const hasPublicModifier = (node: ts.Node) => {
  return (
    !node.modifiers ||
    node.modifiers.every(modifier => {
      return modifier.kind !== ts.SyntaxKind.ProtectedKeyword && modifier.kind !== ts.SyntaxKind.PrivateKeyword;
    })
  );
}

const isAccessibleParameter = (node: ts.Node) => {
  // No modifiers
  if (!node.modifiers) {
    return false;
  }

  // public || public readonly
  if (node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.PublicKeyword)) {
    return true;
  }

  // readonly, not private readonly, not public readonly
  const isReadonly = node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ReadonlyKeyword);
  const isProtectedOrPrivate = node.modifiers.some(modifier => {
    return modifier.kind === ts.SyntaxKind.ProtectedKeyword || modifier.kind === ts.SyntaxKind.PrivateKeyword;
  });
  return isReadonly && !isProtectedOrPrivate;
}

export const getClassProperties = (node: ts.ClassDeclaration) => {
  const properties = node.members
    .filter(member => member.kind === ts.SyntaxKind.PropertyDeclaration)
    .filter(member => !hasStaticModifier(member))
    .filter(member => hasPublicModifier(member)) as Array<ts.PropertyDeclaration | ts.ParameterDeclaration>;

  const classConstructor = node.members.find(member => ts.isConstructorDeclaration(member)) as ts.ConstructorDeclaration;

  if (classConstructor && classConstructor.parameters) {
    const constructorProperties = classConstructor.parameters.filter(parameter => isAccessibleParameter(parameter));

    properties.push(...constructorProperties);
  }

  return properties;
}