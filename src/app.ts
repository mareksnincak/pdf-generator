import Express from "express";
import helmet from "helmet";

import logger from "@logger";
import config from "@config";
import router from "@routes/v1/index";

const createApplication = (port = config.server.port) => {
  const app = Express();

  app.use(helmet());

  app.use("/api/v1", router);

  const server = app.listen(port, () => {
    logger.info(`App started at http://localhost:${port}`);
  });

  return server;
};

export default createApplication;
