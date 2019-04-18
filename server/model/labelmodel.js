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

function labelmodel() {

}
var label = mongoose.model('label', labelSchema);
labelmodel.prototype.create = (labelData, callback) => {
    try {
        console.log("label data in labelmodel", labelData.labelName);
        label.find({ 'labelName': labelData.labelName }, (err, data) => {

            if (err) {
                console.log("Error in label schema ");
                return callback(err);
            } else if (data.length > 0) {
                response = { "error": true, "message": "labelName already exists ", "errorCode": 404 };
                return callback(response);
            } else {
                const Data = new label(labelData);
                Data.save((err, result) => {
                    if (err) {
                        console.log("error in labelmodel", err);
                        return callback(err);
                    } else {
                        console.log("data in labelmodel", result);
                        return callback(null, result);
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}
labelmodel.prototype.findAll = (req, callback) => {
    console.log("label data in labelmodel", req.body);
    label.find({ userID: req.body.userID }, (err, data) => {
        if (err) {
            console.log("error in labelmodel", err);
            return callback(err);
        } else {
            console.log("data in labelmodel", data);
            return callback(null, data);
        }

    })


}
labelmodel.prototype.update = (req, callback) => {
    console.log("label data in labelmodel", req.body);
    var labelname = req.body.labelName;
    label.updateOne({ _id: req.body._id }, { labelName: labelname }, (err, data) => {
        if (err) {
            console.log("error in labelmodel", err);
            return callback(err);
        } else {
            console.log("data in labelmodel", data);
            return callback(null, data);
        }

    })
}
labelmodel.prototype.delete = (req, callback) => {
    console.log("label data in labelmodel", req.body);
    label.deleteOne({ _id: req.body._id }, (err, data) => {
        if (err) {
            console.log("error in labelmodel", err);
            return callback(err);
        } else {
            console.log("data in labelmodel", data);
            return callback(null, data);
        }

    })
}

module.exports = new labelmodel();