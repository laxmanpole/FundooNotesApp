const express = require('express')
const router = express.Router();
const cntuser = require('../controller/controller')
const labelcontroller = require('../controller/labelcontroller')
const notecontroller = require('../controller/notecontroller')
const profile = require('../controller/profilecontroller')
const middle = require('../authentication/index')
const upload = require('../services/fileupload')
    // const axios = require('axios')

// var sendmail = require('../middleware/sendmail');
// const jwt = require('jsonwebtoken')





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
router.put('/addlabeltoNote', notecontroller.addlabeltoNote)
router.put('/romvelabelfromNote', notecontroller.removelabelfromNote)
router.put('/updateNote', notecontroller.updateNote)
router.delete('/deleteNote', notecontroller.deleteNote)

router.post('/setprofile', upload.single('image'), middle.checkToken, profile.setprofile)
router.post('/setreminder', notecontroller.reminder)



// Declare the redirect route
// router.get('/auth/github', (req, response) => {
//     // The req.query object has the query params that
//     // were sent to this route. We want the `code` param

//     const code = req.query.code;
//     console.log("req", code);

//     axios({
//             // make a POST request
//             method: 'post',
//             // to the Github authentication API, with the client ID, client secret
//             // and request token
//             url: `https://github.com/login/oauth/access_token?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${code}`,
//             // Set the content type header, so that we get the response in JSOn
//             headers: {
//                 accept: 'application/json'
//             }
//         }).then((res) => {
//             // Once we get the response, extract the access token from
//             // the response body
//             const accessToken = res.data.access_token
//             console.log("token=====>", accessToken)
//             console.log("token aa raha ha : = >>>>> ")
//                 // redirect the user to the welcome page, along with the access token
//                 //res.redirect(`/welcome.html?access_token=${accessToken}`)
//             gettoken(accessToken)
//         })
//         .catch(error => {
//             console.log(error.response)
//         });

//     function gettoken(accessToken) {

//         console.log("token in function aa chuka hai get main : =>>>", accessToken)
//         axios({
//                 // make a POST request
//                 method: 'get',
//                 // to the Github authentication API, with the client ID, client secret
//                 // and request token
//                 url: `https://api.github.com/user?access_token=${accessToken}`,
//                 // Set the content type header, so that we get the response in JSOn
//                 headers: {
//                     accept: 'application/json'
//                 }

//             }).then((res) => {
//                 // Once we get the response, extract the access token from
//                 // the response body
//                 console.log("n")
//                 console.log(res.data);
//                 response.send(res.data)


//                 const token = jwt.sign({ gitUsername: res.data.login, gitID: res.data.id, email: res.data.email, access_token: accessToken }, 'secretkey', { expiresIn: 86400000 })
//                 const url = `http://localhost:3000/gitverify/${token}`;
//                 console.log("url in controller", url);

//                 sendmail.sendEMailFunction(url, res.data.email);





//             })
//             .catch(error => {
//                 console.log(error.response)
//             });
//     }
// })
// router.post('/gitverify/:token', middle.checkToken, gitcontroller.gitverify)




module.exports = router;