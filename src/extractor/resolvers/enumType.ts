import { Tspec } from "../../types/tspec";
import type { Resolver } from "../types";

export const resolveEnumType: Resolver = params => {
  const { current, type } = params;

  if (!type.isUnion()) {
    return null;
  }

  const unionedTypes = type.types
    .map(unionedType => current.resolver({ ...params, type: unionedType }))
    .filter(<T>(unionedType: T | null): unionedType is T => !!unionedType);

  const isAllLiteralType = (types: Tspec.Type[]): types is Tspec.LiteralType[] =>
    types.every(type => type.typeName === 'literal');

  if (isAllLiteralType(unionedTypes)) {
    return {
      typeName: 'enum',
      enums: unionedTypes.map(type => type.value)
    }
  }

  return {
    typeName: 'union',
    types: unionedTypes
  };
};
