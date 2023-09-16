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
        const employeeId = randomUUID()
        const {
            name,
            birthday
        } = employee

        await sql`
            INSERT INTO employees (
                id, name, birthday
            ) VALUES (
                ${employeeId},
                ${name},
                ${birthday}
            );
        `
    }
}

export const DB = new Database()