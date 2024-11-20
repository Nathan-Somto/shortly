import { and, asc, eq } from "drizzle-orm";
import { db } from "../db";
import { analytics, links } from "../db/schema";
import { asyncHelper } from "../helpers/async.helper";
import { getSessionHelper } from "../helpers/getsession.helper";
import { TypeChecker } from "../helpers/typecheckers.helper";
import { BadRequestError } from "../errors";
import { shortId } from "../helpers/shortId.helper";
import QRCode from 'qrcode';
export const getLinkHistory = asyncHelper(async (req, res) => {
    const session = getSessionHelper(req);
    const linkData = await db.select({
        originalUrl: links.url,
        id: links.id,
        shortUrl: links.slug,
        createdAt: links.createdAt,
        qrCode: links.qrCode,
        clicks: links.clicks
    })
        .from(links)
        .where(eq(links.userId, session.userId))
        .orderBy(asc(links.createdAt));
    return res.status(200).json({
        message: "successfully retrieved link history",
        linkHistory: linkData
    })
});
export const shortenLink = asyncHelper(async (req, res) => {
    const session = getSessionHelper(req);
    const { link, customName } = req.body;
    if (TypeChecker.check('link', link).isString().isNonEmptyString()) {
        let slug = shortId();
        if (customName !== undefined && TypeChecker.check('customName', customName).isNonEmptyString()) {
            const result = await db.select({ customName: links.slug }).from(links).where(eq(links.slug, customName)).limit(1);
            if (result.length) throw new BadRequestError('custom name already taken')
            slug = customName;
        }
        //Todo: create the qr code
        const qrCode = await QRCode.toDataURL(link, {
            color: {
                dark: '#000',
                light: '#fff'
            },
            type: 'image/png',
            errorCorrectionLevel: 'H',

        });
        const result = await db.insert(links).values({
            slug,
            url: link,
            qrCode,
            userId: session.userId
        }).returning({
            id: links.id,
            originalUrl: links.url,
            qrCode: links.qrCode,
            clicks: links.clicks,
            shortUrl: links.slug,
            createdAt: links.createdAt
        });
        return res.status(200).json({
            message: 'successfully created link',
            newLink: result[0]
        })
    }

})
export const getLink = asyncHelper(async (req, res) => {
    const session = getSessionHelper(req)
    const id = req.params.id
    const linkData = await db.select({
        originalUrl: links.url,
        id: links.id,
        shortUrl: links.slug,
        createdAt: links.createdAt,
        qrCode: links.qrCode,
        clicks: links.clicks
    })
        .from(links)
        .where(and(eq(links.userId, session.userId), eq(links.id, id)))
        .limit(1);
    return res.status(200).json({
        message: "successfully retrieved link",
        link: linkData[0]
    })
});
export const getLinkDataAndAnalytics = asyncHelper(async (req, res) => {
    const session = getSessionHelper(req)
    const id = req.params.id
    let linkId = id;
    if (linkId === 'latest') {
        const [latestLink] = await db.select({
            id: links.id
        })
            .from(links)
            .where(eq(links.userId, session.userId))
            .orderBy(asc(links.createdAt))
            .limit(1);
        linkId = latestLink.id;
    }

    const linkDataAndAnalytics = (await db
        .select({
            link: {
                originalUrl: links.url,
                id: links.id,
                shortUrl: links.slug,
                createdAt: links.createdAt,
                qrCode: links.qrCode,
                clicks: links.clicks,
            },
            analytics: {
                id: analytics.id,
                linkId: analytics.linkId,
                ipAddress: analytics.ipAddress,
                userAgent: analytics.userAgent,
                createdAt: analytics.createdAt
            }
        })
        .from(links)
        .innerJoin(analytics, eq(links.id, analytics.linkId))
        .where(and(eq(links.userId, session.userId), eq(links.id, linkId))))
    // currently {link: LinkData, analytics: AnalyticsData}[]
    // change to be {link:LinkData, analytics:AnalyticsData[]}
    const analyticsData = linkDataAndAnalytics.map(({ link, ...rest }) => rest.analytics)
    const formattedData = {
        link: linkDataAndAnalytics[0].link,
        analytics: analyticsData
    }
    console.log(formattedData);
    return res.status(200).json({
        message: "successfully retrieved links and analytics data",
        linkDataAndAnalytics: formattedData
    })
});

export const getQrCodes = asyncHelper(async (req, res) => {
    const session = getSessionHelper(req);
    const linkData = await db.select({
        qrCode: links.qrCode,
        createdAt: links.createdAt,
        id: links.id,
    })
        .from(links)
        .where(eq(links.userId, session.userId));
    return res.status(200).json({
        message: "successfully retrieved qr codes",
        qrCodes: linkData
    })
});