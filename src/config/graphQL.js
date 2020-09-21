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
const postTypeDefs = require('../graphql/post/typeDefs');
const postResolvers = require('../graphql/post/resolvers');

const schema = makeExecutableSchema({
    typeDefs: [rootTypeDefs, userTypeDefs, errorTypeDefs, postTypeDefs],
    resolvers: merge(userResolvers, postResolvers)
});

module.exports = {
    schema
};