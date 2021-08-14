import { EntityRepository, Repository } from "typeorm";
import User from "@entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  getById(id: string) {
    return this.findOne(id);
  }

  getByIdOrFail(id: string) {
    return this.findOneOrFail(id);
  }
}

export default UserRepository;
