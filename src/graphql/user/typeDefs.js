'use strict';
const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        _id: ID!
        completeName: String!
        email: String
        password: String!
    }
    
    extend type Query {
        users: [User]
    }
`;

module.exports = typeDefs;