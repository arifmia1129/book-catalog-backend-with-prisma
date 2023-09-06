import { Router } from "express";
import * as categoryController from "./category.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/create-category",
  auth(USER_ROLE_ENUM.ADMIN),
  categoryController.createCategory,
);
router.get("/", categoryController.getCategory);
router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN))
  .get(categoryController.getCategoryById)
  .patch(categoryController.updateCategoryById)
  .delete(categoryController.deleteCategoryById);

const categoryRouter = router;

export default categoryRouter;
