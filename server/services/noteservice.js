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

exports.addlabeltoNote = (req, callback) => {
    noteModel.addlabeltoNote(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.removelabelfromNote = (req, callback) => {
    noteModel.removelabelfromNote(req, (err, data) => {
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
exports.deleteNote = (req, callback) => {
    noteModel.deleteNote(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}