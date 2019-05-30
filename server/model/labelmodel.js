//import the mongoose and bcrypt module
const mongoose = require('mongoose');
// var userScheam = require('../model/usermodel');
// create instance of Schema
var mongoSchema = mongoose.Schema;
var labelSchema = new mongoSchema({
    userID: {
        type: mongoSchema.Types.ObjectId,
        ref: 'userSchema'
    },
    labelName: {
        type: String,
        required: [true, "label name is required"],
        unique: true
    }


}, {
    timestamps: true
});


var label = mongoose.model('label', labelSchema);

module.exports = mongoose.model('label', labelSchema);