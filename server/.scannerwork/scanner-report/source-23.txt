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
exports.findAllNote = (req, callback) => {
    noteModel.findAllNote(req, (err, data) => {
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
exports.reminder = (req, callback) => {
    noteModel.reminder(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.deletereminder = (req, callback) => {
    noteModel.deletereminder(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.isArchive = (req, callback) => {
    noteModel.isArchive(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.isTrash = (req, callback) => {
    noteModel.isTrash(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}