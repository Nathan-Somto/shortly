import { Router } from "express";
import {  login, signOut, signup } from "../controllers/auth.controllers";
import { protectRoute } from "../auth";
const authRouter = Router();
// for auth specific stuff
authRouter.post('/login', login);
authRouter.post('/signup', signup);
//authRouter.use(protectRoute);
authRouter.post('/signout', [protectRoute, signOut]);
export { authRouter };