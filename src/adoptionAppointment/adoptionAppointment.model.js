'use strict'

import { Schema, model } from "mongoose"

const adoptionAppointmentSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    veterinaryId: {
        type: Schema.Types.ObjectId,
        ref: 'Veterinary',
        required: true
    }
}, {
    versionKey: false
})

export default model('AdoptionAppointment', adoptionAppointmentSchema)
