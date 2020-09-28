'use strict';
const { gql } = require('apollo-server');

const typeDefs = gql`
    type Post {
        _id: ID!
        userId: User
        text: String
        imageId: String
        fullFile: String
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
        imageId: String
    }
    
    extend type Mutation {
        addPost(input: PostInput): Post
        deletePost(id: ID!): Boolean
        updatePost(id: ID!, input: PostInput): Post
    }
`;

module.exports = typeDefs;