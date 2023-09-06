import { Router } from "express";
import * as userController from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/", auth(USER_ROLE_ENUM.ADMIN), userController.getUser);

const userRouter = router;

export default userRouter;
