import express from 'express'
import {
    createPay,
    updatePay,
    getPayById,
    deletePay
} from './pay.controller.js'

const api = express.Router()

api.post('/createPay', createPay)
api.put('/updatePay/:id', updatePay)
api.get('/getPayById/:id', getPayById)
api.delete('/deletePay/:id', deletePay)

export default api