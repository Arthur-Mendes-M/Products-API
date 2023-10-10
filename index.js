import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import router from './routes/employees.js';
import registersRouter  from './routes/registers.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(cors());
server.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use('/employees', router);
server.use('/registers', registersRouter );

server.get('/', (request, response) => {
  response.status(200).send();
});

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT || 4040
});
