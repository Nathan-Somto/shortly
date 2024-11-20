import { asyncHelper } from "../helpers/async.helper";
import { db } from "../db";
import { analytics, links } from "../db/schema";
import { eq } from "drizzle-orm";
import { NotFoundError } from "../errors";

export const redirectShortUrl = asyncHelper(async (req, res) => {
    const url = req.params.shortUrl;
    const urlRes = await db
        .select()
        .from(links)
        .where(eq(links.slug, url));
    if (!urlRes.length) {
        throw new NotFoundError('URL not found', true);
    }
    const [firstUrl] = urlRes;
    // increment the link clicks
    await db
        .update(links)
        .set({
            clicks: firstUrl.clicks + 1
        })
        .where(eq(links.slug, url))
    // populate the analytics table
    await db
        .insert(analytics)
        .values({
            ipAddress: req.ip ?? 'Not Provided',
            userAgent: req.headers['user-agent'] ?? 'Not Provided',
            linkId: firstUrl.id,
        });
    // for the unique visits and clicks will be calculated when we fetch data for dashboard page
    // redirect the user
    console.log(`[REDIRECT_LOG]- original link:${firstUrl.url}\nshort url:${firstUrl.slug}`);
    return res.status(200).json({
        redirectUrl: firstUrl.url
    });
})