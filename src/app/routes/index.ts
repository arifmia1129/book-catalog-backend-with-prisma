import { Router } from "express";
import userAuthRouter from "../modules/auth/auth.route";
import userRouter from "../modules/user/user.route";
import categoryRouter from "../modules/category/category.route";

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
