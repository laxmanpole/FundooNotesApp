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