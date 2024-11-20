import { Session } from "./src/auth";
// extend express Request interface to include Session through declarative merging
 declare global  {
    namespace Express {
        interface Request {
           session: Session | undefined
        }
    }
 }