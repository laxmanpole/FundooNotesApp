//import the mongoose and bcrypt module
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// create instance of Schema
var mongoSchema = mongoose.Schema;
var userSchema = new mongoSchema({
    "firstname": { type: String }, // required: [true, "First name is required"] },
    "lastname": { type: String }, // required: [true, "LastName is required"] },
    "email": { type: String }, // required: [true, "Email is required"] },
    "password": { type: String }, // required: [true, "password is required"] },
    "verifyemail": { type: Boolean },
    "gitverify": { type: Boolean },
    "gitID": { type: String },
    "gitUsername": { type: String },
    "access_token": { type: String },
    "profileurl": { type: String }

}, {
    timestamps: true
});

function usermodel() {

}
var user = mongoose.model('user', userSchema);

function hash(password) {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

usermodel.prototype.register = (body, callback) => {
    try {
        user.find({ 'email': body.email }, (err, data) => {

            if (err) {
                console.log("Error in register user schema ");
                return callback(err);
            } else if (data.length > 0) {
                var response = { "error": true, "message": "Email already exists ", "errorCode": 404 };
                return callback(response);
            } else {
                const newUser = new user({

                    "firstname": body.firstname,
                    "lastname": body.lastname,
                    "email": body.email,
                    "password": hash(body.password),
                    "verifyemail": false
                });
                newUser.save((err, result) => { //save the user in database
                    if (err) {
                        console.log("error came");
                        console.log("error in model file", err);
                        return callback(err);
                    } else {
                        console.log(body.firstname);
                        // console.log("data save successfully", result);
                        //console.log("registered successfully");
                        callback(null, result);
                        //console.log("no return statements ..registered successfully");

                    }
                })
            }
        });
    } catch (err) {
        console.log(err);
    }

}
usermodel.prototype.verifyEmail = (req, callback) => {
    //console.log("request------>", req.body);
    try {
        console.log(req.decoded.payload.user_email)
            // updateOne() Updates a single document within the collection based on the filter.
        user.updateOne({ email: req.decoded.payload.user_email }, { verifyemail: true }, (err, data) => {
            if (err) {
                console.log("Error in verifyemail ");
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        console.log(err);
    }

}

usermodel.prototype.login = (body, callback) => {
    try {
        var obj = {};
        console.log("data in ==>", body)
        user.find({ "email": body.email }, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data.length > 0) {
                // console.log(data.verifyemail)
                // if (data[0].verifyemail == false) {
                //     return callback({ "message": 'email not verify' })
                // }
                bcrypt.compare(body.password, data[0].password, (err, res) => {
                    if (err) {
                        return callback(err);
                    } else if (res) {
                        console.log(data);
                        obj = data;
                        console.log("congratz...!login successfully");
                        return callback(null, obj);
                    } else {
                        console.log("incorrect password please check it once ");
                        return callback("Incorrect password").status(500);
                    }
                });
            } else {
                console.log(body.email);
                console.log(body.password);
                console.log("username is not in database please check it.")
                return callback("Invalid User");
            }
        });
    } catch (err) {
        console.log(err);
    }
}
usermodel.prototype.forgotPassword = (body, callback) => {
    // console.log("body in model==>",body);
    try {
        user.find({ "email": body.email }, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data) {
                console.log("data in models==>", data[0]._id);

                console.log(data)

                return callback(null, data)
            } else {
                return callback("Invalid User ");
            }
        });
    } catch (err) {
        console.log(err);
    }
}


usermodel.prototype.resetPassword = (req, callback) => {
    //console.log("request------>", req.body);
    try {
        let newpassword = bcrypt.hashSync(req.body.password, 10);
        console.log("new password bcrypt --->", newpassword);

        // updateOne() Updates a single document within the collection based on the filter.
        user.updateOne({ _id: req.decoded.payload.user_id }, { password: newpassword }, (err, data) => {
            if (err) {
                console.log("Error in user resetPassword ");
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        console.log(err);
    }

}

usermodel.prototype.gitOauth = (req, callback) => {
    // console.log("request------>", req);
    try {
        user.find({ gitID: req.profile.id }, (err, data) => {

            if (err) {
                console.log("Error in register user schema ");
                return callback(err);
            } else {
                const newUser = new user({
                    gitID: req.profile.id,
                    gitUsername: req.profile.username,
                    email: req.profile.emails[0].value,
                    access_token: req.accessToken,
                    "firstname": " ",
                    "lastname": " ",
                    "gitverify": "false",
                    "profileurl": ""
                });
                //console.log("photo", req.profile.photos[0].value);

                newUser.save((err, result) => { //save the user in database
                    if (err) {
                        console.log("error came");
                        console.log("error in model file", err);
                        return callback(err);
                    } else {

                        console.log("data save successfully", result);
                        console.log("registered successfully");
                        return callback(null, result);
                        // console.log("no return statements ..registered successfully");

                    }
                })
            }
        });
    } catch (err) {
        console.log(err);
    }


}
usermodel.prototype.gitverify = (req, callback) => {
    //console.log("request------>", req.body);
    try {
        console.log(req.decoded.id)
            // updateOne() Updates a single document within the collection based on the filter.
        user.updateOne({ _id: req.decoded.id }, { gitverify: true }, (err, data) => {
            if (err) {
                console.log("Error in gitverify ");
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        console.log(err);
    }

}
usermodel.prototype.setprofile = (req, callback) => {
    console.log("req data in usermodel", req.decoded, req.file.originalname, req.file.location)
    var image = req.file.originalname;
    var gitID = req.decoded.gitID;
    if (image != null) {
        var newimage = image;
        console.log("newimage", newimage);
    } else {
        callback("image not found")
    }
    console.log("image found", gitID);
    user.findOneAndUpdate({ gitID: gitID }, { $set: { profileurl: req.file.location } },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                console.log("image upload successfully...", newimage, result)
                return callback(null, req.file.location)
            }
        });
}



module.exports = new usermodel()
    //module.exports = mongoose.model('user', userSchema)