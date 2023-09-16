import 'dotenv/config';

import postgres from 'postgres';

const { KEY } = process.env;
const URL = `postgresql://postgres:${KEY}@db.dfuzvzcidqfofqvyogep.supabase.co:5432/postgres`

export const sql = postgres(URL, { ssl: 'require' })