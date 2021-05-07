import 'dotenv/config';
import 'reflect-metadata';
import './plugins/firebase';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import expressStatic from 'express-static-gzip';
import path from 'path';
import * as TypeGraphQL from 'type-graphql';

import { UserResolver } from './graphql';

(async () => {
  const app = express();

  /**
   * ApolloServer configuration
   */
  const server = new ApolloServer({
    schema: await TypeGraphQL.buildSchema({
      resolvers: [UserResolver],
    }),
  });

  /**
   * Additional middleware can be mounted here before starting ApolloServer
   */

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
    expressStatic(path.join(__dirname, '..', process.env.BUILD_PATH), {
      enableBrotli: true,
      orderPreference: ['br'],
    })
  );

  /**
   * API routes
   */
  app.get('/api', async (req, res) => {
    res.send('Coucou');
  });

  /**
   * Handle client side routing
   */
  app.get('/*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '..', process.env.BUILD_PATH, 'index.html')
    );
  });

  /**
   * Start Express server
   */
  app.listen(4000, () => {
    console.log(`🎨 front -> http://localhost:4000/`);
    console.log(`🚀 api -> http://localhost:4000/api`);
    console.log(`🔥 graphql -> http://localhost:4000/graphql`);
  });
})();
