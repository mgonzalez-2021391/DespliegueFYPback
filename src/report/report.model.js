'use strict'

import { Schema, model } from "mongoose"

const reportSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,   
        required: true
    },
    namePet: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

export default model('Report', reportSchema)