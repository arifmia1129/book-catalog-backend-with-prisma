import { Router } from "express";
import * as categoryController from "./category.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";
import * as categoryValidation from "./category.validation";
import requestValidator from "../../middleware/requestValidator";

const router = Router();

router.post(
  "/create-category",
  requestValidator(categoryValidation.createCategoryValidation),
  auth(USER_ROLE_ENUM.ADMIN),
  categoryController.createCategory,
);
router.get("/", categoryController.getCategory);
router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .all(auth(USER_ROLE_ENUM.ADMIN))
  .patch(
    requestValidator(categoryValidation.updateCategoryValidation),
    categoryController.updateCategoryById,
  )
  .delete(categoryController.deleteCategoryById);

const categoryRouter = router;

export default categoryRouter;
