import { sql } from "./db.js";

// sql`
//     DROP TABLE products
// `.then(() => console.log('Table has been deleted'))

sql`
    CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY ,
        name VARCHAR,
        birthday VARCHAR(10),
        age VARCHAR ,
        genderIdentity VARCHAR ,
        pronoun VARCHAR ,
        motherName VARCHAR ,
        fatherName VARCHAR ,
        rg VARCHAR ,
        cpf VARCHAR ,
        pis VARCHAR ,
        employementCard VARCHAR ,
        tel VARCHAR ,
        email VARCHAR ,
        password VARCHAR ,
        cep VARCHAR(10) ,
        address VARCHAR ,
        number VARCHAR ,
        neighborhood VARCHAR ,
        city VARCHAR ,
        state VARCHAR ,
        office VARCHAR ,
        sector VARCHAR ,
        contract VARCHAR ,
        grossSalary VARCHAR ,
        hiring VARCHAR ,
        benefits VARCHAR ,
        bankAccount VARCHAR , 
        bank VARCHAR ,
        agency VARCHAR 

    )
`.then(() => console.log('Table has been created'))

// console.log(sql)