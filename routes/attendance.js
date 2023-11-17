import express from "express";
import { sql } from "../database/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let comand = await sql`
    SELECT * FROM attendance
  `;

  res.json(comand);
});

router.post("/", async (req, res) => {
  const attendance = req.body;

  await sql`
    INSERT INTO attendance (
      attendanceDate, 
      entrance, 
      departure, 
      employeeIdAttendance
    ) VALUES (
      ${attendance.date},
      ${attendance.entrance},
      ${attendance.departure},
      ${attendance.employeeId}
    )
  `
    .then(() => {
      console.log("Deu certo");
    })
    .catch((error) => {
      console.log("Erro no SQL");
      console.log(error.message);
      console.log(req.body);
    });

  res.status(200).send();
});

export default router;
