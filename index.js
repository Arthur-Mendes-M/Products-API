import express from 'express'
import cors from 'cors'
import router from './routes/employees.js'

const server = express()

server.use(cors())
server.use(express.json())

server.use('/employees', router)

server.get('/', (request, response) => {
    response.status(200).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 4040
})