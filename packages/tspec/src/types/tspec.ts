// eslint-disable-next-line import/no-unresolved
import { OpenAPIV3 } from 'openapi-types';

export namespace Tspec {
  type PathUrl = `/${string}`;
  export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

  type PathParamValue = string | number;
  export type PathParam = { [key: string]: PathParamValue }

  type QueryParamValue = string | number | boolean | string[] | number[] | boolean[];
  export type QueryParam = { [key: string]: QueryParamValue }

  type HeaderParamValue = string | number;
  export type HeaderParam = { [name: string]: HeaderParamValue }

  type CookieParamValue = string | number;
  export type CookieParam = { [name: string]: CookieParamValue }

  export interface ApiSpecBase<
    Res extends any = any,
    P extends PathParam = PathParam,
    Q extends QueryParam = QueryParam,
    H extends HeaderParam = HeaderParam,
    C extends CookieParam = CookieParam,
  > {
    summary?: string,
    description?: string,
    tags?: string[],
    security?: string,
    path?: P, query?: Q, body?: {}, header?: H, cookie?: C,
    responses?: { [code: number]: Res }, error?: { [key: string]: {} },
  }

  type ExpressHandler = (req: any, res: any, next: any, ...args: any[]) => any;

  type ApiSpecInput = ApiSpecBase & {
    handler?: ExpressHandler,
  };

  type ReqOf<T extends ExpressHandler> = Parameters<T>[0];
  type ResOf<T extends ExpressHandler> = Parameters<T>[1];
  type PathOf<T extends ExpressHandler> = ReqOf<T>['params'];
  type QueryOf<T extends ExpressHandler> = ReqOf<T>['query'];
  type BodyOf<T extends ExpressHandler> = ReqOf<T>['body'];
  type ResBodyOf<T extends ExpressHandler> = NonNullable<Parameters<ResOf<T>['json']>[0]>;

  export type ApiSpec<T extends ApiSpecInput> = T & {
    path: T['path'] extends {} ? T['path']
      : T['handler'] extends ExpressHandler ? PathOf<T['handler']>
      : never,
    responses: T['responses'] extends { [code: number]: any } ? T['responses']
      : T['handler'] extends ExpressHandler ? { 200: ResBodyOf<T['handler']> }
      : never,
    body: T['body'] extends {} ? T['body']
      : T['handler'] extends ExpressHandler ? BodyOf<T['handler']>
      : never,
    query: T['query'] extends {} ? T['query']
      : T['handler'] extends ExpressHandler ? QueryOf<T['handler']>
      : never,
    __handler: T['handler'],
  }

  type Path = { [method in HttpMethod]?: ApiSpecInput };
  type Paths = { [path: PathUrl]: Path };

  interface Controller<P extends Paths = Paths> extends Pick<ApiSpecBase, 'tags' | 'security'> {
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
    [P in Extract<keyof T['paths'], PathUrl>]: {
      [M in HttpMethod]?: Omit<ApiSpecInput, 'path'> & {
        path?: { [key in ParsePathKeys<WithBasePath<T['basePath'], P>>]: PathParamValue },
        handler?: ExpressHandler,
      }
    }
  }>> = {
    [P in Extract<keyof T['paths'], PathUrl>]: {
      [M in Extract<keyof T['paths'][P], HttpMethod>]: T['paths'][P][M] extends ApiSpecInput ? (
        Omit<ApiSpec<T['paths'][P][M]>, 'tags' | 'security'> & {
          method: M,
          url: WithBasePath<T['basePath'], P>,
          security: T['paths'][P][M]['security'] extends string
            ? T['paths'][P][M]['security']
            : T['security'],
          // concat tuple type T['tags'] and T['specs'][P][M]['tags']
          tags: [
            ...(T['tags'] extends string[] ? T['tags'] : []),
            ...(T['paths'][P][M]['tags'] extends string[] ? T['paths'][P][M]['tags'] : [])
          ],
        }
      ) : never
    }
  };

  export interface GenerateParams {
    specPathGlobs?: string[],
    tsconfigPath?: string,
    configPath?: string,
    outputPath?: string,
    specVersion?: 3,
    openapi?: {
      title?: string,
      version?: string,
      securityDefinitions?: OpenAPIV3.ComponentsObject['securitySchemes'],
      servers?: OpenAPIV3.ServerObject[],
    },
    debug?: boolean,
    ignoreErrors?: boolean,
  }

  export interface InitTspecServerOptions extends GenerateParams {
    port?: number,
    proxyHost?: string,
  }

  export type OpenapiDocument = OpenAPIV3.Document;

  /**
   * @TJS-type integer
   * @examples [1]
   * */
  export type Integer = number;

  /**
   * @TJS-format date
   * @examples ["2023-03-30"]
   */
  export type DateString = string;

  /**
   * @TJS-format date-time
   * @examples ["2023-03-30T12:00:00Z"]
   * */
  export type DateTimeString = string;

  /**
   * @TJS-format password
   * @examples ["password"]
   */
  export type PasswordString = string;

  /**
   * @TJS-format byte
   * @examples ["U3dhZ2dlciByb2Nrcw=="]
   */
  export type ByteString = string;

  /**
   * @TJS-format binary
   * @examples ["\x00\x00\x00\x02"]
   */
  export type BinaryString = string;

  /**
   * @TJS-format email
   * @examples ["test@test.com"]
   * */
  export type EmailString = string;

  /**
   * @TJS-format uuid
   * @examples ["00000000-0000-0000-0000-000000000000"]
   * */
  export type UuidString = string;

  /**
   * @TJS-format uri
   * @examples ["http://localhost"]
   * */
  export type UrlString = string;

  /**
   * @TJS-format uri
   * @examples ["https://picsum.photos/200/300"]
   */
  export type ImageUrlString = string;

  /**
   * @TJS-format hostname
   * @examples ["localhost"]
   * */
  export type HostnameString = string;

  /**
   * @TJS-format ipv4
   * @examples ["127.0.0.1"]
   * */
  export type Ipv4String = string;

  /**
   * @TJS-format ipv6
   * @examples ["::1"]
   * */
  export type Ipv6String = string;

  /**
   * @TJS-format json-pointer
   * @examples ["/"]
   */
  export type JsonPointerString = string;
}
