import { Router } from "express";
import * as bookController from "./book.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";
import * as bookValidation from "./book.validation";
import requestValidator from "../../middleware/requestValidator";

const router = Router();

router.post(
  "/create-book",
  requestValidator(bookValidation.createBookValidation),
  auth(USER_ROLE_ENUM.ADMIN),
  bookController.createBook,
);
router.get("/", bookController.getBook);
router
  .route("/:id")
  .get(bookController.getBookById)
  .all(auth(USER_ROLE_ENUM.ADMIN))
  .patch(
    requestValidator(bookValidation.updateBookValidation),
    bookController.updateBookById,
  )
  .delete(bookController.deleteBookById);

const bookRouter = router;

export default bookRouter;
