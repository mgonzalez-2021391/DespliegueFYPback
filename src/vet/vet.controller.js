'use strict'

import Vet from './vet.model.js';

const validatePhoneNumber = (phoneNumber) => {
    return /^\d{8}$/.test(phoneNumber);
};

export const addVet = async (req, res) => {
    try {
        const { name, surname, phoneNumber } = req.body;

        if (!validatePhoneNumber(phoneNumber)) {
            return res.status(400).send({ message: 'Phone number must be exactly 8 digits.' });
        }

        const newVet = new Vet({ name, surname, phoneNumber });
        const vetSaved = await newVet.save();

        return res.send({ message: 'Vet added successfully', vetSaved });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding vet', err });
    }
};

export const editVet = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, phoneNumber } = req.body;

        const vetExist = await Vet.findById(id);
        if (!vetExist) return res.status(404).send({ message: 'Vet not found or does not exist' });

        if (phoneNumber !== undefined) {
            if (!validatePhoneNumber(phoneNumber)) {
                return res.status(400).send({ message: 'Phone number must be exactly 8 digits.' });
            }
            vetExist.phoneNumber = phoneNumber;
        }
        
        if (name !== undefined) vetExist.name = name;
        if (surname !== undefined) vetExist.surname = surname;

        const updatedVet = await vetExist.save();

        return res.send({ message: 'Vet updated successfully', updatedVet });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating vet', err });
    }
};

export const deleteVet = async (req, res) => {
    try {
        const { id } = req.params;

        const vetExist = await Vet.findById(id);
        if (!vetExist) return res.status(404).send({ message: 'Vet not found or does not exist' });

        await Vet.findByIdAndDelete(id);

        return res.send({ message: 'Vet deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting vet', err });
    }
};

export const getAllVets = async (req, res) => {
    try {
        const vets = await Vet.find();

        if (!vets) return res.status(404).send({ message: 'No vets found' });

        return res.send({ message: 'Vets found:', vets });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting vets', err });
    }
};

export const getVetById = async (req, res) => {
    try {
        const { id } = req.params;

        const vet = await Vet.findById(id);
        if (!vet) return res.status(404).send({ message: 'Vet not found or does not exist' });

        return res.send({ message: 'Vet found:', vet });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting vet', err });
    }
};
