import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

const serviceAccount = require('../../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

fireorm.initialize(admin.firestore());
