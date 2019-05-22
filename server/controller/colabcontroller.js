var collabService = require('../services/collabservice')
module.exports.notecollab = (req, res) => {
    try {
        console.log("req data", req.decoded.id);
        var response = {}
        if (req.decoded.length <= 0) {
            response.success = false
            response.error = { "mesaage": "token is not provided" }
            return res.status(422).send(response)
        } else {
            const collabData = {
                userID: req.decoded.id,
                noteID: req.body.noteID,
                collabID: req.body.collabID

            }
            collabService.notecollab(collabData, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        message: err
                    })
                } else {

                    res.status(200).send({
                        success: true,
                        message: 'Note collaboration is successfull'

                    })
                }
            })

        }
    } catch (err) {
        console.log(err)
    }
}