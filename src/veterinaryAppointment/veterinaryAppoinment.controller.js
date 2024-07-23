'use strict'

import VeterinaryAppointment from './veterinaryAppoinment.model.js'
import Vet from '../vet/vet.model.js'

export const test = (req, res) => {
    console.log('test is running');
    return res.send({ msg: 'Test is running' });
}

export const createAppointment = async (req, res) => {
    try {
        const { vetId, date, race, gender, age, description } = req.body;
        const userId = req.user.id;  // Assuming req.user is populated with the authenticated user's data

        // Verify if the vet exists
        const vetExists = await Vet.findById(vetId);
        if (!vetExists) {
            return res.status(404).send({ message: 'Vet not found' });
        }

        const veterinaryAppointment = new VeterinaryAppointment({
            user: userId,
            date,
            race,
            gender,
            age,
            description,
            vetId
        });
        await veterinaryAppointment.save();
        return res.status(201).send({ message: 'Veterinary appointment created successfully', veterinaryAppointment });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating veterinary appointment', err });
    }
}

export const getVeterinaryAppointments = async (req, res) => {
    const { id } = req.user;
    try {
        const appointments = await VeterinaryAppointment.find({ user: id }).populate('vetId', ['name']).populate('user', ['username']);
        return res.send(appointments);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting veterinary appointments' });
    }
}

export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { vetId, date, race, gender, age, description } = req.body;
        const userId = req.user.id;

        // Verify if the vet exists
        const vetExists = await Vet.findById(vetId);
        if (!vetExists) {
            return res.status(404).send({ message: 'Vet not found' });
        }

        // Find the veterinary appointment and verify if it belongs to the user
        const appointment = await VeterinaryAppointment.findOne({ _id: id, user: userId });
        if (!appointment) {
            return res.status(404).send({ message: 'Veterinary appointment not found or you are not authorized to edit this appointment' });
        }

        // Update the veterinary appointment
        appointment.vetId = vetId;
        appointment.date = date;
        appointment.race = race;
        appointment.gender = gender;
        appointment.age = age;
        appointment.description = description;

        await appointment.save();
        return res.send({ message: 'Veterinary appointment updated successfully', appointment });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating veterinary appointment' });
    }
}

export const getAppointmentById = async (req, res) => {
    try {
        let { id } = req.params
        let appointment = await VeterinaryAppointment.findById(id)
            .populate('user')
            .populate('vetId', ['name'])

        if (!appointment) return res.status(404).send({ message: 'Cita no encontrada' })
        return res.send(appointment)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error obteniendo la cita', err })
    }
}

export const deleteVeterinaryAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const appointment = await VeterinaryAppointment.findOne({ _id: id, user: userId });
        if (!appointment) {
            return res.status(404).send({ message: 'Veterinary appointment not found or you are not authorized to delete this appointment' });
        }

        const deletedAppointment = await VeterinaryAppointment.deleteOne({ _id: id });
        if (deletedAppointment.deletedCount === 0) return res.status(404).send({ message: 'Veterinary appointment not found and not deleted' });
        return res.send({ message: 'Veterinary appointment deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting veterinary appointment' });
    }
};
