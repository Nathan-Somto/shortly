import { Router } from "express";
import { redirectShortUrl } from "../controllers/index.controllers";
const indexRouter = Router();
// redirects to the original url
indexRouter.get('/:shortUrl', redirectShortUrl);
export { indexRouter };