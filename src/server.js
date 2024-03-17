const express = require ("express");
const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccount.json");
const {getFirestore} = require("firebase/firestore");
const {initializeApp} = require("firebase/app");
const {getAuth} = require("firebase/auth");

const config = {
    apiKey: "AIzaSyAwWVxIZwlqyLVRN9hZi1Lv6AqiyFrHTtw",
    authDomain: "lovelens-535bc.firebaseapp.com",
    databaseURL: "https://lovelens-535bc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lovelens-535bc",
    storageBucket: "lovelens-535bc.appspot.com",
    messagingSenderId: "656169376737",
    appId: "1:656169376737:web:efa1d46b9ad3e77b3c10a0",
    measurementId: "G-ZSHVYCEXL1"
  };

const fapp = initializeApp(config);
const auth = getAuth(fapp);

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// const auth = admin.auth();

const app = express();

app.use(express.json());

app.use("/api/register", require("./routes/api/register"));

app.get('/', (req,res)=>{
    res.send("Hello");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`listening on PORT ${PORT}`);
});