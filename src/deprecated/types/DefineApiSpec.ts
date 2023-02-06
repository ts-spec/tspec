import { RequestHandler } from "express";

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiSpec {
  url: `${Method} /${string}`,
  summary?: string,
  description?: string,
  tags?: string[],
  auth?: string,
  path?: {}, query?: {}, body?: {},
  response: {},
}

export type DefineApiSpec<T extends ApiSpec> = T;

export type ExpressHandler<Spec extends ApiSpec> = RequestHandler<
  NonNullable<Spec['path']>,
  NonNullable<Spec['response']>,
  NonNullable<Spec['body']>,
  NonNullable<Spec['query']>
>
