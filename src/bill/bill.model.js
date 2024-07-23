'use strict'

import { Schema, model } from "mongoose"

const billSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    pay: {
        type: Schema.Types.ObjectId,
        ref: 'Pay',
        required: true
    }
}, {
    versionKey: false
})

export default model('Bill', billSchema)