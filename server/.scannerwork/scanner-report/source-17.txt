var collabModel = require('../model/colabmodel')
exports.notecollab = (collabData, callback) => {
    console.log("service data", collabData);
    collabModel.notecollab(collabData, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}