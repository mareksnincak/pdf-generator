import '@config';
import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { buildConnectionOptions, createDatabase } from 'typeorm-extension';

import logger from '@logger';
import createApplication from '@app';
import { getCluster as initPuppeteerCluster } from '@handlers/puppeteer/setup';

const setupDb = async () => {
  const connectionOptions = await buildConnectionOptions();

  await createDatabase({ ifNotExist: true }, connectionOptions);
  await createConnection(connectionOptions);
};

const run = async () => {
  await Promise.all([setupDb(), initPuppeteerCluster()]);
  createApplication();
};

run().catch((error) => logger.error(error));
