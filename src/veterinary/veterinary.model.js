'use strict'

import { Schema, model } from "mongoose"

const veterinarySchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    vet: {
        type: Schema.Types.ObjectId,
        ref: 'Vet',
        required: true
    },
    veterinaryAppointment: [{
        type: Schema.Types.ObjectId,
        ref: 'VeterinaryAppointment',
    }],
    adoptionAppointment: [{
        type: Schema.Types.ObjectId,
        ref: 'AdoptionAppointment',
    }]
}, {
    versionKey: false
})

export default model('Veterinary', veterinarySchema)