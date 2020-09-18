'use strict';
const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        _id: ID!
        completeName: String!
        email: String!
        password: String!
        token: String
        errors: Error
    }
    
    input loginFilters {
        email: String!
        password: String!
    }
    
    extend type Query {
        users: [User]
        login(filters: loginFilters): User
    }
    
    input UserInput {
        email: String!
        completeName: String!
        password: String!
    }
    
    extend type Mutation {
        addUser(input: UserInput): User
    }
`;

module.exports = typeDefs;