var searchService = require('../services/seachservice')
module.exports.searchNoteByTitle = (req, res) => {
    try {
        console.log("req data", req.decoded.id);
        var array = [];
        var response = {}
        if (req.decoded.length > 0 && req.length > 0) {
            response.success = false
            response.error = { "mesaage": "token is not provided" }
            return res.status(422).send(response)
        } else {
            const searchData = {
                userID: req.decoded.id,
                title: req.body.searchNote
            }
            searchService.searchNoteByTitle(searchData, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    response.status = true
                    response.userID = data[0].userID
                    data.forEach(element => {
                        array.push(element.title)
                    })
                    response.title = array
                    return res.status(200).send(response)


                }
            })

        }
    } catch (err) {
        console.log(err)
    }
}
module.exports.searchNoteByDescription = (req, res) => {
    try {
        console.log("req data", req.decoded.id);
        var array = [];
        var response = {}
        if (req.decoded.length <= 0) {
            response.success = false
            response.error = { "mesaage": "token is not provided" }
            return res.status(422).send(response)
        } else {
            const searchData = {
                userID: req.decoded.id,
                description: req.body.searchNote
            }
            searchService.searchNoteByDescription(searchData, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    response.status = true
                    response.userID = data[0].userID
                    data.forEach(element => {
                        array.push(element.title)
                    })
                    response.title = array
                    return res.status(200).send(response)

                }
            })

        }
    } catch (err) {
        console.log(err)
    }
}