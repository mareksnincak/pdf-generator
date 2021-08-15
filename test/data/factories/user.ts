import Faker from 'faker';
import { define } from 'typeorm-seeding';

import User from '@entities/User';

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.id = faker.random.uuid();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();

  return user;
});
