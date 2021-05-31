import 'dotenv-flow/config';
import 'reflect-metadata';
import './services/fireorm';
import './services/transmission';

import { ApolloServer } from 'apollo-server-express';
import express, { json } from 'express';
import { ToadScheduler } from 'toad-scheduler';
import * as TypeGraphQL from 'type-graphql';

import { TorrentResolver, UserResolver } from './graphql';
import { transmissionSync } from './jobs';
import { authentication, authorization } from './middlewares';
import { Context } from './types';

const { SERVER_PORT = 1338 } = process.env;

(async () => {
  /**
   * Job scheduler
   */
  const scheduler = new ToadScheduler();
  scheduler.addSimpleIntervalJob(transmissionSync);

  /**
   * ApolloServer configuration
   */
  const server = new ApolloServer({
    schema: await TypeGraphQL.buildSchema({
      resolvers: [UserResolver, TorrentResolver],
      emitSchemaFile: true,
      authChecker: authorization,
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
  app.use(authentication());

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
