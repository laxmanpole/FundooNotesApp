//import the mongoose and bcrypt module
const mongoose = require('mongoose');

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


var user = mongoose.model('user', userSchema);
module.exports = mongoose.model('user', userSchema)