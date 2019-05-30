const noteService = require('../services/noteservice')

/**
 * @description:To create new note of user by providing title and description.
 */
exports.createNote = (req, res) => {
        try {
            console.log('in label controller', req.body, req.decoded, typeof req.decoded.id)
            var response = {}
            if (typeof req.decoded.id === 'undefined') {
                throw new Error('user id is mandatory')
            } else if (typeof req.body.labelsID === 'undefined') {
                throw new Error('label is mandatory')
            } else {
                const noteData = {
                    userID: req.decoded.id,
                    title: req.body.title,
                    description: req.body.description,
                    labelsID: req.body.labelsID

                }
                noteService.createNote(noteData, (err, data) => {
                    if (err) {
                        response.status = false
                        response.error = err
                        return res.status(500).send({ response })
                    } else {
                        response.status = true
                        response.data = data
                        return res.status(200).send({ response })
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    /**
     * @description:To find all notes related to a particular user.
     */
exports.findAllNote = (req, res) => {
        try {
            var array = []
            var response = {}
            noteService.findAllNote(req, (err, data) => {
                if (err) {
                    response.status = false
                    response.error = err
                    return res.status(500).send({ response })
                } else {
                    response.status = true
                    response.userID = data[0].userID
                    data.forEach(element => {
                        array.push(element.title)
                    })
                    response.title = array
                    return res.status(200).send({ response })
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    /**
     * @description: add label to note by providing labels id and note id.
     */
exports.addlabeltoNote = (req, res) => {
        try {
            var response = {}
            noteService.addlabeltoNote(req, (err, data) => {
                if (err) {
                    response.status = false
                    response.error = err
                    return res.status(500).send({ response })
                } else {
                    response.status = true
                    response.data = data
                    return res.status(200).send({ response })
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    /**
     * @description:remove labels from note by providing note id and labels id.
     */
exports.removelabelfromNote = (req, res) => {
    try {
        var response = {}
        noteService.removelabelfromNote(req, (err, data) => {
            if (err) {
                response.status = false
                response.error = err
                return res.status(500).send({ response })
            } else {
                response.status = true
                response.data = data
                return res.status(200).send({ response })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 * @description:To modify the note ,by changing its note title and description.
 */
exports.updateNote = (req, res) => {
        try {
            var response = {}
            noteService.updateNote(req, (err, data) => {
                if (err) {
                    response.status = false
                    response.error = err
                    return res.status(500).send({ response })
                } else {
                    response.status = true
                    response.data = data
                    return res.status(200).send({ response })
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    /**
     * @description:To remove note from the database of user.
     */
exports.deleteNote = (req, res) => {
        try {
            var response = {}
            noteService.deleteNote(req, (err, data) => {
                if (err) {
                    response.status = false
                    response.error = err
                    return res.status(500).send({ response })
                } else {
                    response.status = true
                    response.data = data
                    return res.status(200).send({ response })
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    /**
     * @description:set reminder on note by providing date and time.
     */
exports.reminder = (req, res) => {
        try {
            console.log('inside reminder')
            req.checkBody('_id', '_id is not valid')
            req.checkBody('Date', 'Date is not valid')
            var errors = req.validationErrors()
            var response = {}
            if (errors) {
                response.success = false
                response.error = errors
                return res.status(422).send(response)
            } else {
                noteService.reminder(req, (err, data) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send({
                            message: err
                        })
                    } else {
                        return res.status(200).send({
                            'success': true,
                            'message': 'reminder set sucessfully',
                            // "data": data
                        })
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    /**
     * @description:delete reminder on note.
     */
exports.deletereminder = (req, res) => {
    try {
        var response = {}
        noteService.deletereminder(req, (err, data) => {
            if (err) {
                response.status = false
                response.error = err
                return res.status(500).send({ response })
            } else {
                response.status = true
                response.message = 'reminder deleted successfully'
                return res.status(200).send({ response })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 * @description:To make a note archive.
 */
exports.isArchive = (req, res) => {
    try {
        console.log('inside verifyemail')

        noteService.isArchive(req, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    message: data
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 * @description:To make a note trash.
 */
exports.isTrash = (req, res) => {
    try {
        console.log('inside verifyemail')

        noteService.isTrash(req, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    message: data
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
}