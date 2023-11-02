import express from 'express';
import { DB } from '../models/Database.js'; 
import multer from 'multer';
import 'dotenv/config';

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;

    let completeEmployee = {
      ...req.body,
      employeePhotoName: `${Date.now()}-${originalname}`,
      employeePhoto: buffer
    }

    const benefits = req.body?.benefits
    if(Array.isArray(benefits)) {
      completeEmployee.benefits = benefits.join(', ')
    } else {
      completeEmployee.benefits = benefits ?? ''
    }

    await DB.createEmployee(completeEmployee);

    res.status(201).json({ message: `Funcionário registrado com sucesso!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao carregar a imagem ou criar o registro de funcionário' });
  }
});

router.get('/photo/:photoName', async (req, res) => {
  try {
    const employeePhotoName = req.params.photoName
  
    const photo = await DB.getEmployeePhoto(employeePhotoName)
  
    res.setHeader('Content-Type', 'image/jpeg')

    res.end(photo);
  } catch (error) {
    res.status().send({message: 'Erro ao exibir a imagem', error});
  }
})

router.get('/', async (req, res) => {
  const employees = await DB.listEmployees();

  res.status(200).json(employees);
});

router.get('/:id', async (req, res) => {
  const employee = await DB.getEmployee(req.params.id);

  res.status(200).json(employee)
})

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const employeeId = req.params.id;
    let completeEmployee = {}
    
    if(req.file !== undefined) {
      const { originalname, buffer } = req.file;
  
      completeEmployee = {
        ...req.body,
        employeePhotoName: `${Date.now()}-${originalname}`,
        employeePhoto: buffer
      }
    } else {
      completeEmployee = {
        ...req.body,
      }
    }

    const benefits = req.body?.benefits
      if(Array.isArray(benefits)) {
        completeEmployee.benefits = benefits.join(', ')
      } else {
        completeEmployee.benefits = benefits ?? ''
      }
  
    await DB.updateEmployee(employeeId, completeEmployee);
  
    res.status(204).json({ message: 'Funcionário atualizado com sucesso' });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao carregar a imagem ou criar o registro de funcionário' });
  }
});


export default router;
