import ts from "typescript";
import { GenerateMetadataError } from "../exceptions";
import { getJSDocFormat } from "../jsDoc";
import { Tspec } from "../../types/tspec";
import { Resolver } from '../types';

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

export const getDateType = (parentNode?: ts.Node): Tspec.StringType => {
  const format = parentNode && getJSDocFormat(parentNode);
  if (!format) {
    return { typeName: 'string', format: 'date-time' };
  }
  assertIsStringFormat(format, parentNode);
  return { typeName: 'string', format: format };
}

export const resolveLiteralType: Resolver = ({ type }) => {
  if (type.isNumberLiteral()) {
    return { typeName: 'literal', value: type.value };
  }

  if (type.isStringLiteral()) {
    return { typeName: 'literal', value: type.value };
  }

  if (type.getFlags() | ts.TypeFlags.BooleanLiteral) {
    return { typeName: 'boolean' }
  }

  if (type.getFlags() | ts.TypeFlags.Null) {
    return { typeName: 'literal', value: null };
  }

  if (type.getFlags() | ts.TypeFlags.VoidLike) {
    return { typeName: 'undefined' };
  }

  if (type.getFlags() | ts.TypeFlags.Never) {
    return { typeName: 'never' };
  }

  if (type.getFlags() | ts.TypeFlags.Any | ts.TypeFlags.Unknown) {
    return { typeName: 'any' };
  }

  return null;
};

export const resolvePrimitiveType: Resolver = ({ type }) => {
  if (type.getFlags() | ts.TypeFlags.NumberLike) {
    const format = getNumberFormat(parentNode);
    const typeName = (format === 'int32' || format === 'int64') ? 'integer' : 'number';
    return { typeName, format };
  }

  if (type.getFlags() | ts.TypeFlags.StringLike) {
    const format = getStringFormat(parentNode);
    return { typeName: 'string', format };
  }

  return null;
};
