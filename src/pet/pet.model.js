'use strict'

import { Schema, model } from "mongoose"

const petSchema = Schema({
    namePet: {
        type: String,
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
    image: {
        type: String,
        required:true
    }
}, {
    versionKey: false
})

export default model('Pet', petSchema)