'use strict';

const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');
const rootTypeDefs = `
type Query
type Mutation
schema {
  query: Query
  mutation: Mutation
}
`;

const userTypeDefs = require('../graphql/user/typeDefs');
const userResolvers = require('../graphql/user/resolvers');

const schema = makeExecutableSchema({
    typeDefs: [rootTypeDefs, userTypeDefs],
    resolvers: merge(userResolvers)
});

module.exports = {
    schema
};