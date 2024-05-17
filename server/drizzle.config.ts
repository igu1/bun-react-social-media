import type { Config } from 'drizzle-kit';

export default {
    schema: './db/schemas/*.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: "postgresql://default_owner:CaVUeDKB8H4d@ep-weathered-sky-a1p5j0b3.ap-southeast-1.aws.neon.tech/default?sslmode=require",
    },
} satisfies Config;