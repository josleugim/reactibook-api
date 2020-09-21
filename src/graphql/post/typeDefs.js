'use strict';
const { gql } = require('apollo-server');

const typeDefs = gql`
    type Post {
        _id: ID!
        userId: User
        text: String
        readAccess: ReadAccess
        createdAt: String
        updatedAt: String
    }
    
    enum ReadAccess {
        friends
        public
    }
    
    input PostFilters {
        readAccess: String
    }
    
    extend type Query {
        posts(filters: PostFilters): [Post]
        post(id: ID!): Post
    }
    
    input PostInput {
        text: String!
        readAccess: String!
    }
    
    extend type Mutation {
        addPost(input: PostInput): Post
        deletePost(id: ID!): Boolean
    }
`;

module.exports = typeDefs;