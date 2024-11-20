import { Router } from "express";
import { protectRoute } from "../auth";
import { getUser, getUserStats } from "../controllers/user.controllers";
const userRouter = Router();
// for auth specific stuff
userRouter.get('/me', getUser);
userRouter.get('/stats', [protectRoute, getUserStats]);

export { userRouter };