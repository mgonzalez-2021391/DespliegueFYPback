import Veterinary from './veterinary.model.js';

export const addVeterinary = async (req, res) => {
    try {
        const { user, name, location, schedule, description, pet, vet, veterinaryAppointment, adoptionAppointment } = req.body;

        const newVeterinary = new Veterinary({ user, name, location, schedule, description, pet, vet, veterinaryAppointment, adoptionAppointment });
        const veterinarySaved = await newVeterinary.save();

        return res.send({ message: 'Veterinary added successfully', veterinarySaved });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding veterinary', err });
    }
};

export const editVeterinary = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, name, location, schedule, description, pet, vet, veterinaryAppointment, adoptionAppointment } = req.body;

        console.log('Updating veterinary with ID:', id);
        console.log('Request body:', req.body);

        const veterinaryExist = await Veterinary.findById(id);
        if (!veterinaryExist) {
            console.log('Veterinary not found');
            return res.status(404).send({ message: 'Veterinary not found or does not exist' });
        }

        if (user !== undefined) veterinaryExist.user = user;
        if (name !== undefined) veterinaryExist.name = name;
        if (location !== undefined) veterinaryExist.location = location;
        if (schedule !== undefined) veterinaryExist.schedule = schedule;
        if (description !== undefined) veterinaryExist.description = description;
        if (pet !== undefined) veterinaryExist.pet = pet;
        if (vet !== undefined) veterinaryExist.vet = vet;
        if (veterinaryAppointment !== undefined) veterinaryExist.veterinaryAppointment = veterinaryAppointment;
        if (adoptionAppointment !== undefined) veterinaryExist.adoptionAppointment = adoptionAppointment;

        const updatedVeterinary = await veterinaryExist.save();

        return res.send({ message: 'Veterinary updated successfully', updatedVeterinary });
    } catch (err) {
        console.error('Error updating veterinary:', err);
        return res.status(500).send({ message: 'Error updating veterinary', err });
    }
};

export const deleteVeterinary = async (req, res) => {
    try {
        const { id } = req.params;

        const veterinaryExist = await Veterinary.findById(id);
        if (!veterinaryExist) return res.status(404).send({ message: 'Veterinary not found or does not exist' });

        await Veterinary.findByIdAndDelete(id);

        return res.send({ message: 'Veterinary deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting veterinary', err });
    }
};

export const getAllVeterinaries = async (req, res) => {
    try {
        const veterinaries = await Veterinary.find()
            .populate('user', 'name surname')
            .populate('pet', 'namePet')
            .populate('vet', 'name surname');

        if (!veterinaries) return res.status(404).send({ message: 'No veterinaries found' });

        return res.send({ message: 'Veterinaries found:', veterinaries });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting veterinaries', err });
    }
};

export const getVeterinaryById = async (req, res) => {
    try {
        const { id } = req.params;

        const veterinary = await Veterinary.findById(id)
            .populate('user', 'name surname')
            .populate('pet', 'namePet')
            .populate('vet', 'name surname');

        if (!veterinary) return res.status(404).send({ message: 'Veterinary not found' });

        return res.send({ message: 'Veterinary found:', veterinary });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting veterinary', err });
    }
};