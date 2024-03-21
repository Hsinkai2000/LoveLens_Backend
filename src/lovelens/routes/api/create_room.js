var express = require("express");
var router = express.Router();
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  verifyIdToken,
} = require("firebase/auth");
var { verifyID } = require("../../controller/fbAuth.js");
const fbAuth = require("../../controller/fbAuth.js");
const auth = getAuth();

router.post("/", fbAuth, function (req, res, next) {
  console.log("LALALALALALA in create room" + req.user);
  var { roomName } = req.body;
  var { accessToken } = req.header;

  if (req.user) {
    res.status(200).json({ token: req.user });
  }
});

module.exports = router;
