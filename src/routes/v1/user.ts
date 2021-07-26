import { Router } from "express";

import * as UserController from "@controllers/user";
import * as UserValidations from "@validations/user";
import validate from "@middlewares/validation";

const router = Router();

router.get("/:id", validate(UserValidations.getUser), UserController.getUser);

export default router;
