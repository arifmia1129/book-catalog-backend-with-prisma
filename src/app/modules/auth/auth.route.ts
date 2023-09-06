import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import * as authValidation from "./auth.validation";
import * as authController from "./auth.controller";

const router = Router();

router.post(
  "/signup",
  requestValidator(authValidation.signupAuthValidation),
  authController.signupUserAuth,
);
router.post(
  "/signin",
  requestValidator(authValidation.signinAuthValidation),
  authController.signinUserAuth,
);

const userAuthRouter = router;

export default userAuthRouter;
