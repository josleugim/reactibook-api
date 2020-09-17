'use strict';

require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');

require('./src/config/mongoose');
const app = express();

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

require('./src/config/express')(app);
const { schema } = require('./src/config/graphQL');

const server = new ApolloServer({
    schema,
    formatError: (err) => err
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at ${process.env.HOST}:${process.env.PORT}${server.graphqlPath}`);
});