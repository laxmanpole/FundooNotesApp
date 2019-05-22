const express = require('express')
const router = express.Router();
const cntuser = require('../controller/controller')
const labelcontroller = require('../controller/labelcontroller')
const notecontroller = require('../controller/notecontroller')
const profile = require('../controller/profilecontroller')
const colab = require('../controller/colabcontroller')
const middle = require('../authentication/index')
const upload = require('../services/fileupload')



router.post('/register', cntuser.register);
router.post('/verifyemail/:token', middle.checkToken, cntuser.verifyEmail)
router.post('/login', cntuser.login);
router.post('/forgotPassword', cntuser.forgotPassword);
router.post('/resetPassword/:token', middle.checkToken, cntuser.resetPassword);



// Create a new label
router.post('/create', middle.checkToken, labelcontroller.createLabel);

// Retrieve all label
router.get('/findAll', labelcontroller.findAllLabel);

// // Update a label with labelId
router.put('/update', labelcontroller.updateLabel);

// Delete a label with labelId
router.delete('/delete', labelcontroller.deleteLabel);
//create a notes
router.post('/createNote', middle.checkToken, notecontroller.createNote)
router.get('/findAllNote', middle.checkToken, notecontroller.findAllNote);
router.put('/addlabeltoNote', notecontroller.addlabeltoNote)
router.put('/romvelabelfromNote', notecontroller.removelabelfromNote)
router.put('/updateNote', notecontroller.updateNote)
router.delete('/deleteNote', notecontroller.deleteNote)

router.post('/setprofile', upload.single('image'), middle.checkToken, profile.setprofile)
router.post('/setreminder', notecontroller.reminder)
router.post('/deletereminder', notecontroller.deletereminder)
router.post('/Archive', notecontroller.isArchive)
router.post('/Trash', notecontroller.isTrash)

router.post('/noteColabarate', middle.checkToken, colab.notecollab)







module.exports = router;