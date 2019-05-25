//import the mongoose and bcrypt module
const mongoose = require('mongoose');

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
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reminder: {
        type: Date,
        //required: true
    },
    isArchive: {
        type: Boolean,
        default: false,

    },
    isTrash: {
        type: Boolean,
        default: false,

    }


}, {
    timestamps: true
});

function notemodel() {

}
var note = mongoose.model('note', noteSchema);

/**
 *@description:To create a note along with title and description   
 */
notemodel.prototype.createNote = (noteData, callback) => {
        try {
            console.log(noteData.title);
            note.find({ 'title': noteData.title }, (err, data) => {

                if (err) {
                    console.log("Error in noteschema ");
                    return callback(err);
                } else if (data.length > 0) {
                    var response = { "error": true, "message": "Title already exists ", "errorCode": 404 };
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
    /**
     *@description:To retrieve all note from database of particular user 
     */
notemodel.prototype.findAllNote = (req, callback) => {
    try {
        console.log("note data in notemodel", req.decoded.id);
        note.find({ userID: req.decoded.id }, (err, data) => {
            if (err) {
                console.log("error in notemodel", err);
                return callback(err);
            } else {
                console.log("data in notemodel", data);
                return callback(null, data);
            }

        }).sort({ "title": 1 })
    } catch (err) {
        console.log(err);
    }
}

/**
 *@description:add label to note using labels id and note id 
 */
notemodel.prototype.addlabeltoNote = (req, callback) => {
    try {
        console.log("label data in labelmodel", req.body);
        var labelsID = req.body.labelsID;
        var noteID = req.body.noteID;
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

/**
 * @description:To remove label from note using labels id and note id
 */
notemodel.prototype.removelabelfromNote = (req, callback) => {
    try {
        console.log("label data in notemodel", req.body);
        var labelsID = req.body.labelsID;
        var noteID = req.body.noteID;
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

/**
 * @description:To modify note like changing the title or description
 */
notemodel.prototype.updateNote = (req, callback) => {
        try {
            console.log("label data in labelmodel", req.body);
            var title = req.body.title;
            var description = req.body.description;
            console.log(description);
            note.updateOne({ _id: req.body.noteID }, { title: title, description: description }, (err, data) => {
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
    /**
     * @description:To remove note from database using note id
     */
notemodel.prototype.deleteNote = (req, callback) => {
    try {
        console.log("label data in notemodel", req.body);
        note.findByIdAndDelete({ _id: req.body.noteID }, (err, data) => {
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

/**
 * @description:To set reminder on note take a input as date
 */
notemodel.prototype.reminder = (req, callback) => {
    try {
        //console.log(" data in notemodel", req.body);
        var date = new Date(req.body.date);
        note.findOneAndUpdate({ _id: req.body.noteID }, { $set: { reminder: date } }, (err, data) => {
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

/**
 * @description:To remove reminder on note ,in database reminder field will be deleted
 */
notemodel.prototype.deletereminder = (req, callback) => {
    try {
        //console.log(" data in notemodel", req.body);
        note.findOneAndUpdate({ _id: req.body.noteID }, { $unset: { reminder: 1 } }, (err, data) => {
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

/**
 * @description:To check note is an archive or not if it is true then this note is archive
 */
notemodel.prototype.isArchive = (req, callback) => {
        try {
            //console.log(" data in notemodel", req.body);
            note.findOneAndUpdate({ _id: req.body.noteID }, { $set: { isArchive: true } }, (err, data) => {
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
    /**
     * @description:To check note is an trash or not if it is true then this note is trash
     */
notemodel.prototype.isTrash = (req, callback) => {
    try {
        //console.log(" data in notemodel", req.body);
        note.findOneAndUpdate({ _id: req.body.noteID }, { $set: { isTrash: true } }, (err, data) => {
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

/**
 * @description:To search note in database by any character,if this character is match with any notes 
 *              title then this note will be display.  
 */
notemodel.prototype.searchNoteByTitle = (req, callback) => {
    try {
        console.log(" data in notemodel", req.title);
        var searchNote = new RegExp(req.title);
        console.log(" data in notemodel", searchNote);
        note.find({ title: searchNote, userID: req.userID }, (err, data) => {
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

/**
 *@description:To search note in database by any character,if this character is match with any notes 
 *              description then this note will be display.  
 */
notemodel.prototype.searchNoteByDescription = (req, callback) => {
    try {
        var searchNote = new RegExp(req.description);
        console.log(" data in notemodel", searchNote);
        note.find({ description: searchNote, userID: req.userID }, (err, data) => {
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

module.exports = new notemodel();
//module.exports = mongoose.model('note', noteSchema);