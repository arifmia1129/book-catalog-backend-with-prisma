import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";
import { getUserProfile } from "./profile.controller";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.CUSTOMER),
  getUserProfile,
);

const userProfileRouter = router;

export default userProfileRouter;
