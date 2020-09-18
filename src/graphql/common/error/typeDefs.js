'use strict';
const { gql } = require('apollo-server');

const typeDefs = gql`
    type Error {
        code: Int
        message: String
    }
`;

module.exports = typeDefs;