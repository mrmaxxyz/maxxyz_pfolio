import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema'; // We will create this next
import dotenv from 'dotenv';

dotenv.config();

// Check if we are in a server environment
if (typeof window !== 'undefined') {
    throw new Error('db.ts should only be used on the server');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
