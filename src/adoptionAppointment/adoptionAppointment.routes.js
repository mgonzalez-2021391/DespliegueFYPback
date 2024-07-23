import express from 'express'
import {
    createAdoptionAppointment,
    updateAdoptionAppointment,
    getAdoptionAppointmentById,
    deleteAdoptionAppointment
} from '../adoptionAppointment/adoptionAppointment.controller.js'
import { 
    validateJwt,
    isOneSelf,
    isClient,
    isAdmin
} from '../middlewares/validate-jwt.js';

const api = express.Router()

api.post('/adoptionAppointment',[validateJwt, isClient],  createAdoptionAppointment)
api.put('/adoptionAppointment/:id',[validateJwt, isClient],  updateAdoptionAppointment)
api.get('/adoptionAppointment/:id',[validateJwt],  getAdoptionAppointmentById)
api.delete('/adoptionAppointment/:id',[validateJwt, isClient],  deleteAdoptionAppointment)

export default api
