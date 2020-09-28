'use strict';

const mongoose = require('mongoose');
const moment = require('moment-timezone');
const { formatDate } = require('../helpers/common');

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    imageId: {
        type: String
    },
    readAccess: {
        type: String,
        enum: ['friends', 'public'],
        required: true
    },
    createdAt: { type: Date, default: formatDate(moment().tz('America/Mexico_City').format()) },
    updatedAt: { type: Date },
});

PostSchema.virtual('fullFile').get(function() {
    return `https://storage.googleapis.com/${process.env.BUCKET}/posts/${this.imageId}`;
});

module.exports = mongoose.model('Post', PostSchema);