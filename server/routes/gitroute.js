 const express = require('express')
 const router = express.Router();
 const passport = require('passport')
 const GithubStrategy = require('passport-github')

 const usermodel = require('../model/usermodel')
 const gitcontroller = require('../controller/gitcontroller')
     // const middle = require('../authentication/index')
     // const axios = require('axios')
     // var gentoken = require('../middleware/token');
     // var sendmail = require('../middleware/sendmail');



 // // Declare the redirect route
 // router.get('/auth/github', (req, response) => {
 //     // The req.query object has the query params that
 //     // were sent to this route. We want the `code` param

 //     const code = req.query.code
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
 //                 console.log("tokkkkken", accessToken);
 //                 response.send(res.data)

 //                 var payload = { gitUsername: res.data.login, gitID: res.data.id, email: res.data.email, access_token: accessToken }
 //                 const obj = gentoken.GenerateToken(payload);
 //                 const url = `http://localhost:3000/gitverify/${obj.token}`;
 //                 console.log("url in controller", url);

 //                 sendmail.sendEMailFunction(url, res.data.email);

 //                 console.log("token generated=====>", obj.token)



 //             })
 //             .catch(error => {
 //                 console.log(error.response)
 //             });
 //     }

 // })
 // router.post('/gitverify/:token', middle.checkToken, gitcontroller.gitverify)


 passport.use(new GithubStrategy({
         clientID: process.env.client_id,
         clientSecret: process.env.client_secret,
         callbackURL: process.env.redirect_uri
     },
     function(accessToken, refreshToken, profile, done) {
         console.log("profile", profile);

         var req = { accessToken, profile }
         console.log("req : ", req);

         usermodel.gitverify(req, (err, data) => {
             if (err) {
                 console.log(err)
             } else {
                 console.log("data=====>", data);
             }
         })
         done(JSON.stringify(profile));
     }));

 router.route('/').get(passport.authenticate('github', { scope: ['user:email'] }));
 router.route('/auth/github').get(passport.authenticate('github'), function(req, res) {
     //console.log("response : ", req);
     //res.send("success", req.user);


 });


 module.exports = router;