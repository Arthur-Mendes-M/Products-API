import { sql } from "../database/db.js";
import { vacationFactory } from "../factories/VacationFactory.js";
import fetch from "node-fetch";

class Database {
  //Employee

  async listEmployees() {
    const results = await sql`
      SELECT
        id, name, birthday, age, genderIdentity, pronoun, motherName, fatherName, rg, cpf, pis,
        employementCard, tel, cel, email, password, cep, address, number, neighborhood, city,
        state, office, sector, contract, journeyInit, journeyEnd, grossSalary, hiring, benefits, bankAccount, bank, agency, employeePhotoName
      FROM employees
    `;

    return results;
  }

  async getEmployeeById(employeeId) {
    const result = await sql`
      SELECT 
        id, name, birthday, age, genderIdentity, pronoun, motherName, fatherName, rg, cpf, pis,
        employementCard, tel, cel, email, password, cep, address, number, neighborhood, city,
        state, office, sector, contract, journeyInit, journeyEnd, grossSalary, hiring, benefits, bankAccount, bank, agency, employeePhotoName
      FROM employees WHERE id = ${employeeId}
    `;

    return result;
  }

  async getEmployeeByAccess(email, password) {
    const result = await sql`
      SELECT 
        id, name, birthday, age, genderIdentity, pronoun, motherName, fatherName, rg, cpf, pis,
        employementCard, tel, cel, email, password, cep, address, number, neighborhood, city,
        state, office, sector, contract, journeyInit, journeyEnd, grossSalary, hiring, benefits, bankAccount, bank, agency, employeePhotoName
      FROM employees WHERE email = ${email} AND password = ${password}
    `;

    return result;
  }

  async createEmployee(employee) {
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
      journeyInit,
      journeyEnd,
      grossSalary,
      hiring,
      benefits,
      bankAccount,
      bank,
      agency,
      employeePhotoName,
      employeePhoto,
    } = employee;

