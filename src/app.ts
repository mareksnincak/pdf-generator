import express from "express";
import helmet from "helmet";

import logger from "@logger";
import config from "@config";
import router from "@routes/v1/index";
import errorMiddleware from "@middlewares/error";

const createApplication = (port = config.server.port) => {
  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use("/api/v1", router);

  app.use(errorMiddleware);

  const server = app.listen(port, () => {
    logger.info(`App started at http://localhost:${port}`);
  });

  return server;
};

export default createApplication;
