const jwt = require('jsonwebtoken')
exports.checkToken = (req, res, next) => {
    //console.log(req)
    var token1 = req.headers['token'];
    // decode token


    if (token1) {
        // verifies secret and checks exp
        jwt.verify(token1, process.env.SECRETKEY, (err, decoded) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Token is not valid"
                })
            }
            // req decoded and next will pass the controllers
            else {
                req.decoded = decoded;
                console.log("token verify data====>", req.decoded)
                next();
            }
        });
    } else {
        // if there is no token return an error

        return res.send({
            success: false,
            message: "No Token provided"
        })
    }
}