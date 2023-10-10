import { sql } from "../database/db.js";
import {randomUUID} from 'crypto'

class Database {
    async listEmployees() {
      const results = await sql`
        SELECT * FROM employees
      `

      return results
    }

    async getEmployee(employeeId) {
      const result = await sql`
        SELECT * FROM employees WHERE id = ${employeeId}
      `

      return result
    }

    async createEmployee(employee) {
      const {
        name, birthday, age, genderIdentity, pronoun, motherName, fatherName, rg, cpf, pis,
        employementCard, tel, cel, email, password, cep, address, number, neighborhood, city,
        state, office, sector, contract, journeyInit,  journeyEnd, grossSalary, hiring, benefits, bankAccount, bank, agency,
        employeePhotoName, employeePhoto
      } = employee;
    
      await sql`
        INSERT INTO employees (
          name, birthday, age, genderIdentity, pronoun, motherName, fatherName, rg, cpf, pis,
          employementCard, tel, cel, email, password, cep, address, number, neighborhood, city,
          state, office, sector, contract, journeyInit, journeyEnd, grossSalary, hiring, benefits, bankAccount, bank, agency, employeePhotoName, employeePhoto
        ) VALUES (
          ${name}, ${birthday}, ${age}, ${genderIdentity}, ${pronoun}, ${motherName}, ${fatherName}, ${rg},
          ${cpf}, ${pis}, ${employementCard}, ${tel}, ${cel}, ${email}, ${password}, ${cep}, ${address},
          ${number}, ${neighborhood}, ${city}, ${state}, ${office}, ${sector}, ${contract}, ${journeyInit}, ${journeyEnd}, ${grossSalary},
          ${hiring}, ${benefits}, ${bankAccount}, ${bank}, ${agency}, ${employeePhotoName}, ${employeePhoto}
        );
      `.then(() => console.log('Deu certo')).catch((error) => console.log(error))
    }

    async getEmployeePhoto(employeePhotoName) {
      const employeePhoto = await sql`
        SELECT employeePhoto FROM employees WHERE employeePhotoName = ${employeePhotoName}
      `
      console.log(employeePhoto.employeePhotoName)
      return employeePhoto.employeePhotoName.toString('base64')
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
            journeyInit = ${newData.journeyInit},
            journeyEnd = ${newData.journeyEnd},
            grossSalary = ${newData.grossSalary},
            hiring = ${newData.hiring},
            benefits = ${newData.benefits},
            bankAccount = ${newData.bankAccount},
            bank = ${newData.bank},
            agency = ${newData.agency},
            employeePhoto = ${newData.employeePhoto}   

          WHERE
            id = ${employeeId}
      `
    }
}

export const DB = new Database()
