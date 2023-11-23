import express from "express";
import { DB } from "../models/Database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const attendance = await DB.getAttendanceOfEveryEmployee();

  res.status(200).json(attendance);
});

router.get("/:employeeId", async (req, res) => {
  const attendance = await DB.getAttendanceOfCurrentEmployee(
    req.params.employeeId
  );

  res.status(200).json(attendance);
});

router.post("/", async (req, res) => {
  const attendance = req.body;

  await DB.registerAttendance(attendance);

  res.status(200).send();
});

router.delete("/:employeeId", async (req, res) => {
  const employeeId = req.params.employeeId;

  await DB.deleteAttendance(employeeId);

  res
    .status(201)
    .json({ message: "Marcação de ponto removida(s) com sucesso" });
});

router.put("/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  const { newAttendanceDeparture } = req.body;

  if (!employeeId || !newAttendanceDeparture) {
    return res.status(400).json({
      error: "attendanceDeparture e newAttendanceDeparture são obrigatórios",
    });
  }

  try {
    await DB.updateAttendanceDeparture(employeeId, newAttendanceDeparture);
    return res.status(200).send();
  } catch (err) {
    console.error("Erro ao atualizar saída da table", err.message);
    return res
      .status(500)
      .json({ err: "Erro interno ao atualizar saída (departure" });
  }
});

export default router;
