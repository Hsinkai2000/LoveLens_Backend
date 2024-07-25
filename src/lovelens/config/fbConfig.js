const auth = require('firebase/auth');

const firebase = require('firebase/app');
var admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
const firebaseConfig = {
    apiKey: 'AIzaSyAwWVxIZwlqyLVRN9hZi1Lv6AqiyFrHTtw',
    authDomain: 'lovelens-535bc.firebaseapp.com',
    databaseURL:
        'https://lovelens-535bc-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'lovelens-535bc',
    storageBucket: 'lovelens-535bc.appspot.com',
    messagingSenderId: '656169376737',
    appId: '1:656169376737:web:efa1d46b9ad3e77b3c10a0',
    measurementId: 'G-ZSHVYCEXL1'
};
firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        'https://lovelens-535bc-default-rtdb.asia-southeast1.firebasedatabase.app'
});

module.exports = { firebase, admin };
