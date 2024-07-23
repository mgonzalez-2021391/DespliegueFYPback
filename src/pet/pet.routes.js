'use strict'

import { Router } from 'express';
import { addPet, editPet, deletePet, getAllPets, getPetById} from './pet.controller.js';
import { 
    validateJwt,
    isOneSelf,
    isClient,
    isAdmin
} from '../middlewares/validate-jwt.js';

const api = Router();


api.post('/add',[validateJwt, isAdmin], addPet);

api.put('/edit/:id',[validateJwt, isAdmin], editPet);

api.delete('/delete/:id',[validateJwt, isAdmin], deletePet);

api.get('/getAll',[validateJwt], getAllPets);

api.get('/getById/:id',[validateJwt], getPetById);


export default api;
