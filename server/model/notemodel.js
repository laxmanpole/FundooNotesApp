//import the mongoose and bcrypt module
const mongoose = require('mongoose');

// create instance of Schema
var mongoSchema = mongoose.Schema;
var noteSchema = new mongoSchema({
    userID: {
        type: mongoSchema.Types.ObjectId,
        ref: 'userSchema'
    },
    labelsID: [{
        type: mongoSchema.Types.ObjectId,
        ref: 'labelSchema'
    }],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reminder: {
        type: Date,
        //required: true
    },
    isArchive: {
        type: Boolean,
        default: false,

    },
    isTrash: {
        type: Boolean,
        default: false,

    }


}, {
    timestamps: true
});

var note = mongoose.model('note', noteSchema);
module.exports = mongoose.model('note', noteSchema);