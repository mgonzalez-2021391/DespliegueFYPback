'use strict'

import Category from './category.model.js'

//Test
export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

//Guardar categoria
export const save = async (req, res) => {
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({ message: `Category saved succesfully: ${category.name}` })
    } catch (err) {
        console.error(err)
        return res.status(200).send({ message: 'Error saving category', err: err })
    }
}

//Obteniene las categorias
export const getCategories = async (req, res) => {
    try {
        const category = await Category.find();
        return res.send(category)
    } catch (err) {
        console.error(err);
        return res.status(404).send({ message: 'error getting category' })
    }
}

//Actualizar categoria
export const update = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        if (update === false) return res.status(400).send({ message: 'enter all data' })
        let updateCat = await Category.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateCat) return res.status(401).send({ message: 'Category not found and not updated' })
        return res.send({ message: 'Updated category', updateCat })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'error updating' })

    }
}

//Eliminar la categoria
export const deleteC = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedCategory = await Category.findOneAndDelete({ _id: id });
        if (!deletedCategory) return res.status(404).send({ message: 'Category not found and not deleted' })
        return res.send({ message: `Category with name ${deletedCategory.name} deleted successfully` })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting Category' });
    }
}

//Buscar categoria
export const search = async (req, res) => {
    try {
        let { search } = req.body
        const aprox = new RegExp(search, 'i')
        let category = await Category.find({ name: aprox })
        if (!category) return res.status(404).send({ message: 'Category not found' })
        return res.send({ message: 'Category found', category })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error searching Category' })
    }
}

//categori default
export const defaultCategory = async (req, res) => {
    try {
        const categoryExist = await Category.findOne({ name: 'default' })

        if (categoryExist) {
            return console.log('The default category has already been created')
        }
        let data = {
            name: 'default',
            description: 'default'
        }
        let category = new Category(data)
        await category.save()
        console.log(data)
    } catch (err) {
        console.error(err)
    }
}