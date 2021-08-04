import "@config";
import "reflect-metadata";

import { createConnection, getCustomRepository } from "typeorm";
import { buildConnectionOptions, createDatabase } from "typeorm-extension";

import logger from "@logger";
import createApplication from "@app";
import { UserRepository } from "repositories/User";

const setupDb = async () => {
  const connectionOptions = await buildConnectionOptions();

  await createDatabase({ ifNotExist: true }, connectionOptions);
  await createConnection(connectionOptions);
};

const run = async () => {
  await Promise.all([setupDb(), createApplication()]);

  await getCustomRepository(UserRepository).createTestUser();
  const users = await getCustomRepository(UserRepository).findByName(
    "test",
    "user"
  );

  console.log({ users });
};

run().catch((error) => logger.error(error));
