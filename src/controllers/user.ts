import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "@repositories/User";

export const getUser = async (req: Request, res: Response) => {
  const { firstName, lastName } = await getCustomRepository(
    UserRepository
  ).getByIdOrFail(req.params.id);

  res.send({ firstName, lastName });
};
