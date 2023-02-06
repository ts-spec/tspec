import ts, { getJSDocTags } from "typescript";
import { getSymbolAtLocation } from "./typeChecker";

export const getJSDocTag = (node: ts.Node, tagName: string) => {
  return getJSDocTags(node).find((tag) => tag.tagName.text === tagName);
};

export const getJSDocTagComment = (node: ts.Node, tagName: string) => {
  const tag = getJSDocTag(node, tagName);
  return tag && commentToString(tag.comment);
};

export function commentToString(comment?: string | ts.NodeArray<ts.JSDocText | ts.JSDocLink | ts.JSDocComment>): string | undefined {
  if (typeof comment === 'string') {
    return comment;
  } else if (comment) {
    return comment.map(node => node.text).join(' ');
  }

  return undefined;
}

export const getJSDocFormat = (node: ts.Node) => {
  return getJSDocTagComment(node, 'format');
}

export const getJSDocDescription = (node: ts.Node, typeChecker: ts.TypeChecker) => {
  const symbol = getSymbolAtLocation(node, typeChecker);
  if (!symbol) {
    return undefined;
  }

  /**
   * TODO: Workaround for what seems like a bug in the compiler
   * Warrants more investigation and possibly a PR against typescript
   */
  if (node.kind === ts.SyntaxKind.Parameter) {
    // TypeScript won't parse jsdoc if the flag is 4, i.e. 'Property'
    symbol.flags = 0;
  }
  
  const comments = symbol.getDocumentationComment(typeChecker);
  if (comments.length) {
    return ts.displayPartsToString(comments);
  }

  return undefined;
}


export const getJSDocExample = (node: ts.Node): Record<string, any> | undefined => {
  const exampleJSDoc = getJSDocTagComment(node, 'example');
  if (exampleJSDoc) {
    try {
      return JSON.parse(exampleJSDoc);
    } catch {
      return undefined;
    }
  }
  return undefined;
}
