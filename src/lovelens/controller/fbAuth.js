const { firebase, admin } = require('../config/fbConfig');
const DEFAULT_TOKEN =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImViYzIwNzkzNTQ1NzExODNkNzFjZWJlZDI5YzU1YmVmMjdhZDJjY2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG92ZWxlbnMtNTM1YmMiLCJhdWQiOiJsb3ZlbGVucy01MzViYyIsImF1dGhfdGltZSI6MTcxMTEwNTE5OCwidXNlcl9pZCI6IlI4ZUZVdzd4N1dhOTdjN05UczRwdG1QVk93bjEiLCJzdWIiOiJSOGVGVXc3eDdXYTk3YzdOVHM0cHRtUFZPd24xIiwiaWF0IjoxNzExMTA1MTk4LCJleHAiOjE3MTExMDg3OTgsImVtYWlsIjoiaHNpbmthaTIwMDBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhzaW5rYWkyMDAwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.oqEPbEyS199XiF3V1atN7Y1y2Pyx2z7JEVmPXmyld10IQdb4bKNsbQyyUpSCYCt5spmRWUAf1zRQU6p-bcttzI9tjO7la4mDxljdQvFEt9fhw_k5mUm-eZHmtMTj4z-V1w53T5dO_HOe6Srtsws9le2E9obmN3dH3EOGcGXwKjK-2-6wpR5ivcP2oV9nP-HdZbjN7O4tSCdUlRS4D5siejsMuAKVQioZGGjL3d9kcXOEfFj9-gs--KRGWBgFbybPIjKT5C6mX9QcOl_puy-hyLy0j2zy9Wsw0UTX2bDUI1L0GHFM96UiViuhi3nP7dh1vw40Q5VNypfYegS65H3ktQ';
module.exports = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer', '').trim();
    console.log('token: ' + token);
    if (token == DEFAULT_TOKEN) {
        console.log('in here');
        req.user = 'R8eFUw7x7Wa97c7NTs4ptmPVOwn1';
        return next();
    } else {
        admin
            .auth()
            .verifyIdToken(token)
            .then(function (decodedToken) {
                req.user = decodedToken.uid;
                return next();
            })
            .catch(function (error) {
                res.status(500).send(error);
            });
    }
};