    await sql`
      INSERT INTO employees (
        name, birthday, age, genderIdentity, pronoun, motherName, fatherName, rg, cpf, pis,
        employementCard, tel, cel, email, password, cep, address, number, neighborhood, city,
        state, office, sector, contract, journeyInit, journeyEnd, grossSalary, hiring, benefits, bankAccount, bank, agency, employeePhotoName, employeePhoto
      ) VALUES (
        ${name ?? null}, ${birthday ?? null}, ${age ?? null}, ${
      genderIdentity ?? null
    }, ${pronoun ?? null}, ${motherName ?? null}, ${fatherName ?? null}, ${
      rg ?? null
    },
        ${cpf ?? null}, ${pis ?? null}, ${employementCard ?? null}, ${
      tel ?? null
    }, ${cel ?? null}, ${email ?? null}, ${password ?? null}, ${cep ?? null}, ${
      address ?? null
    },
        ${number ?? null}, ${neighborhood ?? null}, ${city ?? null}, ${
      state ?? null
    }, ${office ?? null}, ${sector ?? null}, ${contract ?? null}, ${
      journeyInit ?? null
    }, ${journeyEnd ?? null}, ${grossSalary ?? null},
        ${hiring ?? null}, ${benefits ?? null}, ${bankAccount ?? null}, ${
      bank ?? null
    }, ${agency ?? null}, ${employeePhotoName ?? null}, ${employeePhoto ?? null}
      );
    `
      .then(() => {
        console.log("Novo funionário registrado");

        if (
          employee.name !== null ||
          employee.name !== undefined ||
          employee.name !== ""
        ) {
          fetch(
            "https://stafflink-chat-server.onrender.com/api/auth/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: name,
                email,
                password,
                isAvatarImageSet: true,
                avatarImage: employeePhotoName,
              }),
              credentials: "include",
            }
          ).then(() => {
            console.log("Novo usuário do chat interno cadastrado com sucesso");
          });
        }
      })
      .catch((error) => console.log(error));
  }

  async getEmployeePhoto(employeePhotoName) {
    const result = await sql`
      SELECT employeePhoto FROM employees WHERE employeePhotoName = ${employeePhotoName}
    `;

    const employeePhoto = result[0].employeephoto;
    const buffer = new Buffer.from(employeePhoto);

    return buffer;
  }

  async updateEmployee(employeeId, newData) {
    console.log(employeeId);
    console.log("-------------");
    console.log(newData);

    if (!newData.employeePhotoName || !newData.employeePhoto) {
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
          agency = ${newData.agency}

        WHERE
          id = ${employeeId}
      `
        .then(() =>
          console.log(`Dados do funcionário ${newData.name}, alterados`)
        )
        .catch((error) => console.log(error));
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
        .then(() => {
          console.log(`Dados do funcionário ${newData.name}, alterados`);

          fetch(
            `https://stafflink-chat-server.onrender.com/api/auth/getUserByEmail/${newData.email}`
          )
            .then((data) => data.json())
            .then((user) => {
              if (user && user._id) {
                fetch(
                  `https://stafflink-chat-server.onrender.com/api/auth/setavatar/${user._id}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      image: newData.employeePhotoName,
                    }),
                    credentials: "include",
                  }
                ).then(() => {
                  console.log("Foto alterado com sucesso");
                });
              }
            });
        })
        .catch((error) => console.log(error));
    }
  }

  async deleteEmployee(employeeId) {
    await sql`
      DELETE FROM employees WHERE id = ${employeeId}
    `
      .then(() => console.log(`Funcionário de ID: ${employeeId} deletado`))
      .catch((error) => console.log(error));
  }

  //Register

  async listRegister() {
    const results = await sql`
        SELECT * FROM registers
    `;

    return results;
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
      finalCode,
    } = registers;

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
      `;
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
    `;
  }

  //News

  async listNews() {
    const results = await sql`
      SELECT 
        id,
        title,
        expirationDate,
        description,
        bannerFileName
      FROM news
    `;

    return results;
  }

  async getNews(newsId) {
    const result = await sql`
      SELECT 
        id,
        title,
        expirationDate,
        description,
        bannerFileName
      FROM news WHERE id = ${newsId}
    `;

    return result;
  }

  async createNews(news) {
    const { title, expirationDate, description, bannerFileName, bannerFile } =
      news;

    await sql`
      INSERT INTO news (
        title, expirationDate, description, bannerFileName, bannerFile
      ) VALUES (
        ${title},${expirationDate},${description},${bannerFileName},${bannerFile}
      );
    `
      .then(() => console.log("Nova notícia registrada"))
      .catch((error) => console.log(error));
  }

  async getbannerFile(bannerFileName) {
    const result = await sql`
      SELECT bannerFile FROM news WHERE bannerFileName = ${bannerFileName}
    `;

    const bannerFile = result[0].bannerfile;
    const buffer = new Buffer.from(bannerFile);

    return buffer;
  }

  async updateNews(newsId, newData) {
    if (!newData.bannerFileName || !newData.bannerFile) {
      await sql`
        UPDATE news 
          SET 
            name = ${newData.name},
            title = ${newData.title}, 
            expirationDate = ${newData.expirationDate},
            description = ${newData.description}, 
        WHERE
            id = ${newsId}
      `;
    } else {
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
      `;
    }
  }

  async deleteNews(newsId) {
    await sql`
      DELETE FROM news WHERE id = ${newsId}
    `;
  }

  //Attendance

  async getAttendanceOfCurrentEmployee(employeeId) {
    let result = await sql`
      SELECT * FROM attendance WHERE employeeIdAttendance = ${
        employeeId ?? null
      };
    `;

    return result;
  }

  async getAttendanceOfEveryEmployee() {
    let result = await sql`
      SELECT name, sector, employeePhotoName, journeyInit, journeyEnd, attendanceDate, entrance, departure, employeeIdAttendance
      FROM attendance
      INNER JOIN employees ON employees.id = CAST(attendance.employeeIdAttendance AS INTEGER)
    `;

    return result;
  }

  async registerAttendance(attendance) {
    await sql`
      INSERT INTO attendance (
        attendanceDate, 
        entrance, 
        departure, 
        employeeIdAttendance
      ) VALUES (
        ${attendance.date ?? null},
        ${attendance.entrance ?? null},
        ${attendance.departure ?? null},
        ${attendance.employeeId ?? null}
      )
    `;
  }

  async deleteAttendance(employeeId) {
    await sql`
      DELETE FROM attendance WHERE employeeIdAttendance = ${employeeId}
    `;
  }

  async updateAttendanceDeparture(employeeId, newAttendanceDeparture) {
    await sql`
      UPDATE attendance
      SET departure = ${newAttendanceDeparture}
      WHERE employeeidattendance = ${employeeId} AND departure IS NULL
    `;
  }

  //Vacation

  async listVacations() {
    const results = await sql`
        SELECT * FROM vacation
    `;

    return results;
  }

  async registerVacation(vacation) {
    await sql`
      INSERT INTO vacation (
        title, 
        eventend, 
        eventstart
      ) VALUES (
        ${vacation.title},
        ${vacation.eventend},
        ${vacation.eventstard}
      )
    `;
  }

  async deleteVacation(id) {
    await sql`
      DELETE FROM vacation WHERE id = ${id}
    `;
  }


  //Token

  async registerTolken(tolken) {
    await sql`
      INSERT INTO tolken (
       tolkenNumber
      ) VALUES (
        ${tolken.tolkenNumber}
      )
    `;
  }

  async getTolken() {
    let result = await sql`
    SELECT * FROM tolken
  `;
    return result;
  }

  async updateTolken(tolkenNumber, newTolkenNumber) {
    await sql`
      UPDATE tolken
      SET tolkenNumber = ${newTolkenNumber}
      WHERE tolkenNumber = ${tolkenNumber}
    `;
  }
}

export const DB = new Database();
