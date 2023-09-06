import { Router } from "express";
import userAuthRouter from "../modules/auth/auth.route";
import userRouter from "../modules/user/user.route";
import categoryRouter from "../modules/category/category.route";
import bookRouter from "../modules/book/book.route";
import orderRouter from "../modules/order/order.route";
import userProfileRouter from "../modules/profile/profile.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userAuthRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/categories",
    route: categoryRouter,
  },
  {
    path: "/books",
    route: bookRouter,
  },
  {
    path: "/orders",
    route: orderRouter,
  },
  {
    path: "/profile",
    route: userProfileRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
