import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { asyncHelper } from "../helpers/async.helper";
import { Session } from "../auth";
import { BadRequestError } from "../errors";
import { TypeChecker } from "../helpers/typecheckers.helper";

export const login = asyncHelper(async (req, res) => {
    const { email, password } = req.body;
    const userRes = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
    console.log("the user res", userRes)
    if (!userRes.length) {
        throw new BadRequestError('Invalid email or password');
    }
    const [firstUser] = userRes;
    const isMatch = await Bun.password.verify(password, firstUser.passwordHash);
    if (!isMatch) {
        throw new BadRequestError('Invalid email or password');
    }
    const sessionToken = Session
        .generateRandomToken();
    const session = await Session
        .createSession(firstUser.id, sessionToken);
    await Session
        .setSessionCookie(res, session.token, session.getExpiresAt());
    const userWithoutPassword = {
        ...firstUser,
        passwordHash: undefined
    }
    return res
        .status(200)
        .json({ message: 'successfully logged in user', user: userWithoutPassword })
});

export const signup = asyncHelper(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log("the body", JSON.stringify(req.body, null, 2))
    if (
        !TypeChecker
            .check('firstName', firstName)
            .isString()
            .isNonEmptyString() ||
        !TypeChecker
            .check('lastName', lastName)
            .isString()
            .isNonEmptyString() ||
        !TypeChecker
            .check('email', email)
            .isString()
            .isNonEmptyString() ||
        !TypeChecker
            .check('password', password)
            .isString()
            .isNonEmptyString()
    ) {
        throw new BadRequestError('Invalid input');
    }

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
    if (existingUser.length) {
        throw new BadRequestError("User already exists with the given email")
    }
    const passwordHash = await Bun
        .password
        .hash(password, 'bcrypt');
    // don't include password Hash in response
    const userRes = await db
        .insert(users)
        .values({
            email,
            firstName,
            lastName,
            passwordHash
        }).returning();
    const [createdUser] = userRes.map((user) => ({
        ...user,
        passwordHash: undefined
    }));
    const sessionToken = Session
        .generateRandomToken();
    const session = await Session
        .createSession(createdUser.id, sessionToken);
    await Session
        .setSessionCookie(res, session.token, session.getExpiresAt());
    return res.status(200).json({ message: 'successfully signed up user', user: createdUser })
});

export const signOut = asyncHelper(async (req, res) => {
    const session = req.session;
    if (!session) {
        throw new BadRequestError('Invalid session');
    }
    await Session
        .invalidateSession(session.token);
    await Session
        .deleteSessionCookie(res);
    return res
        .status(200)
        .json({ message: 'successfully logged user out' })
});

