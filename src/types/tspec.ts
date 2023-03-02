// eslint-disable-next-line import/no-unresolved
import { OpenAPIV3 } from 'openapi-types';

export namespace Tspec {
  type Url = `/${string}`;
  export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

  type PathParamValue = string | number;
  export type PathParam = { [key: string]: PathParamValue }

  type QueryParamValue = string | number | boolean | string[] | number[] | boolean[];
  export type QueryParam = { [key: string]: QueryParamValue }

  export interface ApiSpecBase<
    Res extends any = any,
    P extends PathParam = PathParam,
    Q extends QueryParam = QueryParam
  > {
    summary?: string,
    description?: string,
    tags?: string[],
    auth?: string,
    path?: P, query?: Q, body?: {},
    responses?: { [code: number]: Res }, error?: { [key: string]: {} },
  }

  type ExpressHandler = (req: any, res: any, next: any, ...args: any[]) => any;

  type ApiSpecInput = ApiSpecBase & {
    handler: ExpressHandler,
  };

  type ReqOf<T extends ExpressHandler> = Parameters<T>[0];
  type ResOf<T extends ExpressHandler> = Parameters<T>[1];
  type PathOf<T extends ExpressHandler> = ReqOf<T>['params'];
  type QueryOf<T extends ExpressHandler> = ReqOf<T>['query'];
  type BodyOf<T extends ExpressHandler> = ReqOf<T>['body'];
  type ResBodyOf<T extends ExpressHandler> = NonNullable<Parameters<ResOf<T>['json']>[0]>;

  export type ApiSpec<T extends ApiSpecInput> = T & {
    path: T['path'] extends {} ? T['path'] : PathOf<T['handler']>,
    responses: T['responses'] extends { [code: number]: any }
      ? T['responses']
      : { 200: ResBodyOf<T['handler']> },
    body: T['body'] extends {} ? T['body'] : BodyOf<T['handler']>,
    query: T['query'] extends {} ? T['query'] : QueryOf<T['handler']>,
    __handler: T['handler'],
  }

  type Path = { [method in HttpMethod]: ApiSpecInput };
  type Paths = { [path: Url]: Path };

  interface Controller<P extends Paths = Paths> extends Pick<ApiSpecBase, 'tags' | 'auth'> {
    basePath?: string,
    paths: P,
  }

  type WithBasePath <Base extends string | undefined, U extends string> = Base extends string
    ? `${Base}${U}`
    : U;

  type ParsePathKeys<U extends string> = U extends `${string}/{${infer P}}${infer R}`
    ? R extends string
        ? P | ParsePathKeys<R>
        : P
    : never;

  export type DefineApiSpec<T extends Controller<{
    [P in Extract<keyof T['paths'], Url>]: {
      [M in Extract<keyof T['paths'][P], HttpMethod>]: Omit<T['paths'][P][M], 'path'> & {
        path?: { [key in ParsePathKeys<WithBasePath<T['basePath'], P>>]: PathParamValue },
        tags?: string[],
        handler: ExpressHandler,
      }
    }
  }>> = {
    [P in Extract<keyof T['paths'], Url>]: {
      [M in Extract<keyof T['paths'][P], HttpMethod>]: Omit<ApiSpec<T['paths'][P][M]>, 'tags'> & {
      method: M,
      url: WithBasePath<T['basePath'], P>,
      // concat tuple type T['tags'] and T['specs'][P][M]['tags']
      tags: [
        ...(T['tags'] extends string[] ? T['tags'] : []),
        ...(T['paths'][P][M]['tags'] extends string[] ? T['paths'][P][M]['tags'] : [])
      ],
    }}
  };

  export interface GenerateParams {
    specPathGlobs?: string[],
    tsconfigPath?: string,
    outputPath?: string,
    specVersion?: 3,
    openapi?: {
      title?: string,
      version?: string,
      securityDefinitions?: OpenAPIV3.ComponentsObject['securitySchemes'],
      servers?: OpenAPIV3.ServerObject[],
    },
    debug?: boolean,
  }

  export type OpenapiDocument = OpenAPIV3.Document;

  /** @TJS-type integer */
  export type Integer = number;
}
