import { sql } from "../database/db.js";
import {randomUUID} from 'crypto'

class Database {
  //Employee
  
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
      const result = await sql`
        SELECT employeePhoto FROM employees WHERE employeePhotoName = ${employeePhotoName}
      `

      console.log(typeof result)
      console.log('----------------')
      console.log(result)
      console.log('----------------')
      console.log(result[0])
      console.log('----------------')
      console.log(Buffer(result)) 
      console.log('----------------')
      console.log(new Buffer.from(result)) 

      return new Buffer.from(result)
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

    //Register

    async listRegister() {
      const results = await sql`
          SELECT * FROM registers
      `

      return results
  }

    async createRegister(registers) {
        const registerId = randomUUID()
        const {
            name,
            cnpj,
            stateRegistration,
            openingDate,
            corporateName,
            cep,
            address,
            number,
            neighborhood,
            city,
            state,
            email,
            confirmEmail,
            password,
            confirmPassword,
            finalCode    

        } = registers

        await sql`
            INSERT INTO registers (
                id,  name, cnpj, stateRegistration, openingDate, corporateName, cep, address, number,
                neighborhood, city, state, email, confirmEmail, password, confirmPassword, finalCode    
            ) VALUES (
                ${name},
                ${cnpj},
                ${stateRegistration},
                ${openingDate},
                ${corporateName},
                ${cep},
                ${address},
                ${number},
                ${neighborhood},
                ${city},
                ${state},
                ${email},
                ${confirmEmail},
                ${password},
                ${confirmPassword},
                ${finalCode}    
            );
        `
    }

  async updateResgiter(registerId, newData) {
      await sql`
          UPDATE registers
              SET 
              name = ${newData.name},
              cnpj = ${newData.cnpj},
              stateRegistration = ${newData.stateRegistration},
              openingDate = ${newData.openingDate},
              corporateName = ${newData.corporateName},
              cep = ${newData.cep},
              address = ${newData.address},
              number = ${newData.number},
              neighborhood = ${newData.neighborhood},
              city = ${newData.city},
              state = ${newData.state},
              email = ${newData.email},
              confirmEmail = ${newData.confirmEmail},
              password = ${newData.password},
              confirmPassword = ${newData.confirmPassword},
              finalCode  = ${newData.finalCode}
  
                 
              WHERE
                  id = ${registerId}
      `

      
  }
}



export const DB = new Database()
