import { relations } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from 'drizzle-orm/pg-core'
export const users = table('user', {
    id: t.uuid().defaultRandom().primaryKey().notNull(),
    firstName: t.varchar({length: 255}).notNull(),
    lastName: t.varchar({length: 25}).notNull(),
    email: t.text().unique().notNull(),
    passwordHash: t.text().notNull(),
});
export const usersRelations = relations(users, ({many}) => ({
    session: many(sessions, {
        relationName: 'UserSessions',
    }),
    links: many(links)
}));
export const sessions = table('session', {
    id: t.uuid().defaultRandom().primaryKey().notNull(),
    userId: t.uuid().defaultRandom().notNull().references(() => users.id, {onDelete: 'cascade'}),
    token: t.text().unique().notNull(),
    expiresAt: t.timestamp().notNull(),
});
export const sessionsRelations = relations(sessions, ({one}) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    })
}));
export const links = table('link', {
    id: t.uuid().defaultRandom().primaryKey().notNull(),
    userId: t.uuid().defaultRandom().notNull().references(() => users.id, {onDelete: 'cascade'}),
    url: t.text().notNull(),
    slug: t.text().unique().notNull(),
    qrCode: t.text().notNull(),
    createdAt: t.timestamp().notNull().defaultNow(),
    clicks: t.integer().notNull().default(0)
});
export const analytics = table('analytics', {
    id: t.uuid().defaultRandom().primaryKey().notNull(),
    linkId: t.uuid().defaultRandom().notNull().references(() => links.id, {onDelete: 'cascade'}),
    ipAddress: t.text().notNull(),
    userAgent: t.text().notNull(),
    createdAt: t.timestamp().notNull().defaultNow(),
});
export const linksRelations = relations(links, ({one, many}) => ({
    user: one(users, {
        fields: [links.userId],
        references: [users.id]
    }),
    analytics: many(analytics)
}));