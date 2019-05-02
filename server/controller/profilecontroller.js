var userService = require('../services/service')
exports.setprofile = (req, res) => {
    try {

        // var response = {};
        // if (errors) {
        //     response.success = false;
        //     response.error = errors;
        //     return res.status(422).send(response);
        // } else {
        userService.setprofile(req, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send(data);
            }

        })

        // }
    } catch (err) {
        console.log(err);
    }

};