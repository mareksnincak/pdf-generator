import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import {
  tearDownDatabase,
  useRefreshDatabase,
  useSeeding,
} from "typeorm-seeding";
import createApplication from "@app";
import { Server } from "http";

chai.use(chaiHttp);

export let app: Server;
export let httpAgent: ChaiHttp.Agent;

before(async () => {
  app = createApplication();
  httpAgent = chai.request(app);
  await useRefreshDatabase();
  await useSeeding();
});

after(async () => {
  if (app) {
    app.close();
  }
  await tearDownDatabase();
});
