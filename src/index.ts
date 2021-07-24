import "@config";
import "reflect-metadata";

import { createConnection } from "typeorm";
import createApplication from "@app";

const run = async () => {
  await Promise.all([createConnection(), createApplication()]);
};

run().catch((error) => console.log(error));
