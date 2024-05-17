import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationClient = postgres("postgresql://default_owner:CaVUeDKB8H4d@ep-weathered-sky-a1p5j0b3.ap-southeast-1.aws.neon.tech/default?sslmode=require", { max: 1 });
await migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' })

console.log("All Migration Completed!... 🚀🚀")
migrationClient.end()