import { sql } from "./db.js";

// sql`
//     DROP TABLE products
// `.then(() => console.log('Table has been deleted'))

sql`
    CREATE TABLE IF NOT EXISTS employees (
        id TEXT NOT NULL PRIMARY KEY,
        name VARCHAR NOT NULL,
        birthday VARCHAR(10) NOT NULL,
        age INT NOT NULL,
        genderIdentity VARCHAR NOT NULL,
        pronoun VARCHAR NOT NULL,
        motherName VARCHAR NOT NULL,
        fatherName VARCHAR NOT NULL,
        rg VARCHAR NOT NULL,
        cpf VARCHAR NOT NULL,
        pis VARCHAR NOT NULL,
        employementCard VARCHAR NOT NULL,
        tel VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        cep VARCHAR(10) ,
        address VARCHAR ,
        number INT ,
        neighborhood VARCHAR ,
        city VARCHAR ,
        state VARCHAR ,
        office VARCHAR NOT NULL,
        sector VARCHAR NOT NULL,
        contract VARCHAR NOT NULL,
        grossSalary VARCHAR NOT NULL,
        hiring VARCHAR NOT NULL,
        benefits VARCHAR NOT NULL,
        bankAccount VARCHAR NOT NULL, 
        bank VARCHAR NOT NULL,
        agency VARCHAR NOT NULL

    )
`.then(() => console.log('Table has been created'))

// console.log(sql)