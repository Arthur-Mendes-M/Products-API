import { sql } from "../database/db.js";
import {randomUUID} from 'crypto'

class Database {
    async listEmployees() {
        const results = await sql`
            SELECT * FROM employees
        `

        return results
    }

    async createEmployee(employee) {
        // const employeeId = randomUUID()
        const {
            name,
            birthday,
            age,
            genderIdentity,
            pronoun,
            motherName,
            fatherName,
            rg,
            cpf,
            pis,
            employementCard,
            tel,
            cel,
            email,
            password,
            cep,
            address,
            number,
            neighborhood,
            city,
            state,
            office,
            sector,
            contract,
            grossSalary,
            hiring,
            benefits,
            bankAccount,
            bank,
            agency
        } = employee

        await sql`
            INSERT INTO employees (
                name, birthday, age, genderIdentity, pronoun, motherName, fatherName, rg, cpf, pis, employementCard, tel, cel, email, 
                password, cep, address, number, neighborhood, city, state, office, sector, contract, grossSalary, hiring, benefits, bankAccount, bank, agency
            ) VALUES (
                ${name},
                ${birthday},
                ${age},
                ${genderIdentity},
                ${pronoun},
                ${motherName},
                ${fatherName},
                ${rg},
                ${cpf},
                ${pis},
                ${employementCard},
                ${tel},
                ${cel},
                ${email},
                ${password},
                ${cep},
                ${address},
                ${number},
                ${neighborhood},
                ${city},
                ${state},
                ${office},
                ${sector},
                ${contract},
                ${grossSalary},
                ${hiring},
                ${benefits},
                ${bankAccount},
                ${bank},
                ${agency}
            );
        `.then(() => console.log('Deu certo')).catch((error) => console.log(error))
    }

    async updateEmployee(employeeId, newData) {
        await sql`
            UPDATE employees 
                SET 
                    name = ${newData.name},
                    birthday = ${newData.birthday},
                    age = ${newData.age},
                    genderIdentity = ${newData.genderIdentity},
                    pronoun = ${newData.pronoun},
                    motherName = ${newData.motherName},
                    fatherName = ${newData.fatherName},
                    rg = ${newData.rg},
                    cpf = ${newData.cpf},
                    pis = ${newData.pis},
                    employementCard = ${newData.employementCard},
                    tel = ${newData.tel},
                    cel = ${newData.cel},
                    email = ${newData.email},
                    password = ${newData.password},
                    cep = ${newData.cep},
                    address = ${newData.address}, 
                    number = ${newData.number},
                    neighborhood = ${newData.neighborhood},
                    city = ${newData.city}, 
                    state = ${newData.state},
                    office = ${newData.office},
                    sector = ${newData.sector},
                    contract = ${newData.contract},
                    grossSalary = ${newData.grossSalary},
                    hiring = ${newData.hiring},
                    benefits = ${newData.benefits},
                    bankAccount = ${newData.bankAccount},
                    bank = ${newData.bank},
                    agency = ${newData.agency}
                WHERE
                    id = ${employeeId}
        `
    }
}

export const DB = new Database()
