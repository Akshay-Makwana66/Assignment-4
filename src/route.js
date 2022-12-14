const express = require('express');
const router = express.Router();
const {registrationOfUser,loginUser,getUserInfo,userCanUploadDocuments,deleteUser} = require('./controller/controller')
const {userAuthentication} = require('./middleware/authentication')

router.post('/registrationOfUser', registrationOfUser);
router.post('/loginUser',loginUser);
router.get('/getInfoOfUser',getUserInfo);
router.put('/uploadDocument/:userId',userAuthentication,userCanUploadDocuments);
router.delete('/deleteUser/:userId',userAuthentication,deleteUser);


module.exports = router;                   