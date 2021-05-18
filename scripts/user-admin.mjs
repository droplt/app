#!/usr/bin/env zx
import admin from 'firebase-admin';
import { chalk, question } from 'zx';

void (async function () {
  const serviceAccount = require('../firebase.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });

  let uid = await question(chalk`🚀 Enter user {bold uid}: `);
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log(chalk`Done ✅`);
})();
