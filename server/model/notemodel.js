//import the mongoose and bcrypt module
const mongoose = require('mongoose');
// var userScheam = require('../model/usermodel');
// create instance of Schema
var mongoSchema = mongoose.Schema;
var noteSchema = new mongoSchema({
    userID: {
        type: mongoSchema.Types.ObjectId,
        ref: 'userSchema'
    },
    labelsID: [{
        type: mongoSchema.Types.ObjectId,
        ref: 'labelSchema'
    }],
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }


}, {
    timestamps: true
});

function notemodel() {

}
var note = mongoose.model('note', noteSchema);
notemodel.prototype.createNote = (noteData, callback) => {
    try {
        console.log(noteData.Title);
        note.find({ 'Title': noteData.Title }, (err, data) => {

            if (err) {
                console.log("Error in noteschema ");
                return callback(err);
            } else if (data.length > 0) {
                response = { "error": true, "message": "Title already exists ", "errorCode": 404 };
                return callback(response);
            } else {
                console.log("label data in notemodel", noteData);
                const Data = new note(noteData);
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
notemodel.prototype.addlabeltoNote = (req, callback) => {
    try {
        console.log("label data in labelmodel", req.body);
        var labelsID = req.body.labelsID;
        var noteID = req.body._id;
        note.find({ labelsID: labelsID }, (err, data) => {
            if (err) {
                console.log("error in note model");
            } else if (data.length > 0) {
                console.log("label is allready exist");
            } else {
                note.findOneAndUpdate({ _id: noteID }, { $push: { "labelsID": labelsID } }, (err, data) => {
                    if (err) {
                        console.log("error in notemodel", err);
                        return callback(err);
                    } else {
                        console.log("data in notemodel", data);
                        var res = data.labelsID;
                        res.push(labelsID);
                        data.labelsID = res;

                        return callback(null, data);
                    }

                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}
notemodel.prototype.removelabelfromNote = (req, callback) => {
    try {
        console.log("label data in notemodel", req.body);
        var labelsID = req.body.labelsID;
        var noteID = req.body._id;
        note.find({ labelsID: labelsID }, (err, data) => {

            if (err) {
                console.log("error in note model");
            } else if (!data) {
                console.log("pls provide noteid and lables id");
            } else {
                note.findOneAndUpdate({ _id: noteID }, { $pull: { "labelsID": labelsID } }, (err, data) => {
                    if (err) {
                        console.log("error in notemodel", err);
                        return callback(err);
                    } else {
                        console.log("data in notemodel", data);
                        var res = data.labelsID;
                        res.pull(labelsID)
                        data.labelsID = res;
                        return callback(null, data);
                    }

                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}
notemodel.prototype.updateNote = (req, callback) => {
    try {
        console.log("label data in labelmodel", req.body);
        var title = req.body.Title;
        var description = req.body.Description;
        console.log(description);
        note.updateOne({ _id: req.body._id }, { Title: title, Description: description }, (err, data) => {
            if (err) {
                console.log("error in notemodel", err);
                return callback(err);
            } else {
                console.log("data in notemodel", data);
                return callback(null, data);
            }

        })
    } catch (err) {
        console.log(err);
    }
}
notemodel.prototype.deleteNote = (req, callback) => {
    try {
        console.log("label data in labelmodel", req.body);
        note.deleteOne({ _id: req.body._id }, (err, data) => {
            if (err) {
                console.log("error in labelmodel", err);
                return callback(err);
            } else {
                console.log("data in labelmodel", data);
                return callback(null, data);
            }

        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = new notemodel();