
const {check, validationResult} = require('express-validator');
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const express = require('express');
const router = express.Router();
const auth = getAuth();

router.post('/',[
        check("email", "Email is not in the correct format").isEmail(),
        check("password", "Password must be more than 5 characters").isLength({min:5})
    ], async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
    
        const {email, password} = req.body;
        
        try{
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
              var idToken = user.getIdToken();

            

              return res.status(200).json({"User": user, "idToken": idToken});
            })
            .catch((error) => {
              const errorMessage = error.message;
              return res.status(400).json({"errors": errorMessage});
            });
        } catch(error){
            res.status(500).send(error);
        }
    })

module.exports = router;
