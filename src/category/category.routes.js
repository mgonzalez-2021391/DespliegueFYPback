import { Router } from 'express';
import {
    test,
    save,
    getCategories,
    update,
    deleteC,
    search
} from './category.controller.js'
import { 
    validateJwt,
    isAdmin,
    isOneSelf
} from '../middlewares/validate-jwt.js';

const router = Router();

router.get('/test', [validateJwt],test);
router.post('/save',[validateJwt, isAdmin], save);
router.get('/getCategories',[validateJwt], getCategories);
router.put('/update/:id',[validateJwt, isAdmin], update);
router.delete('/delete/:id',[validateJwt, isAdmin], deleteC);
router.post('/search',[validateJwt], search);

export default router;
