type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiSpec {
  url: `${Method} /${string}`,
  summary?: string,
  description?: string,
  tags?: string[],
  auth?: string,
  path?: {}, query?: {}, body?: {},
  response: {}, error?: { [key: string]: {} },
}

export type DefineApiSpec<T extends ApiSpec> = T;
