const { check, validationResult } = require('express-validator');
const {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} = require('firebase/auth');
const express = require('express');
const router = express.Router();
const auth = getAuth();

router.post(
    '/',
    [
        check('email', 'Email is not in the correct format').isEmail(),
        check('password', 'Password must be more than 5 characters').isLength({
            min: 5
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;

                    return res
                        .status(200)
                        .json({ Status: 'signup', User: user });
                })
                .catch((error) => {
                    if (error.code == 'auth/email-already-in-use') {
                        try {
                            signInWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    const user = userCredential.user;

                                    return res
                                        .status(200)
                                        .json({ Status: 'signin', User: user });
                                })
                                .catch((error) => {
                                    const errorMessage = error.message;
                                    return res
                                        .status(400)
                                        .json({ errors: errorMessage });
                                });
                        } catch (error) {
                            return res.status(500).send(error.code);
                        }
                    }
                });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
);

module.exports = router;
