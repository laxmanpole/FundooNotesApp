const jwt = require('jsonwebtoken')
exports.checkToken = (req, res, next) => {
    //console.log(req)
    var token1 = req.headers['token'];
    // decode token


    if (token1) {
        // verifies secret and checks exp
        var payload = jwt.verify(token1, 'secretkey')
        if (!payload) {
            return { "message": "git verification unsuccessful" }
        }
        console.log("payload====>", payload.gitID)

    } else {
        // if there is no token return an error
        return res.send({
            success: false,
            message: "No Token provided"
        })
    }
}