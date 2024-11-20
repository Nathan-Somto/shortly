import { eq } from "drizzle-orm";
import { db } from "../db";
import { sessions } from "../db/schema";
import { type CookieOptions, type NextFunction, type Request, type Response } from 'express'
import { BadRequestError } from "../errors";

const SESSSION_MAX_DURATION = 1000 * 60 * 60 * 24 * 7 * 3; // 3 weeks
const SESSION_COOKIE_NAME = 'session';
class Cookie {
    public name: typeof SESSION_COOKIE_NAME
    public value: string
    public config: CookieOptions
    constructor(value: string, expiresAt: Date) {
        this.name = SESSION_COOKIE_NAME
        this.value = value;
        this.config = {
            httpOnly: true,
            sameSite: 'lax',
            expires: expiresAt,
            maxAge: SESSSION_MAX_DURATION,
            signed: true,
        }
    }
}
export class Session {
    public token: string;
    private createdAt: number;
    private updatedAt: number;
    private duration: number;
    public userId: string;
    constructor(userId: string, token: string) {
        this.token = token;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
        this.userId = userId;
        this.duration = SESSSION_MAX_DURATION;
    }
    getExpiresAt() {
        return new Date(this.createdAt + this.duration);
    }
    static generateRandomToken() {
        const bytes = new Uint8Array(40);
        const random = crypto.getRandomValues(bytes);
        return Array.from(random).map((b) => b.toString(16)).join('');
    }
    static convertTokenToId(token: string) {
        const hasher = new Bun.CryptoHasher('sha256');
        return hasher.update(token, 'utf8').digest('hex');
    }
    static async createSession(userId: string, token: string) {
        const id = this.convertTokenToId(token);
        const session = new Session(userId, id);
        await db.insert(sessions).values({
            userId: session.userId,
            token: session.token,
            expiresAt: session.getExpiresAt(),
        });
        return session;
    }
    static async validateSession(token: string) {
        //const sessionId = this.convertTokenToId(token);
        const session = await db.select().from(sessions).where(eq(sessions.token, token));
        if (!session.length) {
            return null;
        }
        const [firstSession] = session;
        if (firstSession.expiresAt < new Date()) {
            await this.invalidateSession(token);
            return null;
        }
        return new Session(firstSession.userId, firstSession.token);
    }
    static async invalidateSession(id: string) {
        await db.delete(sessions).where(eq(sessions.token, id));
    }
    static async setSessionCookie(res: Response, sessionToken: string, expiresAt: Date) {
        const cookie = new Cookie(sessionToken, expiresAt)
        res.cookie(cookie.name, cookie.value, cookie.config)
    }
    static async deleteSessionCookie(res: Response) {
        const cookie = new Cookie('', new Date())
        res.clearCookie(SESSION_COOKIE_NAME, cookie.config)
    }
    static async getAuth(req: Request) {
        // a bit hacky but it works :)
        console.log("the cookies: ", req.cookies)
        console.log("the signed cookies: ", req.signedCookies)
        const sessionToken = req.signedCookies[SESSION_COOKIE_NAME];
        if (!sessionToken) {
            return null
        }
        return await this.validateSession(sessionToken)
    }


}
export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await Session.getAuth(req);
        // if the request is for a page redirect to login
        if (!session) {
            throw new BadRequestError("User is Not Logged In");
        }
        req.session = session;
        next();
    }
    catch (err) {
        next(err)
    }
}