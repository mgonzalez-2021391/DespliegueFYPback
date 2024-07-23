import Comment from './comment.model.js'
import Publication from '../publication/publication.model.js';
import User from '../user/user.model.js';

// Crear un nuevo comentario
export const createComment = async (req, res) => {
    try {
        const { userId, publicationId, comment } = req.body;

        // Verificar que el usuario y la publicación existen
        const user = await User.findById(userId);
        const publication = await Publication.findById(publicationId);

        if (!user || !publication) {
            return res.status(404).send({ message: 'User or Publication not found' });
        }

        const newComment = new Comment({
            user: userId,
            publication: publicationId,
            comment
        });

        const savedComment = await newComment.save();
        res.status(201).send(savedComment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Obtener todos los comentarios
export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('user', 'username')
            .populate('publication', 'title');
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Obtener un comentario por ID
export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id)
            .populate('user', 'username')
            .populate('publication', 'title');
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found' });
        }

        res.status(200).send(comment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Actualizar un comentario por ID
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(id, { comment }, { new: true });

        if (!updatedComment) {
            return res.status(404).send({ message: 'Comment not found' });
        }

        res.status(200).send(updatedComment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Eliminar un comentario por ID
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).send({ message: 'Comment not found' });
        }

        res.status(200).send({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
