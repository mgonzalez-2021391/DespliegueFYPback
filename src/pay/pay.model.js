'use strict'

import { Schema, model } from 'mongoose'
import User from '../user/user.model.js'

const paySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    creditCard: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    securityCode: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

export default model('Pay', paySchema)