import ts from "typescript";
import { ApiSpec } from "./DefineApiSpec";

export namespace Tspec {
  export type NumberFormat = 'int32' | 'int64' | 'float' | 'double';
  export type StringFormat = 'date' | 'date-time' | 'byte' | 'binary' | 'password';

  export type TypeName = 
    | 'integer'
    | 'number' 
    | 'string' 
    | 'boolean' 
    | 'void' 
    | 'enum'
    | 'tuple'
    | 'union'
    | 'undefined' 
    | 'any' 
    | 'intersection'  
    | 'nestedObjectLiteral'
    | 'object' 
    | 'array' 
    | 'refAlias'
    | 'null' 
    | 'never';

  interface TypeBase {
    typeName: TypeName;
  }

  export interface NumberType extends TypeBase { typeName: 'integer' | 'number', format?: NumberFormat }
  export interface StringType extends TypeBase { typeName: 'string', format?: StringFormat }
  export interface BooleanType extends TypeBase { typeName: 'boolean' }
  export interface VoidType extends TypeBase { typeName: 'void' }
  export interface UndefinedType extends TypeBase { typeName: 'undefined' }
  export interface EnumType extends TypeBase { typeName: 'enum', enums: Array<string | number | boolean | null> }
  export interface ArrayType extends TypeBase { typeName: 'array', itemType: Type }
  export interface TupleType extends TypeBase { typeName: 'tuple', types: Type[] }
  export interface UnionType extends TypeBase { typeName: 'union', types: Type[] }
  export interface IntersectionType extends TypeBase { typeName: 'intersection', types: Type[] }
  export interface AnyType extends TypeBase { typeName: 'any' }
  export interface NestedObjectLiteralType extends TypeBase {
    typeName: 'nestedObjectLiteral';
    properties: Property[];
    additionalProperties?: Type;
  }
  export interface ObjectsNoPropsType extends TypeBase { typeName: 'object' }

  export interface Property {
    description?: string;
    format?: string;
    example?: unknown;
    name: string;
    type: Type;
    required: boolean;
    deprecated: boolean;
  }

  export type PrimitiveType = NumberType | StringType | BooleanType | VoidType | UndefinedType;

  export type RefTypeName = 'refObject' | 'refEnum' | 'refAlias';

  export interface ReferenceTypeBase {
    description?: string;
    typeName: RefTypeName;
    refName: string;
    example?: unknown;
    deprecated: boolean;
  }

  export interface RefEnumType extends ReferenceTypeBase {
    typeName: 'refEnum';
    enums: Array<string | number>;
    enumVarnames?: string[];
  }

  export interface RefObjectType extends ReferenceTypeBase {
    typeName: 'refObject';
    properties: Property[];
    additionalProperties?: Type;
  }

  export interface RefAliasType extends Omit<Property, 'name' | 'required'>, ReferenceTypeBase {
    typeName: 'refAlias';
  }

  export interface NeverType extends TypeBase {
    typeName: 'never'
  }

  export type ReferenceType = RefEnumType | RefObjectType | RefAliasType;

  export type ObjectType = NestedObjectLiteralType | RefObjectType;

  export type Type =
    | PrimitiveType
    | ObjectsNoPropsType
    | EnumType
    | ArrayType
    | TupleType
    | AnyType
    | RefEnumType
    | RefObjectType
    | RefAliasType
    | NestedObjectLiteralType
    | UnionType
    | IntersectionType
    | NeverType;

  export interface Context {
    [name: string]: ts.TypeReferenceNode | ts.TypeNode;
  }
  export interface Current {
    typeChecker: ts.TypeChecker;
  }

  export interface ResolveParamsBase {
    typeNode: ts.TypeNode,
    current: Current,
    parentNode?: ts.Node,
    context?: Context,
    referencer?: ts.TypeNode
  }

  export interface ResolveTypeLiteralParams extends ResolveParamsBase {
    typeNode: ts.TypeLiteralNode,
    context: Context,
  }

  export interface ResolveMappedTypeParams extends ResolveParamsBase {
    typeNode: ts.MappedTypeNode,
    context: Context,
    referencer: ts.TypeNode
  }

  export interface ResolveKeyofTypeParams extends ResolveParamsBase {
    typeNode: ts.TypeOperatorNode,
    context: Context,
  }

  export interface ResolveIndexedAccessTypeParams extends ResolveParamsBase {
    typeNode: ts.IndexedAccessTypeNode,
    context: Context,
  }

  export interface ResolveTypeReferenceParams extends ResolveParamsBase {
    typeNode: ts.TypeReferenceNode,
    context: Context,
  }

  export interface ResolveConditionalTypeParams extends ResolveParamsBase {
    typeNode: ts.ConditionalTypeNode,
    context: Context,
  }
  
  export type UsableDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.PropertySignature | ts.TypeAliasDeclaration | ts.EnumMember;
  export type UsableDeclarationWithoutPropertySignature = Exclude<UsableDeclaration, ts.PropertySignature>;

  export interface ParsedApiSpec extends ApiSpec {
    operationId: string,
    path?: Tspec.Property & { type: Tspec.ObjectType },
    query?: Tspec.Property & { type: Tspec.ObjectType },
    body?: Tspec.Property & { type: Tspec.ObjectType },
    response: Tspec.Property,
  }
}

