'use strict';
const User = require('../../models/User');
const { decrypt } = require('../../services/crypto');
const jwt = require('jsonwebtoken');
const { encrypt } = require('../../services/crypto');

const userResolver = {
    Query: {
        login: (async (root, { filters = {} }, context) => {
            const response = {
                _id: '',
                completeName: '',
                email: '',
                errors: {
                    code: 404,
                    message: 'User not found'
                }
            };
            const query = {};

            if (filters.email) {
                query.email = filters.email;
            }

            const user = await User
                .findOne(query)
                .catch(err => console.error(err));

            if (!user) {
                return response
            }

            if (decrypt(user.hashed_pwd) !== filters.password) {
                return response
            }

            const userResponse = {
                token: jwt.sign(
                    {
                        data: {
                            userId: user._id
                        }
                    },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '1y' }
                )
            };

            return {...userResponse, completeName: user.completeName, email: user.email, _id: user._id};

        })
    },
    Mutation: {
        addUser: (async (root, { input }, context) => {
            input.hashed_pwd = encrypt(input.password);

            const user = await User.create(input);
            return user.toObject();
        })
    }
};

module.exports = userResolver;