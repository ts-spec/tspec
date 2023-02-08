// eslint-disable-next-line import/no-unresolved
import { RequestHandler } from 'express';
import { OpenAPIV3 } from 'openapi-types';

export namespace Tspec {
  export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  type Url = `/${string}`;
  type UrlWithMethod = `${Method} ${Url}`;

  type ParseMethod<P extends UrlWithMethod> = P extends `${infer M} /${string}` ? M : never;
  type ParseUrl<P extends UrlWithMethod> = P extends `${Method} /${infer U}` ? U : never;

  type PathParamValue = string | number;
  export type PathParam = { [key: string]: PathParamValue }

  type QueryParamValue = string | number | boolean | string[] | number[] | boolean[];
  export type QueryParam = { [key: string]: QueryParamValue }

  interface ApiSpecBase<
    Res extends any = any,
    P extends PathParam = PathParam,
    Q extends QueryParam = QueryParam
  > {
    summary?: string,
    description?: string,
    tags?: string[],
    auth?: string,
    path?: P, query?: Q, body?: {},
    responses: { [code: number]: Res }, error?: { [key: string]: {} },
  }

  export type ApiSpec<T extends ApiSpecBase> = T;

  interface Controller<
    Specs extends { [path: UrlWithMethod]: ApiSpecBase } = { [path: UrlWithMethod]: ApiSpecBase }
  > extends Pick<ApiSpecBase, 'tags' | 'auth'> {
    baseUrl?: string,
    specs: Specs,
  }

  type WithBaseUrl <Base extends string | undefined, U extends string> = Base extends string
    ? `${Base}/${U}`
    : U;

  type ParsePathKeys<U extends string> = U extends `${string}/{${infer P}}${infer R}`
    ? R extends string
        ? P | ParsePathKeys<R>
        : P
    : never;

  export type RegisterApiSpec<T extends Controller<{
    [P in Extract<keyof T['specs'], UrlWithMethod>]: Omit<T['specs'][P], 'path'> & {
      path?: { [key in ParsePathKeys<WithBaseUrl<T['baseUrl'], ParseUrl<P>>>]: PathParamValue },
      tags?: string[],
    }
  }>> = {
    [P in Extract<keyof T['specs'], UrlWithMethod>]: Omit<T['specs'][P], 'tags'> & {
      method: ParseMethod<P>,
      url: WithBaseUrl<T['baseUrl'], ParseUrl<P>>,
      // concat tuple type T['tags'] and T['specs'][P]['tags']
      tags: [
        ...(T['tags'] extends string[] ? T['tags'] : []),
        ...(T['specs'][P]['tags'] extends string[] ? T['specs'][P]['tags'] : [])
      ],
    }
  };

  type ValueOf<T extends {}> = T[keyof T];

  export type ExpressHandler<Spec extends ApiSpecBase> = RequestHandler<
    Spec['path'], ValueOf<Spec['responses']>, Spec['body'], Spec['query']
  >;

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
  }

  export type OpenapiDocument = OpenAPIV3.Document;

  /** @TJS-type integer */
  export type Integer = number;
}
