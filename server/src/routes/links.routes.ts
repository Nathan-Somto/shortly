import { Router } from "express";
import { protectRoute } from "../auth";
import { getLink, getLinkDataAndAnalytics, getLinkHistory, getQrCodes, shortenLink } from "../controllers/links.controllers";
const linksRouter = Router();
linksRouter.use(protectRoute)
// for getting the link history of a particular user
linksRouter.get('/history', getLinkHistory);
// for shortening the URL from the form
linksRouter.post('/shorten', shortenLink);
// for getting the qr codes for a particular user
linksRouter.get('/qr-codes', getQrCodes);
//for getting info about the  link 
linksRouter.get('/:id', getLink);
//  for getting analytics info of the shortened url if i get server-choice pick a random link for the user.
linksRouter.get('/:id/analytics', getLinkDataAndAnalytics);
export { linksRouter };