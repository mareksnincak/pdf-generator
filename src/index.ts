import "@config";
import "reflect-metadata";

import { createConnection } from "typeorm";
import logger from "@logger";
import createApplication from "@app";

const run = async () => {
  await Promise.all([createConnection(), createApplication()]);
};

run().catch((error) => logger.error(error));
