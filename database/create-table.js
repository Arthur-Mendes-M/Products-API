import { sql } from "./db.js";

// sql`
//     DROP TABLE products
// `.then(() => console.log('Table has been deleted'))

sql`
    CREATE TABLE IF NOT EXISTS employees (
        id TEXT NOT NULL PRIMARY KEY,
        name VARCHAR NOT NULL,
        birthday VARCHAR(10) NOT NULL
    )
`.then(() => console.log('Table has been created'))

// console.log(sql)