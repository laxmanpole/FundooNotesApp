var labelService = require('../services/labelservice')

exports.createLabel = (req, res) => {
    try {
        console.log('in label controller', req.body, req.decoded, typeof req.decoded.id)
        var response = {}
        if (typeof req.decoded.id === 'undefined') {
            throw new Error('user id is mandatory')
        } else if (typeof req.body.labelName === 'undefined') {
            throw new Error('label is mandatory')
        } else {
            const labelData = {
                userID: req.decoded.id,
                labelName: req.body.labelName

            }
            labelService.createLabel(labelData, (err, data) => {
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

// Retrieve and return all lebel from the database.
exports.findAllLabel = (req, res) => {
    try {
        array = []
        response = {}
        labelService.findAllLabel(req, (err, data) => {
            if (err) {
                response.status = false
                response.error = err
                return res.status(500).send({ response })
            } else {
                response.status = true
                response.userID = data[0].userID
                data.forEach(element => {
                    array.push(element.labelName)
                })
                response.labelName = array
                return res.status(200).send({ response })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

// Update a note identified by the noteId in the request
exports.updateLabel = (req, res) => {
    try {
        response = {}
        labelService.updateLabel(req, (err, data) => {
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

// Delete a note with the specified noteId in the request
exports.deleteLabel = (req, res) => {
    try {
        response = {}
        labelService.deleteLabel(req, (err, data) => {
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