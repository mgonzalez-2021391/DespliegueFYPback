'use strict'

import { Schema, model } from "mongoose"

const vetSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

export default model('Vet', vetSchema)