const noteModel = require('../model/notemodel')
exports.searchNoteByTitle = (req, callback) => {
    noteModel.searchNoteByTitle(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.searchNoteByDescription = (req, callback) => {
    noteModel.searchNoteByDescription(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}