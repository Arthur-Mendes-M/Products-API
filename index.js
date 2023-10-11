import express from 'express';
import cors from 'cors';
import router from './routes/employees.js';
import registersRouter  from './routes/registers.js'

const server = express();

server.use(cors());
server.use(express.json());

server.use('/employees', router);
server.use('/registers', registersRouter );

server.get('/', (request, response) => {
  response.status(200).send('<h1>Rota raiz :)</h1>');
});

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT || 4040
});
