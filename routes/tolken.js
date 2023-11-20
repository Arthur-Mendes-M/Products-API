import express from "express";
import { DB } from "../models/Database.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const tolken = req.body;

  await DB.registerTolken(tolken);

  res.status(200).send();
});

router.get("/", async (req, res) => {
  const tolken = await DB.getTolken();

  res.status(200).json(tolken);
});

router.put("/:tolkenNumber", async (req, res) => {
  const { tolkenNumber } = req.params;
  const { newTolkenNumber } = req.body;

  if (!tolkenNumber || !newTolkenNumber) {
    return res
      .status(400)
      .json({ error: "tolkenNumber e newTolkenNumber são obrigatórios" });
  }

  try {
    await DB.updateTolken(tolkenNumber, newTolkenNumber);
    return res.status(200).send();
  } catch (err) {
    console.error("Erro ao atualizar tolken:", err.message);
    return res.status(500).json({ err: "Erro interno ao atualizar tolken" });
  }
});

export default router;
