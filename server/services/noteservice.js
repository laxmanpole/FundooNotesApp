const noteModel = require('../model/notemodel')
exports.createNote = (req, callback) => {
    noteModel.createNote(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.updateNote = (req, callback) => {
    noteModel.updateNote(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}