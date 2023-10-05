import express from 'express';
import { DB } from '../models/Database.js'; // Certifique-se de que o caminho esteja correto
import multer from 'multer';

const router = express.Router();

// Configuração do armazenamento de arquivos com Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Diretório onde as imagens serão armazenadas
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo no servidor
  },
});

const upload = multer({ storage: storage });
router.use('/uploads', express.static('./uploads'))

router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Obtenha outros dados do corpo da solicitação
    let compleEmployee = {
        ...req.body,
        employeePhoto: req.file.filename
    }

    const benefits = req.body?.benefits
    if(Array.isArray(benefits)) {
      compleEmployee.benefits = benefits.join(', ')
    } else {
      compleEmployee.benefits = benefits ?? ''
    }

    // Salve o funcionário no banco de dados
    await DB.createEmployee(compleEmployee);

    // res.status(200).json({ message: 'Imagem carregada e registro de funcionário criado com sucesso' });
    res.status(201).json({ message: `Funcionário registrado com sucesso!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao carregar a imagem ou criar o registro de funcionário' });
  }
});

router.get('/', async (req, res) => {
  const employees = await DB.listEmployees();

  res.status(200).json(employees);
});

router.get('/:id', async (req, res) => {
  const employee = await DB.getEmployee(req.params.id);

  res.status(200).json(employee)
})

router.put('/:id', async (req, res) => {
  const employeeId = req.params.id;
  const newData = req.body;

  await DB.updateEmployee(employeeId, newData);

  res.status(204).json({ message: 'Funcionário atualizado com sucesso' });
});

export default router;
