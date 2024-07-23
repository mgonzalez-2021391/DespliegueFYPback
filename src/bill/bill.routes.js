import express from 'express'
import {
    createBill,
    updateBill,
    getBillById,
    deleteBill
} from './bill.controller.js'

const api = express.Router()

api.post('/createBill', createBill)
api.put('/updateBill/:id', updateBill)
api.get('/getBillById/:id', getBillById)
api.delete('/deleteBill/:id', deleteBill)

export default api