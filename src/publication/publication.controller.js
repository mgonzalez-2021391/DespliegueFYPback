import Publication from './publication.model.js';
import Category from '../category/category.model.js';

export const test = (req, res) => {
    console.log('test is running');
    return res.send({ msg: 'Test is running' });
}

export const add = async (req, res) => {
    try {
        let { title, description, category, imageUrl } = req.body;
        let userId = req.user.id;

        // Verificar si la categoría existe
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).send({ msg: 'Category not found' });
        }

        const publication = new Publication({
            title,
            description,
            category,
            user: userId,
            imageUrl
        });
        await publication.save();
        return res.status(201).send({ msg: 'Publication created successfully', publication });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: 'Error creating publication' });
    }
}

export const getPublications = async (req, res) => {
    const { id } = req.user;
    try {
        const publications = await Publication.find({ user: id }).populate('category', ['name']).populate('user', ['username']);
        return res.send(publications);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting publications' });
    }
}

export const editPublication = async (req, res) => {
    try {
        let { id } = req.params;
        let { title, category, description } = req.body;
        let userId = req.user.id;

        // Verificar si la categoría existe
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).send({ msg: 'Category not found' });
        }

        // Encontrar la publicación y verificar si pertenece al usuario
        const publication = await Publication.findOne({ _id: id, user: userId });
        if (!publication) {
            return res.status(404).send({ message: 'Publication not found or you are not authorized to edit this publication' });
        }

        // Actualizar la publicación
        publication.title = title;
        publication.category = category;
        publication.description = description;

        await publication.save();
        return res.send({ message: 'Publication updated successfully', publication });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating publication' });
    }
}

export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const publication = await Publication.findOne({ _id: id, user: userId });
        if (!publication) {
            return res.status(404).send({ message: 'Publication not found or you are not authorized to delete this publication' });
        }

        const deletedPublication = await Publication.deleteOne({ _id: id });
        if (deletedPublication.deletedCount === 0) return res.status(404).send({ message: 'Publication not found and not deleted' });
        return res.send({ message: 'Publication deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting publication' });
    }
};

export const getAllPublications = async (req, res) => {
    try {
        const publications = await Publication.find();
        if (!publications) return res.status(404).send({ message: 'No publications found' });
        return res.send({ message: 'Publication found:', publications });
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting publications', err })
    }
}