import { Resolver } from "../types";
import { Tspec } from "../../types/tspec";
import { resolveLiteralType, resolvePrimitiveType } from "./primitiveType";
import { resolveEnumType } from "./enumType";

const resolveAll = (resolvers: Resolver[]): Resolver =>
  params => resolvers.reduce<Tspec.Type | null>(
    (resolved, resolver) => resolved || resolver(params),
    null
  );

export const resolve = resolveAll([
  resolveLiteralType,
  resolvePrimitiveType,
  resolveEnumType
]);
