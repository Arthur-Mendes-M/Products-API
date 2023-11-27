import express from "express";
import { DB } from "../models/Database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const vacations = await DB.listVacations();

  res.status(200).json(vacations);
});

router.post("/", async (req, res) => {
  const vacation = req.body;

  await DB.registerVacation(vacation);

  res.status(200).send();
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await DB.deleteVacation(id);

  res.status(201).json({ message: "Registro removido com sucesso" });
});

export default router;
