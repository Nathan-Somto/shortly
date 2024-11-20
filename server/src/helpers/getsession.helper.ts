import type { Request } from "express";
import { BadRequestError } from "../errors";

export const getSessionHelper = (req:Request) => {
    if(!req.session) throw new BadRequestError('Invalid Session');
    return req.session;
}