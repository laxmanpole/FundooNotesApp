const mongoose = require('mongoose')
    /**
     * @description: mongodb schema for collaborators 
     */
const schema = mongoose.Schema

var collabSchema = new schema({
    userID: {
        type: schema.Types.ObjectId,
        ref: 'userSchema',
        required: [true, 'userID is mandatory']
    },

    noteID: {
        type: schema.Types.ObjectId,
        ref: 'noteSchema',
        required: [true, 'noteID is mandatory']
    },

    collabID: {
        type: schema.Types.ObjectId,
        ref: 'userSchema',
        required: [true, 'collabID is mandatory']
    }

}, {
    timestamps: true
})


var collab = mongoose.model('collab', collabSchema)

module.exports = mongoose.model('collab', collabSchema)