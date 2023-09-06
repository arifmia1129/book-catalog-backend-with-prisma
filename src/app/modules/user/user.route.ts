import { Router } from "express";
import * as userController from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get("/", auth(USER_ROLE_ENUM.ADMIN), userController.getUser);
router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN))
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

const userRouter = router;

export default userRouter;
