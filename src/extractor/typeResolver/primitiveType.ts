import ts from "typescript";
import { GenerateMetadataError } from "../exceptions";
import { getJSDocFormat } from "../jsDoc";
import { Tspec } from "../../types/tspec";

export function assertIsNumberFormat(val: string, typeNode: ts.Node): asserts val is Tspec.NumberFormat {
  if (val !== 'int32' && val !== 'int64' && val !== 'float' && val !== 'double') {
    throw new GenerateMetadataError(`Invalid number format: ${val}`, typeNode);
  }
}

export function assertIsStringFormat(val: string, typeNode: ts.Node): asserts val is Tspec.StringFormat {
  if (val !== 'date' && val !== 'date-time' && val !== 'byte' && val !== 'binary' && val !== 'password') {
    throw new GenerateMetadataError(`Invalid string format: ${val}`, typeNode);
  }
}

const getNumberFormat = (parentNode?: ts.Node): Tspec.NumberFormat | undefined => {
  const format = parentNode && getJSDocFormat(parentNode);
  if (!format) {
    return undefined;
  }
  assertIsNumberFormat(format, parentNode);
  return format;
}

const getStringFormat = (parentNode?: ts.Node): Tspec.StringFormat | undefined => {
  const format = parentNode && getJSDocFormat(parentNode);
  if (!format) {
    return undefined;
  }
  assertIsStringFormat(format, parentNode);
  return format;
}

export const getPrimitiveType = (type: ts.TypeNode, parentNode?: ts.Node): Tspec.PrimitiveType | undefined => {
  if (type.kind === ts.SyntaxKind.NumberKeyword) {
    const format = getNumberFormat(parentNode);
    const type = (format === 'int32' || format === 'int64') ? 'integer' : 'number';
    return { typeName: type, format };
  } else if (type.kind === ts.SyntaxKind.StringKeyword) {
    const format = getStringFormat(parentNode);
    return { typeName: 'string', format };
  } else if (type.kind === ts.SyntaxKind.BooleanKeyword) {
    return { typeName: 'boolean' };
  } else if (type.kind === ts.SyntaxKind.VoidKeyword) {
    return { typeName: 'void' };
  } else if (type.kind === ts.SyntaxKind.UndefinedKeyword) {
    return { typeName: 'undefined' };
  } else {
    return;
  }
}

export const getLiteralValue = (typeNode: ts.LiteralTypeNode): string | number | boolean | null => {
  let value: boolean | number | string | null;
  switch (typeNode.literal.kind) {
    case ts.SyntaxKind.TrueKeyword:
      value = true;
      break;
    case ts.SyntaxKind.FalseKeyword:
      value = false;
      break;
    case ts.SyntaxKind.StringLiteral:
      value = typeNode.literal.text;
      break;
    case ts.SyntaxKind.NumericLiteral:
      value = parseFloat(typeNode.literal.text);
      break;
    case ts.SyntaxKind.NullKeyword:
      value = null;
      break;
    default:
      if (Object.prototype.hasOwnProperty.call(typeNode.literal, 'text')) {
        value = (typeNode.literal as ts.LiteralExpression).text;
      } else {
        throw new GenerateMetadataError(`Couldn't resolve literal node: ${typeNode.literal.getText()}`);
      }
  }
  return value;
}

export const getDateType = (parentNode?: ts.Node): Tspec.StringType => {
  const format = parentNode && getJSDocFormat(parentNode);
  if (!format) {
    return { typeName: 'string', format: 'date-time' };
  }
  assertIsStringFormat(format, parentNode);
  return { typeName: 'string', format: format };
}
