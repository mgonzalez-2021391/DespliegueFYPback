import express from 'express'
import {
    createAppointment,
    updateAppointment,
    getAppointmentById,
    deleteVeterinaryAppointment,
    getVeterinaryAppointments
} from '../veterinaryAppointment/veterinaryAppoinment.controller.js'
import { 
    validateJwt,
    isOneSelf,
    isClient,
    isAdmin
} from '../middlewares/validate-jwt.js';

const api = express.Router();

api.post('/createAppointment', [validateJwt], createAppointment)
api.post('/updateAppointment/:id',[validateJwt], updateAppointment)
api.post('/getAppointmentById/:id',[validateJwt], getAppointmentById)
api.post('/getAppointments/:id',[validateJwt], getVeterinaryAppointments)
api.post('/deleteAppointment/:id',[validateJwt], deleteVeterinaryAppointment)

export default api