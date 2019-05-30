const express = require('express')
const router = express.Router()
const passport = require('passport')
const GithubStrategy = require('passport-github')
var jwt = require('jsonwebtoken')
const service = require('../services/service')
const controller = require('../controller/controller')
const middle = require('../authentication/index')
const axios = require('axios')

/**
 *@description:Social login for Github Account using passport strategies.  
 */
passport.use(new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI,
        scope: 'repo'
    },
    function(accessToken, refreshToken, profile, done) {
        // console.log("profile", profile)

        var req = { accessToken, profile }
        service.gitOauth(req, (err, data) => {
            if (err) {
                console.log(err)
                done(err)
            } else {
                console.log('data=====>', data.id)
                var token = jwt.sign({ id: data.id }, process.env.SECRETKEY, { expiresIn: 86400000 })
                client.set(data.id, token, redis.print)
                done(JSON.stringify(token))
            }
        })
    }))

router.route('/github').get(passport.authenticate('github', { scope: 'repo' }))
router.route('/auth/github').get(passport.authenticate('github'))

router.post('/gitverify/:token', middle.checkToken, controller.gitverify)

/**
 * @description:Creating new branch of given user. 
 */
router.post('/createBranch', (req, response) => {
    console.log('fjhbf', req.headers.authorization)
    axios({

        // make a POST request
        method: 'get',
        // to the Github authentication API, with the client ID, client secret
        // and request token
        url: `https://api.github.com/repos/${process.env.OWNER}/${req.body.reposName}/git/refs/heads`,
        // Set the content type header, so that we get the response in JSOn
        headers: {
            Authorization: req.headers.authorization,
            accept: 'application/json'
        }
    }).then((res) => {
        // Once we get the response, extract the access token from
        // the response body

        console.log('data=====>', res.data[0].object.sha, req.body.ref, req.headers.authorization)
            // response.send(res.data)
        createBranch(req.body.ref, res.data[0].object.sha, req.headers.authorization, req.body.reposName)
    }).catch(error => {
        console.log(error.response)
    })

    function createBranch(ref, sha, token, reposName) {
        console.log('token=======>', token)
        console.log('sha ====== > ', sha)
        axios({
                // make a POST request
                method: 'post',
                // to the Github authentication API, with the client ID, client secret
                // and request token
                url: `https://api.github.com/repos/${process.env.OWNER}/${reposName}/git/refs`,
                // Set the content type header, so that we get the response in JSOn
                headers: {
                    Authorization: token,
                    accept: 'application/json'
                },
                data: {
                    'ref': ref,
                    'sha': sha
                }
            }).then((res) => {
                // Once we get the response, extract the access token from
                // the response body

                // console.log("token=====>", res.data[0].object.sha)
                console.log('response bi======================', res.data)

                response.send(res.data)
            })
            .catch(error => {
                console.log(error.response)
            })
    }
})

/**
 * @description:Deleting exist branch of given user.
 */
router.post('/deleteBranch', (req, response) => {
    console.log('fjhbf', req.headers.authorization, req.body.branchName)
        // var accessToken = req.header.authorization
    axios({

            // make a DELETE request
            method: 'delete',
            // to the Github authentication API, with the client ID, client secret
            // and request token
            url: `https://api.github.com/repos/${process.env.OWNER}/${req.body.reposName}/git/refs/heads/${ req.body.branchName}`,
            // Set the content type header, so that we get the response in JSOn
            headers: {
                Authorization: req.headers.authorization,
                accept: 'application/json'
            }
        }).then((res) => {
            // Once we get the response, extract the access token from
            console.log('rsponse main data hai', res)

            response.send({ 'messgae': 'Branch deleted sucessfully' })
        })
        .catch(error => {
            console.log(error.response)
        })
})

/**
 * @description:To star the repository of github user
 */
router.post('/starRepo', (req, response) => {
        console.log('fjhbf', req.headers.authorization, req.body.reposName)
            // var accessToken = req.header.authorization
        axios({

                // make a PUT request
                method: 'put',
                // to the Github authentication API, with the client ID, client secret
                // and request token
                url: `https://api.github.com/user/starred/${process.env.OWNER}/${ req.body.reposName}`,
                // Set the content type header, so that we get the response in JSOn
                headers: {
                    Authorization: req.headers.authorization,
                    accept: 'application/json'
                }

            }).then((res) => {
                // Once we get the response, extract the access token from
                console.log('rsponse main data hai', res)

                response.send({ 'messgae': 'Repo starred sucessfully' })
            })
            .catch(error => {
                console.log(error.response)
            })
    })
    /**
     * @description:To remove star from repository of github user
     */
router.post('/unstarRepo', (req, response) => {
    console.log('fjhbf', req.headers.authorization, req.body.reposName)
        // var accessToken = req.header.authorization
    axios({

            // make a PUT request
            method: 'delete',
            // to the Github authentication API, with the client ID, client secret
            // and request token
            url: `https://api.github.com/user/starred/${process.env.OWNER}/${ req.body.reposName}`,
            // Set the content type header, so that we get the response in JSOn
            headers: {
                Authorization: req.headers.authorization,
                accept: 'application/json'
            },
            //  data: {
            //      "ref": req.body.branchName

            //  }
        }).then((res) => {
            // Once we get the response, extract the access token from
            console.log('rsponse main data hai', res)

            response.send({ 'messgae': 'Repo Unstarred sucessfully' })
        })
        .catch(error => {
            console.log(error.response)
        })
})

/**
 *@description:To make watch repository of github user. 
 */
router.post('/watchRepo', (req, response) => {
    console.log('fjhbf', req.headers.authorization, req.body.reposName, req.query.subscribed)
        // var accessToken = req.header.authorization
    axios({

            // make a PUT request
            method: 'put',
            // to the Github authentication API, with the client ID, client secret
            // and request token
            url: `https://api.github.com/repos/${process.env.OWNER}/${ req.body.reposName}/subscription?subscribed=${ req.query.subscribed}&ignored=${ req.query.ignored}`,
            // Set the content type header, so that we get the response in JSOn
            headers: {
                Authorization: req.headers.authorization,
                accept: 'application/json'
            }

        }).then((res) => {
            // Once we get the response, extract the access token from
            console.log('rsponse main data hai', res)

            response.send({ 'messgae': 'Watch Repository sucessfully' })
        })
        .catch(error => {
            console.log(error.response)
        })
})

/**
 *@description:To make unwatch repository of github user.  
 */
router.post('/unwatchRepo', (req, response) => {
    console.log('=====>', req.headers.authorization, req.body.reposName, req.query.subscribed)
        // var accessToken = req.header.authorization
    axios({

            // make a PUT request
            method: 'delete',
            // to the Github authentication API, with the client ID, client secret
            // and request token
            url: `https://api.github.com/repos/${process.env.OWNER}/${ req.body.reposName}/subscription?subscribed=${ req.query.subscribed}&ignored=${ req.query.ignored}`,
            // Set the content type header, so that we get the response in JSOn
            headers: {
                Authorization: req.headers.authorization,
                accept: 'application/json'
            }

        }).then((res) => {
            // Once we get the response, extract the access token from
            console.log('rsponse main data hai', res)

            response.send({ 'messgae': 'UnWatch Repository sucessfully' })
        })
        .catch(error => {
            console.log(error.response)
        })
})
module.exports = router