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
const errorTypeDefs = require('../graphql/common/error/typeDefs');

const schema = makeExecutableSchema({
    typeDefs: [rootTypeDefs, userTypeDefs, errorTypeDefs],
    resolvers: merge(userResolvers)
});

module.exports = {
    schema
};