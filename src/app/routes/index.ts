import { Router } from "express";
import userAuthRouter from "../modules/auth/auth.route";
import userRouter from "../modules/user/user.route";

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
