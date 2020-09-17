'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    completeName: {
        type: String,
        required: 'The complete name is required'
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashed_pwd: {
        iv: { type: String },
        encryptedPwd: { type: String }
    }
});

module.exports = mongoose.model('User', UserSchema);
