import express from 'express';
import swaggerUI from 'swagger-ui-express';

import { generateTspec } from '../generator';
import { Tspec } from '../types';

interface InitTspecServerOptions extends Tspec.GenerateParams {
  port?: number,
}

export const initTspecApiServer = async (options?: InitTspecServerOptions) => {
  const { port = 7000, ...generateOptions } = options || {};
  const app = express();
  const openapiSpec = await generateTspec(generateOptions);
  app.use('/', swaggerUI.serve, swaggerUI.setup(openapiSpec));
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Tspec API server started on http://localhost:${port}`));
};
