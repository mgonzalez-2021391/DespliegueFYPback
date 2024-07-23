import { Router } from 'express';
import {
    createComment,
    getComments,
    getCommentById,
    updateComment,
    deleteComment
} from './comment.controller.js'
import { 
    validateJwt,
    isAdmin,
    isClient,
    isOneSelf
} from '../middlewares/validate-jwt.js';


const router = Router();

router.post('/create', [validateJwt, isClient], createComment);
router.get('/get', [validateJwt],getComments);
router.get('/getById/:id', [validateJwt],getCommentById);
router.put('/update/:id', [validateJwt, isClient],updateComment);
router.delete('/delete/:id',[validateJwt, isClient], deleteComment);

export default router;
