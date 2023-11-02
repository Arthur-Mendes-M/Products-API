import { sql } from "../database/db.js";

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

      const employeePhoto = result[0].employeephoto
      const buffer = new Buffer.from(employeePhoto)

      return buffer
    }

    async updateEmployee(employeeId, newData) {
      if(!newData.employeePhotoName || !newData.employeePhoto) {
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

          WHERE
            id = ${employeeId}
        `
      } else {
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
              employeePhoto = ${newData.employeePhoto},   
              employeePhotoName = ${newData.employeePhotoName}   

            WHERE
              id = ${employeeId}
        `
      }
    }

    //Register

    async listRegister() {
      const results = await sql`
          SELECT * FROM registers
      `

      return results
  }

    async createRegister(registers) {
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
                name, cnpj, stateRegistration, openingDate, corporateName, cep, address, number,
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

  //News

  async listNews() {
    const results = await sql`
      SELECT * FROM news
    `

    return results
  }

  async getNews(newsId) {
    const result = await sql`
      SELECT * FROM news WHERE id = ${newsId}
    `

    return result
  }

  async createNews(news) {
    const {
      title, expirationDate, description, bannerFileName, bannerFile
    } = news;
  
    await sql`
      INSERT INTO news (
        title, expirationDate, description, bannerFileName, bannerFile
      ) VALUES (
        ${title},${expirationDate},${description},${bannerFileName},${bannerFile}
      );
    `.then(() => console.log('Deu certo')).catch((error) => console.log(error))
  }

  async getbannerFile(bannerFileName) {
    const result = await sql`
      SELECT bannerFile FROM news WHERE bannerFileName = ${bannerFileName}
    `

    const bannerFile = result[0].bannerfile
    const buffer = new Buffer.from(bannerFile)

    return buffer
  }

  async updateNews(newsId, newData) {
    await sql`
     UPDATE news 
       SET 
         name = ${newData.name},
         title = ${newData.title}, 
         expirationDate = ${newData.expirationDate},
          description = ${newData.description}, 
          bannerFileName = ${newData.bannerFileName}, 
          bannerFile = ${newData.bannerFile}

       WHERE
         id = ${newsId}
   `
 }

  async deleteNews(newsId) {
    await sql`
      DELETE FROM news WHERE id = ${newsId}
    `
  }

}



export const DB = new Database()
