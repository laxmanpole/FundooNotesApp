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
var async = require('async')
    /**
     *@description: To handle the registration of new user.
     *             request from client and response from server.
     */
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
            var rsp = {}
            const tasks = [
                function registerUser(callback) {
                    userService.register(req.body, (err, data) => {
                        if (err) {
                            return callback(err)
                        } else {
                            console.log('data==>', data)
                            rsp = data
                                // console.log('data22==>', rsp)
                            return callback(null, data)
                        }
                    })
                },
                function sendMail(callback) {
                    // console.log('data aaraha hai==>', rsp.email)
                    const payload = {
                            user_email: rsp.email
                        }
                        // console.log(payload)
                    const obj = gentoken.GenerateToken(payload)
                    const url = `http://localhost:3000/verifyemail/${obj.token}`
                    sendmail.sendEMailFunction(url, rsp.email)
                    return callback(null, obj.token)
                }
            ]
            async.series(tasks, (err, results) => {
                // console.log("result mil gaya===>", results)
                if (err) {
                    console.log(err)
                    return (err)
                } else {
                    console.log('result mil gaya===>', results) // this gets executed with proper results
                    return res.json(results)
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
    /**
     * @description:To handle the Login for registered user.
     *              request from client and response from server.
     */
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
                async.waterfall([
                        function one(callback) {
                            userService.login(req.body, (err, data) => {
                                if (err) {
                                    callback(null, err)
                                } else {
                                    console.log(' data===>', data)
                                    callback(null, data)
                                }
                            })
                        },
                        function two(data, callback) {
                            var token = jwt.sign({ id: data[0]._id }, process.env.SECRETKEY, { expiresIn: 86400000 })
                            var userId = data[0]._id
                            client.set('key' + userId, token, redis.print)
                            callback(null, { data, 'token': token })
                        }
                    ],
                    // optional callback
                    function(err, results) {
                        if (err) {
                            console.log(err)
                            return res.json(err)
                        } else {
                            console.log(results)
                            return res.json(results)
                        }
                    })
            }
        } catch (err) {
            console.log(err)
        }
    }
    /**
     * @description: To handle forgot password 
     */

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
                            'message': 'reset password link send to email',
                            'token': obj.token
                        })
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    /**
     *@description:  To handle reset password and update new password
     */

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
<<<<<<< HEAD

exports.gitverify = (req, res) => {
    try {
        console.log('inside gitverify')
        userService.gitverify(req, (err, data) => {
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
    } catch (err) {
        console.log(err)
    }
}

/**
 * @description:To search a note in database by taking as character. 
 */
module.exports.searchNoteByTitle = (req, res) => {
        try {
            console.log('req data', req.decoded.id)
            var array = []
            var response = {}
            if (req.decoded.length > 0 && req.length > 0) {
                response.success = false
                response.error = { 'mesaage': 'token is not provided' }
                return res.status(422).send(response)
            } else {
                const searchData = {
                    userID: req.decoded.id,
                    title: req.body.searchNote
                }
                userService.searchNoteByTitle(searchData, (err, data) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send({
                            message: err
                        })
                    } else {
                        response.status = true
                            // response.userID = data[0].userID
                        data.forEach(element => {
                            array.push(element.title)
                        })
                        response.title = array
                        return res.status(200).send(response)
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    /**
     * @description:To search a note through description in database by taking as character. 
     */
module.exports.searchNoteByDescription = (req, res) => {
    try {
        console.log('req data', req.decoded.id)
        var array = []
        var response = {}
        if (req.decoded.length <= 0) {
            response.success = false
            response.error = { 'mesaage': 'token is not provided' }
            return res.status(422).send(response)
        } else {
            const searchData = {
                userID: req.decoded.id,
                description: req.body.searchNote
            }
            userService.searchNoteByDescription(searchData, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    response.status = true
                    response.userID = data[0].userID
                    data.forEach(element => {
                        array.push(element.title)
                    })
                    response.title = array
                    return res.status(200).send(response)
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}
=======
>>>>>>> fc6357959f2e6bb1a81698c887298c6a4ccad6ca
