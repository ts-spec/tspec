import ts from "typescript";

export const getSymbolAtLocation = (type: ts.Node, typeChecker: ts.TypeChecker) => {
  const symbol = typeChecker.getSymbolAtLocation(type) || ((type as any).symbol as ts.Symbol);
  const hasAlias = symbol && (symbol.flags & ts.SymbolFlags.Alias) === ts.SymbolFlags.Alias;
  // resolve alias if it is an alias, otherwise take symbol directly
  return (hasAlias && typeChecker.getAliasedSymbol(symbol)) || symbol;
}
