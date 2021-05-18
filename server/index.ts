import 'dotenv-flow/config';
import 'reflect-metadata';
import './services/fireorm';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import bearer from 'express-bearer-token';
import gzip from 'express-static-gzip';
import path from 'path';
import * as TypeGraphQL from 'type-graphql';

import { UserResolver } from './graphql';
import { authChecker, authMiddleware } from './middlewares/auth';
import { Context } from './types';

const { BUILD_PATH, SERVER_PORT = 1338 } = process.env;

(async () => {
  /**
   * ApolloServer configuration
   */
  const server = new ApolloServer({
    schema: await TypeGraphQL.buildSchema({
      resolvers: [UserResolver],
      authChecker,
    }),
    context: async ({ req }): Promise<Context> => ({
      req,
      user: req.user,
    }),
  });

  /**
   * Express app declaration
   */
  const app = express();

  /**
   * Additional middleware can be mounted here before starting ApolloServer
   */
  app.use(bearer());
  app.use('/graphql', authMiddleware);

  /**
   * Connect ApolloServer to Express
   */
  server.applyMiddleware({ app, path: '/graphql' });

  /**
   * Serve static files
   * - serve compiled React App files
   * - handles pre-compressed files (brotli, gzip)
   */
  app.use(
    gzip(path.join(__dirname, '..', BUILD_PATH), {
      enableBrotli: true,
      orderPreference: ['br'],
    })
  );

  /**
   * Handle client side routing
   */
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', BUILD_PATH, 'index.html'));
  });

  /**
   * Start Express server
   */
  app.listen(SERVER_PORT, () => {
    console.log(`🎨 front -> http://localhost:${SERVER_PORT}/`);
    console.log(`🚀 api -> http://localhost:${SERVER_PORT}/api`);
    console.log(`🔥 graphql -> http://localhost:${SERVER_PORT}/graphql`);
  });
})();
