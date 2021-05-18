import 'dotenv-flow/config';
import 'reflect-metadata';
import './services/fireorm';

import { ApolloServer } from 'apollo-server-express';
import cookies from 'cookie-parser';
import express, { json } from 'express';
import bearer from 'express-bearer-token';
import * as TypeGraphQL from 'type-graphql';

import { UserResolver } from './graphql';
import { auth, isAuthorized, session } from './middlewares/auth';
import { Context } from './types';

const { SERVER_PORT = 1338 } = process.env;

(async () => {
  /**
   * ApolloServer configuration
   */
  const server = new ApolloServer({
    schema: await TypeGraphQL.buildSchema({
      resolvers: [UserResolver],
      authChecker: isAuthorized,
    }),
    context: async ({ req }): Promise<Context> => ({
      req,
      user: req.user,
    }),
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
  });

  /**
   * Express app configuration
   */
  const app = express();
  app.use(json());
  app.use(cookies());
  app.use(bearer());
  app.use(auth());
  app.post('/api/session', session());

  /**
   * Connect ApolloServer to Express
   */
  server.applyMiddleware({ app, path: '/graphql' });

  /**
   * Start Express server
   */
  app.listen(SERVER_PORT, () => {
    console.log(`🎨 front -> http://localhost:${SERVER_PORT}/`);
    console.log(`🚀 api -> http://localhost:${SERVER_PORT}/api`);
    console.log(`🔥 graphql -> http://localhost:${SERVER_PORT}/graphql`);
  });
})();
