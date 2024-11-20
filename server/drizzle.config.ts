import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    dialect: 'postgresql',
    strict: true,
    casing: 'snake_case',
    verbose: true,
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    }
});