import express from 'express';
import { 
    validateJwt,
    isOneSelf,
    isClient,
    isAdmin
} from '../middlewares/validate-jwt.js';
import {
    test,
    add,
    getPublications,
    editPublication,
    deletePublication,
    getAllPublications
} from './publication.controller.js';

const api = express.Router();

// Rutas públicas
api.get('/test', test);

// Rutas privadas (solo usuarios logeados)
api.post('/add', [validateJwt, isClient], add);
api.get('/list', [validateJwt], getPublications);
api.put('/edit/:id', [validateJwt, isClient], editPublication);
api.delete('/delete/:id', [validateJwt, isClient], deletePublication);
api.get('/listPublications', [validateJwt], getAllPublications)

export default api;
