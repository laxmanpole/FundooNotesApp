var gitService = require('../services/gitservice')
module.exports.gitverify = (req, res) => {
    try {
        console.log('inside gitverify')

        gitService.gitverify(req, (err, data) => {
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