/***************************************************************************************************

* Execution : default node : cmd> 

* Purpose : To Handle services callback function.

* @file : service.js

* @overview : services function

* @author : Laxman Pole

* @version : 1.0

* @since :04-04-2018

*****************************************************************************************************/
//import the usermodel
var userModel = require('../model/usermodel')
exports.register = (req, callback) => {
    userModel.register(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.login = (req, callback) => {
    userModel.login(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.forgotPassword = (req, callback) => {
    userModel.forgotPassword(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}



exports.resetPassword = (req, callback) => {
    userModel.resetPassword(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}