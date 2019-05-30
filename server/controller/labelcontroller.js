var labelService = require('../services/labelservice')


/**
 * @description:To create new label of user by providing labelsname.
 */
exports.createLabel = (req, res) => {
    try {
        var response = {}
        if (typeof req.decoded.id === 'undefined') {
            throw new Error('user id is mandatory')
        } else if (typeof req.body.labelName === 'undefined') {
            throw new Error('label is mandatory')
        } else {
            // client.get("key" + req.decoded.id, (err, result) => {
            //     if (err) {
            //         console.log("err in redis", err)
            //     } else {
            //         console.log("token in redis", result)
            //     }
            // });
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
                    //response.status = true
                    response = data
                    return res.status(200).send({ response })
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}

/**
 * @description: Retrieve and return all lebel from the database.
 */
exports.findAllLabel = (req, res) => {
        try {
            var array = []
            var response = {}
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
    /**
     *@description: Update a note identified by the noteId in the request
     */

exports.updateLabel = (req, res) => {
        try {
            var response = {}
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
    /**
     *@description: Delete a note with the specified noteId in the request
     */
exports.deleteLabel = (req, res) => {
    try {
        var response = {}
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