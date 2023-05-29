import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createProxyMiddleware } from 'http-proxy-middleware';
import swaggerUI from 'swagger-ui-express';

import { generateTspec } from '../generator';
import { Tspec } from '../types';

export const initTspecServer = async (options?: Tspec.InitTspecServerOptions) => {
  const { port = 7000, proxyHost, ...generateOptions } = options || {};
  const app = express();
  const openapiSpec = await generateTspec(generateOptions);
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiSpec));
  if (proxyHost) {
    app.use('/', createProxyMiddleware({
      target: proxyHost,
      changeOrigin: true,
      logLevel: 'warn',
    }));
  }
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Tspec API server is running on http://localhost:${port}/docs`);
    if (proxyHost) {
      // eslint-disable-next-line no-console
      console.log(`Tspec API server is proxying to ${proxyHost}`);
    }
  });
};

export const TspecDocsMiddleware = async (
  generateOptions?: Tspec.GenerateParams,
): Promise<express.RequestHandler[]> => {
  const openapiSpec = await generateTspec(generateOptions);
  return [...swaggerUI.serve, swaggerUI.setup(openapiSpec)];
};
