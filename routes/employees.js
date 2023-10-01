import { Router } from 'express'
import { DB } from '../models/Database.js'
const router = Router()

router.get('/', async (request, response) => {
    const employees = await DB.listEmployees()
    
    response.status(200).json(employees)
})

router.post('/', async (request, response) => {
    let employee = request.body
    employee = {
        ...employee,
        benefits: benefits.join(", ")
    }

    await DB.createEmployee(employee)

    response.status(201).send()
})

router.put('/:id', async (request, response) => {
    const employeeId = request.params.id
    const newData = request.body

    await DB.updateEmployee(employeeId, newData)

    response.status(200).send()
})

export default router