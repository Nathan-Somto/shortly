import type { Request, Response,NextFunction  } from "express";

export const asyncHelper = <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err) => next(err));
    };
    };