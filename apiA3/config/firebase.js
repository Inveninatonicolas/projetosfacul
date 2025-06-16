const admin = require('firebase-admin');
const serviceAccount = require('../firebase-service-account.json'); // Aqui vai o JSON que você baixa do Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
