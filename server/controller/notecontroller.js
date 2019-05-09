const noteService = require('../services/noteservice')
exports.createNote = (req, res) => {
    try {
        console.log("in label controller", req.body, req.decoded, typeof req.decoded.id);
        var response = {};
        if (typeof req.decoded.id === "undefined") {
            throw new Error("user id is mandatory");
        } else if (typeof req.body.labelsID === "undefined") {
            throw new Error("label is mandatory");
        } else {
            const noteData = {
                userID: req.decoded.id,
                Title: req.body.Title,
                Description: req.body.Description,
                labelsID: req.body.labelsID

            }
            noteService.createNote(noteData, (err, data) => {
                if (err) {
                    response.status = false;
                    response.error = err;
                    return res.status(500).send({ response })
                } else {
                    response.status = true;
                    response.data = data;
                    return res.status(200).send({ response })
                }

            })
        }

    } catch (err) {
        console.log(err);
    }
};
exports.findAllNote = (req, res) => {
    try {
        array = [];
        response = {};
        noteService.findAllNote(req, (err, data) => {
            if (err) {
                response.status = false;
                response.error = err;
                return res.status(500).send({ response })
            } else {
                response.status = true;
                response.userID = data[0].userID;
                data.forEach(element => {
                    array.push(element.Title)
                });
                response.Title = array;
                return res.status(200).send({ response })
            }

        })


    } catch (err) {
        console.log(err);
    }
};

exports.addlabeltoNote = (req, res) => {
    try {
        response = {};
        noteService.addlabeltoNote(req, (err, data) => {
            if (err) {
                response.status = false;
                response.error = err;
                return res.status(500).send({ response })
            } else {
                response.status = true;
                response.data = data;
                return res.status(200).send({ response })
            }

        })


    } catch (err) {
        console.log(err);
    }
};
exports.removelabelfromNote = (req, res) => {
    try {
        response = {};
        noteService.removelabelfromNote(req, (err, data) => {
            if (err) {
                response.status = false;
                response.error = err;
                return res.status(500).send({ response })
            } else {
                response.status = true;
                response.data = data;
                return res.status(200).send({ response })
            }

        })


    } catch (err) {
        console.log(err);
    }
};
exports.updateNote = (req, res) => {
    try {
        response = {};
        noteService.updateNote(req, (err, data) => {
            if (err) {
                response.status = false;
                response.error = err;
                return res.status(500).send({ response })
            } else {
                response.status = true;
                response.data = data;
                return res.status(200).send({ response })
            }

        })


    } catch (err) {
        console.log(err);
    }
};
exports.deleteNote = (req, res) => {
    try {
        response = {};
        noteService.deleteNote(req, (err, data) => {
            if (err) {
                response.status = false;
                response.error = err;
                return res.status(500).send({ response })
            } else {
                response.status = true;
                response.data = data;
                return res.status(200).send({ response })
            }

        })


    } catch (err) {
        console.log(err);
    }
};
exports.reminder = (req, res) => {
    try {
        console.log("inside reminder");
        req.checkBody('_id', '_id is not valid');
        req.checkBody('Date', 'Date is not valid');
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteService.reminder(req, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    return res.status(200).send({
                        "success": true,
                        "message": "reminder set sucessfully",
                        //"data": data
                    });
                }

            })

        }
    } catch (err) {
        console.log(err);
    }

};
exports.deletereminder = (req, res) => {
    try {
        response = {};
        noteService.deletereminder(req, (err, data) => {
            if (err) {
                response.status = false;
                response.error = err;
                return res.status(500).send({ response })
            } else {
                response.status = true;
                response.message = "reminder deleted successfully";
                return res.status(200).send({ response })
            }

        })


    } catch (err) {
        console.log(err);
    }
};
exports.isArchive = (req, res) => {
    try {
        console.log("inside verifyemail");

        noteService.isArchive(req, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    message: data
                });
            }

        })

    } catch (err) {
        console.log(err);
    }
};
exports.isTrash = (req, res) => {
    try {
        console.log("inside verifyemail");

        noteService.isTrash(req, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    message: data
                });
            }

        })

    } catch (err) {
        console.log(err);
    }
}