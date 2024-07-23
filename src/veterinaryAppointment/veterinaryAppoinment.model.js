'use strict'

import { Schema, model } from "mongoose"

const veterinaryAppointmentSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    vetId: {
        type: Schema.Types.ObjectId,
        ref: 'Vet',
        required: true
    }
}, {
    versionKey: false
})

export default model('VeterinaryAppointment', veterinaryAppointmentSchema)