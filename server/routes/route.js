const express = require('express')
const router = express.Router();
const cntuser = require('../controller/controller')
const middle = require('../authentication/index')



router.post('/register', cntuser.register);
router.post('/login', cntuser.login);
router.post('/forgotPassword', cntuser.forgotPassword);
router.post('/resetPassword/:token', middle.checkToken, cntuser.resetPassword);




module.exports = router;