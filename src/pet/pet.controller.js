'use strict'

import Pet from './pet.model.js';

export const addPet = async (req, res) => {
    try {
        const { namePet, race, gender, age, description, image } = req.body;  // Incluye el campo image
        const newPet = new Pet({ namePet, race, gender, age, description, image });  // Pasa el campo image al constructor de Pet
        const petSaved = await newPet.save();

        return res.send({ message: 'Pet added successfully', petSaved });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding pet', err });
    }
};

export const editPet = async (req, res) => {
    try {
        const { id } = req.params;
        const { namePet, race, gender, age, description, image } = req.body;  // Incluye el campo image

        const petExist = await Pet.findById(id);
        if (!petExist) return res.status(404).send({ message: 'Pet not found or does not exist' });

        if (namePet !== undefined) petExist.namePet = namePet;
        if (race !== undefined) petExist.race = race;
        if (gender !== undefined) petExist.gender = gender;
        if (age !== undefined) petExist.age = age;
        if (description !== undefined) petExist.description = description;
        if (image !== undefined) petExist.image = image;  // Actualiza el campo image si está presente

        const updatedPet = await petExist.save();

        return res.send({ message: 'Pet updated successfully', updatedPet });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating pet', err });
    }
};

export const deletePet = async (req, res) => {
    try {
        const { id } = req.params;

        const petExist = await Pet.findById(id);
        if (!petExist) return res.status(404).send({ message: 'Pet not found or does not exist' });

        await Pet.findByIdAndDelete(id);

        return res.send({ message: 'Pet deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting pet', err });
    }
};

export const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();

        if (!pets) return res.status(404).send({ message: 'No pets found' });

        return res.send({ message: 'Pets found:', pets });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting pets', err });
    }
};

export const getPetById = async (req, res) => {
    try {
        const { id } = req.params;

        const pet = await Pet.findById(id);
        if (!pet) return res.status(404).send({ message: 'Pet not found or does not exist' });

        return res.send({ message: 'Pet found:', pet });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting pet', err });
    }
};
