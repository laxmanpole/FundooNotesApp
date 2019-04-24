var userModel = require('../model/usermodel')
exports.gitverify = (req, callback) => {
    userModel.gitverify(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}