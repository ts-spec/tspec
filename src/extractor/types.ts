import ts from "typescript";
import { Tspec } from "../types/tspec";

export type Current = {
  typeChecker: ts.TypeChecker;
  resolver: Resolver;
}

export type ResolveContext = Record<symbol, Tspec.Type>;
export type Resolver = (params: {
  type: ts.Type,
  current: Current,
  context: ResolveContext,
}) => Tspec.Type | null;
