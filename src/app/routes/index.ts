import { Router } from "express";
import userAuthRouter from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [{ path: "/auth", route: userAuthRouter }];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
