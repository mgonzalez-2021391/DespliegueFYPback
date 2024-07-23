'use strict'

import { Router } from 'express';
import { addVet, editVet, deleteVet, getAllVets, getVetById } from './vet.controller.js';
import { 
    validateJwt,
    isOneSelf,
    isAdmin
} from '../middlewares/validate-jwt.js';

const api = Router();


api.post('/add',[validateJwt, isAdmin], addVet);

api.put('/edit/:id',[validateJwt, isAdmin], editVet);

api.delete('/delete/:id',[validateJwt, isAdmin], deleteVet);

api.get('/getAll',[validateJwt], getAllVets);

api.get('/getById/:id',[validateJwt], getVetById);

export default api;
