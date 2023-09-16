import express from 'express'
const server = express()

import router from './routes/employees.js'
server.use(express.json())

server.use('/employees', router)

server.get('/', (request, response) => {
    console.log('Rota requisitada')
    response.status(200).send()
})

server.listen(3030)