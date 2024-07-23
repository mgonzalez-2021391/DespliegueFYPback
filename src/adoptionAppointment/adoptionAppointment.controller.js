'use strict'

import AdoptionAppointment from './adoptionAppointment.model.js'
import User from '../user/user.model.js'
import Veterinary from '../veterinary/veterinary.model.js'

export const createAdoptionAppointment = async (req, res) => {
    try {
        let { veterinaryId, date, time, notes } = req.body;
        const userId = req.user.id;

        // Verify if the veterinary exists
        const veterinaryExists = await Veterinary.findById(veterinaryId);
        if (!veterinaryExists) {
            return res.status(404).send({ message: 'Veterinary not found' });
        }

        let newAppointment = new AdoptionAppointment({
            veterinaryId,
            user: userId,
            date,
            time,
            notes
        });
        await newAppointment.save();
        return res.send({ message: 'Cita de adopción registrada exitosamente', newAppointment });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error registrando la cita de adopción', err });
    }
}

export const updateAdoptionAppointment = async (req, res) => {
    try {
        let { id } = req.params;
        let { veterinaryId, date, time, notes } = req.body;

        // Verify if the veterinary exists
        const veterinaryExists = await Veterinary.findById(veterinaryId);
        if (!veterinaryExists) {
            return res.status(404).send({ message: 'Veterinary not found' });
        }

        let updatedAppointment = await AdoptionAppointment.findOneAndUpdate(
            { _id: id },
            { veterinaryId, date, time, notes },
            { new: true }
        );

        if (!updatedAppointment) return res.status(404).send({ message: 'Cita de adopción no encontrada' });
        return res.send({ message: 'Cita de adopción actualizada exitosamente', updatedAppointment });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error actualizando la cita de adopción', err });
    }
}

export const getAdoptionAppointmentById = async (req, res) => {
    try {
        let { id } = req.params;
        let appointment = await AdoptionAppointment.findById(id)
            .populate('user')
            .populate('veterinaryId');

        if (!appointment) return res.status(404).send({ message: 'Cita de adopción no encontrada' });
        return res.send(appointment);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error obteniendo la cita de adopción', err });
    }
}

export const deleteAdoptionAppointment = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedAppointment = await AdoptionAppointment.findOneAndDelete({ _id: id });

        if (!deletedAppointment) return res.status(404).send({ message: 'Cita de adopción no encontrada' });
        return res.send({ message: 'Cita de adopción eliminada exitosamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error eliminando la cita de adopción', err });
    }
}
