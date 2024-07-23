import { Router } from 'express';
import {
    addVeterinary,
    editVeterinary,
    deleteVeterinary,
    getAllVeterinaries,
    getVeterinaryById
} from './veterinary.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const router = Router();

router.post('/add', [validateJwt], addVeterinary);
router.put('/edit/:id', [validateJwt], editVeterinary);
router.delete('/delete/:id', [validateJwt], deleteVeterinary);
router.get('/all', [validateJwt], getAllVeterinaries);
router.get('/:id', [validateJwt], getVeterinaryById);

export default router;