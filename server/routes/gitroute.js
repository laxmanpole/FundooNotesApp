 const express = require('express')
 const router = express.Router();
 const passport = require('passport')
 const GithubStrategy = require('passport-github')
 var jwt = require('jsonwebtoken');
 const usermodel = require('../model/usermodel')
 const gitcontroller = require('../controller/gitcontroller')
 const middle = require('../authentication/index')
 const axios = require('axios')
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





 passport.use(new GithubStrategy({
         clientID: process.env.client_id,
         clientSecret: process.env.client_secret,
         callbackURL: process.env.redirect_uri,
         scope: 'repo'
     },
     function(accessToken, refreshToken, profile, done) {
         //console.log("profile", profile);

         var req = { accessToken, profile }
         usermodel.gitOauth(req, (err, data) => {
             if (err) {
                 console.log(err)
             } else {
                 console.log("data=====>", data.id);
                 var token = jwt.sign({ id: data.id }, 'secretkey', { expiresIn: 86400000 });
                 client.set("Key" + data.id, token, redis.print);
                 client.get("Key" + data.id, function(error, result) {
                     if (error) throw error;
                     console.log('Redis working properly ->', result)
                 });
                 done(JSON.stringify(token));
             }
         })


     }));

 router.route('/').get(passport.authenticate('github', { scope: 'repo' }));
 router.route('/auth/github').get(passport.authenticate('github'), function(req, res) {
     //console.log("response : ", res);

 });

 router.post('/gitverify/:token', middle.checkToken, gitcontroller.gitverify)



 router.post('/createRef', (req, response) => {
     console.log("fjhbf", req.headers.authorization)
         //var  accessToken = req.headers.token;
     axios({

         // make a POST request
         method: 'get',
         // to the Github authentication API, with the client ID, client secret
         // and request token
         url: `https://api.github.com/repos/laxmanpole/javascript/git/refs/heads`,
         // Set the content type header, so that we get the response in JSOn
         headers: {
             Authorization: req.headers.authorization,
             accept: 'application/json'
         }
     }).then((res) => {
         // Once we get the response, extract the access token from
         // the response body

         console.log("token=====>", res.data[0].object.sha, req.body.ref, req.headers.authorization);
         //response.send(res.data)
         createBranch(req.body.ref, res.data[0].object.sha, req.headers.authorization);

     })

     function createBranch(ref, sha, token) {
         console.log("asdgvasj=======>", token);
         console.log("shaaaaa ====== > ", sha);
         axios({
                 // make a POST request
                 method: 'post',
                 // to the Github authentication API, with the client ID, client secret
                 // and request token
                 url: `https://api.github.com/repos/laxmanpole/javascript/git/refs`,
                 // Set the content type header, so that we get the response in JSOn
                 headers: {
                     Authorization: token,
                     accept: 'application/json'
                 },
                 data: {
                     "ref": ref,
                     "sha": sha
                 }
             }).then((res) => {
                 // Once we get the response, extract the access token from
                 // the response body

                 //console.log("token=====>", res.data[0].object.sha);
                 console.log("response bitch======================", res.data);

                 response.send(res.data)

             })
             .catch(error => {
                 console.log(error.response)
             });

     }
 })

 router.post('/deleteBranch', (req, response) => {
     //console.log("fjhbf", req.headers.authorization)
     //var accessToken = req.header.authorization;
     axios({

             // make a POST request
             method: 'delete',
             // to the Github authentication API, with the client ID, client secret
             // and request token
             url: `https://api.github.com/repos/laxmanpole/javascript/git/refs`,
             // Set the content type header, so that we get the response in JSOn
             headers: {
                 Authorization: req.headers.authorization,
                 accept: 'application/json'
             },

         }).then((res) => {
             // Once we get the response, extract the access token from
             // the response body

             //console.log("token=====>", res.data[0].object.sha);
             response.send(res.data)

         })
         .catch(error => {
             console.log(error.response)
         });

 })

 module.exports = router;