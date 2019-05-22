var userService = require('../services/service')
exports.setprofile = (req, res) => {
    try {
        userService.setprofile(req, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send(data)
            }
        })

        // }
    } catch (err) {
        console.log(err)
    }
}