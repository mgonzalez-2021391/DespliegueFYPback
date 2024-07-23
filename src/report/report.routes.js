import express from 'express'
import {
    createReport,
    updateReport,
    getReportById,
    deleteReport,
    getAllReports
} from './report.controller.js'
import { 
    validateJwt,
    isOneSelf,
    isAdmin
} from '../middlewares/validate-jwt.js';

const api = express.Router()

api.post('/createReport', [validateJwt, isAdmin],createReport)
api.put('/updateReport/:id', [validateJwt, isAdmin],updateReport)
api.get('/getReportById/:id', [validateJwt] ,getReportById)
api.delete('/deleteReport/:id',[validateJwt, isAdmin], deleteReport)
api.get('/getAll', [validateJwt,], getAllReports)

export default api