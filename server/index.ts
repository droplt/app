import 'dotenv-flow/config';
import 'reflect-metadata';
import './plugins/firebase';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import gzip from 'express-static-gzip';
import * as admin from 'firebase-admin';
import path from 'path';
import * as TypeGraphQL from 'type-graphql';

import { UserResolver } from './graphql';
import { firebaseAuthChecker } from './middlewares/auth';

(async () => {
  const app = express();

  /**
   * ApolloServer configuration
   */
  const server = new ApolloServer({
    schema: await TypeGraphQL.buildSchema({
      resolvers: [UserResolver],
      authChecker: firebaseAuthChecker,
    }),
    context: async ({ req }) => {
      const context = {
        req,
        user: req.user,
      };
      return context;
    },
  });

  /**
   * Additional middleware can be mounted here before starting ApolloServer
   */
  app.use('/graphql', async (req, res, next) => {
    const token = (req.headers?.authorization || '').replace('Bearer ', '');
    const decoded = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decoded.uid);
    req.user = user;
    next();
  });

  /**
   * Connect ApolloServer to Express
   */
  server.applyMiddleware({ app, path: '/graphql' });

  /**
   * API routes
   */
  // app.post('/api/me', async (req, res) => {
  //   try {
  //     const token = req.body.token;
  //     const decoded = await admin.auth().verifyIdToken(token);
  //     res.json({});
  //   } catch (error) {

  //   }
  //   console.log(decoded);
  // });

  /**
   * Serve static files
   * - serve compiled React App files
   * - handles pre-compressed files (brotli, gzip)
   */
  app.use(
    gzip(path.join(__dirname, '..', process.env.BUILD_PATH), {
      enableBrotli: true,
      orderPreference: ['br'],
    })
  );

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
