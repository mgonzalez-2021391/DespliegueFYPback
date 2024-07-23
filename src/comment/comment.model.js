
'use strict'

import { Schema, model } from "mongoose"

const commentSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    }
}, {
    versionKey: false
})

export default model('Comment', commentSchema)
