const { firebase, admin } = require('../config/fbConfig');
module.exports = (req, res, next) => {

  console.log("LALALALALALA in fbAuth");
  const token = req.header('Authorization').replace('Bearer', '').trim();
  admin.auth().verifyIdToken(token)
    .then(function (decodedToken) {
        req.user = decodedToken.uid
        return next();
    }).catch(function (error) {
      res.status(500).send(error);
    });
};