import type { NextFunction, Request, Response } from "express";

class BaseError extends Error {
    public status: number;
    public returnErrorPage: boolean;
    constructor(message: string, returnErrorPage = false, status = 500) {
        super(message);
        this.name = 'BaseError';
        this.status = status;
        this.returnErrorPage = returnErrorPage;
    }
}
// bad request error
export class BadRequestError extends BaseError {
    constructor(message: string, returnErrorPage = false) {
        {
            super(message, returnErrorPage, 400);
            this.name = 'BadRequestError';
        }
    }
}
// unauthorized error
export class UnauthorizedError extends BaseError {
    constructor(message: string, returnErrorPage = false) {
        super(message, returnErrorPage, 401);
        this.name = 'UnauthorizedError';
    }
}
// not found error
export class NotFoundError extends BaseError {
    constructor(message: string, returnErrorPage = false) {
        super(message, returnErrorPage, 404);
        this.name = 'NotFoundError';
    }
}
// server error
export class ServerError extends BaseError {
    constructor(message: string, returnErrorPage = false) {
        super(message, returnErrorPage, 500);
        this.name = 'ServerError';
    }
}
// error logger
export const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
   console.error(err)
    if (err instanceof BaseError) {
        console.error(`[ERROR_LOG]: ${err.name} - ${err.message}`);
        return next(err);
    }
    console.error('[ERROR_LOG]: ', err?.message);
    next(err);
}
// error handler
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) {
        res.status(err.status).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: 'Internal server error' });
    }
}