const note = require('../model/notemodel')
    /**
     *@description:To create a note along with title and description   
     */
exports.createNote = (noteData, callback) => {
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
exports.findAllNote = (req, callback) => {
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

exports.addlabeltoNote = (req, callback) => {
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
exports.removelabelfromNote = (req, callback) => {
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
exports.updateNote = (req, callback) => {
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
exports.deleteNote = (req, callback) => {
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
exports.reminder = (req, callback) => {
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
exports.deletereminder = (req, callback) => {
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
exports.isArchive = (req, callback) => {
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
exports.isTrash = (req, callback) => {
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