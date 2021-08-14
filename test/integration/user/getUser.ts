import "mocha";
import { expect } from "chai";
import { factory, useRefreshDatabase } from "typeorm-seeding";
import httpStatus from "http-status";

import { httpAgent } from "@test/setup";
import User from "@entities/User";

const BASE_URL = "/api/v1/user";

let dbUser: User;
before(async () => {
  await useRefreshDatabase();
  dbUser = await factory(User)().create();
});

describe(`GET ${BASE_URL}`, () => {
  describe("This should", () => {
    it("return user by id", async () => {
      const response = await httpAgent.get(`${BASE_URL}/${dbUser.id}`);

      expect(response).to.have.status(httpStatus.OK);

      expect(response.body).to.exist;
      expect(response.body.firstName).to.equal(dbUser.firstName);
      expect(response.body.lastName).to.equal(dbUser.lastName);
    });
  });
});
