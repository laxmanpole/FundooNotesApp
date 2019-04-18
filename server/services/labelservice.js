var labelModel = require('../model/labelmodel')

exports.create = (req, callback) => {
    labelModel.create(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.findAll = (req, callback) => {
    labelModel.findAll(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.update = (req, callback) => {
    labelModel.update(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.delete = (req, callback) => {
    labelModel.delete(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}