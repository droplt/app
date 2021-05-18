import * as admin from 'firebase-admin';

const serviceAccount = require('../../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

export default admin;
