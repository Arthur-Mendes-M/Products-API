import { Router } from 'express'
import { DB } from '../models/database.js'
const router = Router()

router.get('/', async (request, response) => {
    const employees = await DB.listEmployees()
    
    response.status(200).json(employees)
})

router.post('/', async (request, response) => {
    const employee = request.body

    await DB.createEmployee(employee)

    response.status(201).send()
})

export default router