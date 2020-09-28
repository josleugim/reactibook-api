'use strict';

require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const { tradeTokenForUser } = require('./src/services/auth');

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
    context: async ({ req }) => {
        let authToken = null;
        let currentUser = null;

        try {
            if (req.headers.authorization) { authToken = req.headers.authorization }
            if (authToken) {
                currentUser = await tradeTokenForUser(authToken.toString())
            }
        } catch (e) {
            console.log(`No Auth. Error: ${e}`)
        }

        return {
            authToken,
            currentUser
        }
    },
    formatError: (err) => err
});

server.applyMiddleware({ app, path: '/graphql' });

require('./src/routes/uploads')(app);

app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at ${process.env.HOST}:${process.env.PORT}${server.graphqlPath}`);
});