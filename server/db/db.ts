import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// for migrations
const queryClient = postgres("postgresql://default_owner:CaVUeDKB8H4d@ep-weathered-sky-a1p5j0b3.ap-southeast-1.aws.neon.tech/default?sslmode=require", { max: 1 });

const db = drizzle(queryClient);

export const database = db; 