const express = require('express')
const router = express.Router();
const cntuser = require('../controller/controller')
const labelcontroller = require('../controller/labelcontroller')
const notecontroller = require('../controller/notecontroller')
const middle = require('../authentication/index')



router.post('/register', cntuser.register);
router.post('/verifyemail/:token', middle.checkToken, cntuser.verifyEmail)
router.post('/login', cntuser.login);
router.post('/forgotPassword', cntuser.forgotPassword);
router.post('/resetPassword/:token', middle.checkToken, cntuser.resetPassword);



// Create a new label
router.post('/create', middle.checkToken, labelcontroller.create);

// Retrieve all label
router.get('/findAll', labelcontroller.findAll);

// // Update a label with labelId
router.put('/update', labelcontroller.update);

// Delete a label with labelId
router.delete('/delete', labelcontroller.delete);

router.post('/createNote', middle.checkToken, notecontroller.createNote)
router.put('/updateNote', notecontroller.updateNote)


module.exports = router;