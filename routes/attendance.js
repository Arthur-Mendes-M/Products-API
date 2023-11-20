import express from "express";
import { DB } from "../models/Database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const attendance = await DB.getAttendanceOfEveryEmployee();

  res.status(200).json(attendance);
});

router.get("/:employeeId", async (req, res) => {
  const attendance = await DB.getAttendanceOfCurrentEmployee();

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

export default router;
