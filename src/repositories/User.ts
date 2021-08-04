import { EntityRepository, Repository } from "typeorm";
import { User } from "@entities/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName })
      .andWhere("user.lastName = :lastName", { lastName })
      .getMany();
  }

  createTestUser() {
    return this.save({
      firstName: "test",
      lastName: "user",
      age: 30,
    });
  }
}