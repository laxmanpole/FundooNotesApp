/*******************************************************************************************************

* Execution : default node : cmd> 

* Purpose : Control flow of user functions

* @file : controller.js

* @overview : usercontroller function

* @author : Laxman Pole<polelaxman001@gmail.com>

* @version : 1.0

* @since :03-04-2018

*********************************************************************************************************/

// import the express and controller function
var userService = require('../services/service')
var jwt = require('jsonwebtoken')
var gentoken = require('../middleware/token')
var sendmail = require('../middleware/sendmail')

// To handle the registration of new user.
// request from client and response from server.
module.exports.register = (req, res) => {
    try {
        req.checkBody('firstname', 'Firstname is not valid').isLength({ min: 3 }).isAlpha()
        req.checkBody('lastname', 'Lastname is not valid').isLength({ min: 3 }).isAlpha()
        req.checkBody('email', 'Email is not valid').isEmail()
        req.checkBody('password', 'password is not valid').isLength({ min: 4 }).equals(req.body.password)
        var errors = req.validationErrors()
        var response = {}
        if (errors) {
            response.success = false

            response.error = errors
            return res.status(422).send(response)
        } else {
            userService.register(req.body, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    console.log('data in controller========>', data.email)

                    const payload = {
                            user_email: data.email
                        }
                        //  console.log(payload)
                    const obj = gentoken.GenerateToken(payload)
                    const url = `http://localhost:3000/verifyemail/${obj.token}`
                    console.log('url in controller', url)

                    sendmail.sendEMailFunction(url, req.body.email)

                    res.status(200).send({
                        success: true,
                        message: 'User register successfully '

                    })
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports.verifyEmail = (req, res) => {
        try {
            console.log('inside verifyemail')

            userService.verifyEmail(req, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    return res.status(200).send({
                        message: data
                    })
                }
            })

            // }
        } catch (err) {
            console.log(err)
        }
    }
    // To handle the Login for registered user.
    // request from client and response from server.
module.exports.login = (req, res) => {
        try {
            console.log('req in controller', req.body)

            req.checkBody('email', 'Email is not valid').isEmail()
            req.checkBody('password', 'password is not valid').isLength({ min: 4 })
                // var secretkey = "adcgfft"
            var errors = req.validationErrors()
            var response = {}
            if (errors) {
                response.success = false
                response.error = errors
                return res.status(422).send(response)
            } else {
                userService.login(req.body, (err, data) => {
                    if (err) {
                        return res.status(500).send({
                            message: err
                        })
                    } else {
                        var token = jwt.sign({ id: data[0]._id }, 'secretkey', { expiresIn: 86400000 })
                        var userId = data[0]._id
                            // console.log("res",res[0].body)

                        client.set(userId, token, redis.print)
                        client.get(userId, function(error, result) {
                                if (error) throw error
                                console.log('Redis working properly ->', result)
                            })
                            // client.hset("record", userId, token, redis.print) //token stored in redis
                            // client.hgetall("record", function(error, result) {
                            //     if (error) throw error
                            //     console.log('Redis working properly ->', result)
                            // })
                        return res.status(200).send({
                            'success': true,
                            'message': 'Login successfully',
                            'data': {
                                'userId': data[0]._id,
                                'name': data[0].firstname,
                                'email': data[0].email,
                                'token': token
                            }
                        })
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    // To handle forgot password 
module.exports.forgotPassword = (req, res) => {
        try {
            req.checkBody('email', 'Email is not valid').isEmail()
                // var secret = "adcgfft"
            var errors = req.validationErrors()
            var response = {}
            if (errors) {
                response.success = false
                response.error = errors
                return res.status(422).send(response)
            } else {
                userService.forgotPassword(req.body, (err, data) => {
                    var response = {}

                    if (err) {
                        return res.status(500).send({
                            message: err
                        })
                    } else {
                        console.log('request body==>', req.body.email)
                        response.success = true
                        response.result = data

                        console.log('data in controller========>', data[0]._id)

                        const payload = {
                                user_id: data[0]._id
                            }
                            //  console.log(payload)
                        const obj = gentoken.GenerateToken(payload)
                        const url = `http://localhost:3000/resetPassword/${obj.token}`
                        console.log('url in controller', url)

                        sendmail.sendEMailFunction(url, req.body.email)

                        res.status(200).send({
                            'success': true,
                            'message': 'reset password link send to email'
                        })
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    // To handle reset password and update new password
exports.resetPassword = (req, res) => {
    try {
        console.log('inside forgotPassword')
        req.checkBody('password', 'password is not valid').isLength({ min: 4 })
        var errors = req.validationErrors()
        var response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        } else {
            userService.resetPassword(req, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    return res.status(200).send({
                        'success': true,
                        'message': 'Password successfully modified'
                    })
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}

// Create and Save a new Note