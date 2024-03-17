const express = require('express');
const router = express.Router();
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

router.post('/',(req, rsp)=>{
    const email = req.body.email;
    const password = req.body.password;
    let token = '';        
    const auth = getAuth();
    auth.signInWithEmailAndPassword(email,password).then((user)=>{
//The promise sends me a user object, now I get the token, and refresh it by sending true (obviously another promise)            
user.getIdToken(true).then((token)=>{
                rsp.writeHead(200, {"Content-Type": "application/json"});
                rsp.end(JSON.stringify({token:token}));
            }).catch((err)=>{
                rsp.writeHead(500, {"Content-Type": "application/json"});
                rsp.end(JSON.stringify({error:err}));
            });
        }).catch((err)=>{
            rsp.writeHead(500, {"Content-Type": "application/json"});
            rsp.end(JSON.stringify({error:err}));
        });
    
});


module.exports = router;