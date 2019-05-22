var labelModel = require('../model/labelmodel')

exports.createLabel = (req, callback) => {
    labelModel.createLabel(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.findAllLabel = (req, callback) => {
    labelModel.findAllLabel(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.updateLabel = (req, callback) => {
    labelModel.updateLabel(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.deleteLabel = (req, callback) => {
    labelModel.deleteLabel(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}