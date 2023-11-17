import express from 'express';
import { DB } from '../models/Database.js'; 

const router = express.Router();

router.get("/cadastro", (req, res) => {
  res.render("create");
});
  
router.post("/create", async (req, res) => {
  const { name, email, description, cpf, date, time } = req.body;

  try {
    await DB.createVacation(name, email, description, cpf, date, time);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Ocorreu uma falha!");
  }
});

router.get("/getcalendar", async (req, res) => {
  const vacations = await DB.getAllVacations(false);
  res.json(vacations);
});

export default router