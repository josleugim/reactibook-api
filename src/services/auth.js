'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const tradeTokenForUser = token => {
    if (token) {
        return jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) { console.log({ err: err }, 'Error at tradeTokenForUser') }
            if (decoded.data.userId) {
                return User
                    .findById(decoded.data.userId)
                    .then(currentUser => currentUser)
                    .catch(err => console.log(err))
            }
        })
    }
};

const authenticated = next => (root, args, context, info) => {
    if (!context.currentUser) {
        throw new Error('Unauthenticated');
    }

    return next(root, args, context, info);
};

module.exports = {
    tradeTokenForUser,
    authenticated
};