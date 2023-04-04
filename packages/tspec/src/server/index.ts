import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createProxyMiddleware } from 'http-proxy-middleware';
import swaggerUI from 'swagger-ui-express';

import { generateTspec } from '../generator';
import { Tspec } from '../types';

interface InitTspecServerOptions extends Tspec.GenerateParams {
  port?: number,
  proxyHost?: string,
}

export const initTspecApiServer = async (options?: InitTspecServerOptions) => {
  const { port = 7000, proxyHost, ...generateOptions } = options || {};
  const app = express();
  const openapiSpec = await generateTspec(generateOptions);
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiSpec));
  if (proxyHost) {
    app.use('/', createProxyMiddleware({ target: proxyHost, changeOrigin: true }));
  }
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Tspec API server started on http://localhost:${port}/docs`));
};
