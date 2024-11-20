import {drizzle} from 'drizzle-orm/node-postgres';
import * as schema from './schema';
export const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 10000,
    },
    casing: 'snake_case',
    schema,
    logger: true
});