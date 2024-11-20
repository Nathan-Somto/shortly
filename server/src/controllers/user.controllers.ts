import { count, eq, sum } from "drizzle-orm";
import { Session } from "../auth";
import { db } from "../db";
import { links, users } from "../db/schema";
import { asyncHelper } from "../helpers/async.helper";
import { getSessionHelper } from "../helpers/getsession.helper";

export const getUser = asyncHelper(async (req, res) => {
    console.log("the headers: ", req.headers.cookie)
    console.log("getting the user");
    const session = await Session.getAuth(req);
    if (session) {
        // find the user
        const [firstUser] = await db.select({
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName
        }).from(users).where(eq(users.id, session.userId));
        return res.status(200).json({
            isLoggedIn: true,
            user: firstUser
        })
    }
    res.status(200).json({
        isLoggedIn: false,
        user: null
    })
})

export const getUserStats = asyncHelper(async (req, res) => {
    const session = getSessionHelper(req);
    const [{ totalLinks }] = await db
        .select({ totalLinks: count(links.id) })
        .from(links)
        .where(eq(links.userId, session.userId))
    // sum the total number of clicks on all the links created by user.
    const [{ totalClicks }] = await db
        .select({ totalClicks: sum(links.clicks) })
        .from(links)
        .where(eq(links.userId, session.userId))
    return res.status(200).json({
        message: "successfully retrieved user stats",
        userStats: {
            totalClicks: totalClicks,
            linksCreated: totalLinks
        }
    })
})