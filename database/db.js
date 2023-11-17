import 'dotenv/config';

import postgres from 'postgres';


const { KEY } = process.env;

//banco de dados registrado na conta da Isabelle (anterior)
// const URL = `postgres://postgres.krjkgqzmglevncbdxkqa:${KEY}@aws-0-sa-east-1.pooler.supabase.com:6543/postgres`

//banco de dados atual
const URL = `postgres://postgres.tintsvczytunzvrfiopx:${KEY}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`

export const sql = postgres(URL, { ssl: 'require' })
