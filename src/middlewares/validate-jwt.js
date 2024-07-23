'use strict';

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'
import Comment from '../comment/comment.model.js'


const secretKey = '@CodeCookers@';

export const validateJwt = async (req, res, next) => {
    try {
        let { authorization } = req.headers;

        if (!authorization) return res.status(401).send({ message: 'Unauthorized' });

        if (authorization.startsWith('Bearer ')) {
            authorization = authorization.slice(7, authorization.length).trimLeft();
        } else {
            return res.status(401).send({ message: 'Unauthorized, invalid token format' });
        }

        let { uid } = jwt.verify(authorization, secretKey);

        let user = await User.findOne({ _id: uid });
        if (!user) return res.status(404).send({ message: 'User not found - Unauthorized' });

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).send({ message: 'Invalid token' });
    }
};

// Middlewares para validar roles
export const isAdmin = async (req, res, next) => {
    try {
        let { user } = req;
        if (!user || user.role !== 'ADMIN') {
            return res.status(403).send({ message: `You don't have access | username: ${user.username || 'unknown'}` });
        }
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).send({ message: 'Unauthorized role' });
    }
};

export const isClient = async (req, res, next) => {
    try {
        let { user } = req;
        if (!user || user.role !== 'CLIENT') {
            return res.status(403).send({ message: `Access restricted to CLIENT role | username: ${user.username || 'unknown'}` });
        }
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).send({ message: 'Unauthorized role' });
    }
};


export const isOneSelf = async (req, res, next) => {
    try {
        const { user } = req;
        const { id } = req.params;

        // Verificar si el rol es CLIENT
        if (user.role !== 'CLIENT') {
            return res.status(403).send({ message: `Access restricted to CLIENT role | username: ${user.username || 'unknown'}` });
        }

        // Verificar si el comentario existe y pertenece al usuario autenticado
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found' });
        }

        if (comment.userId !== user._id) {
            return res.status(403).send({ message: `You can only access your own comments | username: ${user.username || 'unknown'}` });
        }

        next();
    } catch (err) {
        console.error(err);
        return res.status(403).send({ message: 'Unauthorized role' });
    }
};
