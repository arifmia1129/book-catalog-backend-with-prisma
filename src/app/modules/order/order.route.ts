import { Router } from "express";
import * as orderController from "./order.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";
import * as orderValidation from "./order.validation";
import requestValidator from "../../middleware/requestValidator";

const router = Router();

router.post(
  "/create-order",
  requestValidator(orderValidation.createOrderValidation),
  auth(USER_ROLE_ENUM.CUSTOMER),
  orderController.createOrder,
);
router.get(
  "/",
  auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.CUSTOMER),
  orderController.getOrder,
);
router
  .route("/:id")
  .get(orderController.getOrderById)
  .all(auth(USER_ROLE_ENUM.ADMIN));

const orderRouter = router;

export default orderRouter;
