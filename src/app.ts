import express from 'express';
import helmet from 'helmet';

import config from '@config';
import errorMiddleware from '@middlewares/error';
import logger from '@logger';
import router from '@routes/v1/index';
import {
  httpLogger,
  clientHttpErrorLogger,
  serverHttpErrorLogger,
} from '@middlewares/logger';

const createApplication = (port = config.server.port) => {
  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(httpLogger);
  app.use(clientHttpErrorLogger);
  app.use(serverHttpErrorLogger);

  app.use('/api/v1', router);

  app.use(errorMiddleware);

  const server = app.listen(port, () => {
    logger.info(`App started at http://localhost:${port}`);
  });

  return server;
};

export default createApplication;
