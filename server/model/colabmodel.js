/**
 * @description: requiring mongoose ORM
 */
const user = require('../model/usermodel')
const note = require('../model/notemodel')
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

function collabmodel() {}
var collab = mongoose.model('collab', collabSchema)

/**
 *@description 
 */
collabmodel.prototype.notecollab = (collabData, callback) => {
    try {
        console.log('data in collabmodel', collabData);

        user.find({ '_id': collabData.userID }, (err, data) => {
            if (err) {
                console.log('Error in noteschema ')
                return callback(err)
            } else if (!data.length > 0) {
                var response = { 'error': true, 'message': 'User id is not exist userschema' }
                return callback(response)
            } else {
                note.find({ '_id': collabData.noteID }, (err, data) => {
                    if (err) {
                        console.log('Error in noteschema ')
                        return callback(err)
                    } else if (!data.length > 0) {
                        response = { 'error': true, 'message': 'note id is not exist in noteschema ' }
                        return callback(response)
                    } else {
                        collab.find({ 'userID': collabData.userID, 'noteID': collabData.noteID }, (err, data) => {
                            if (err) {
                                console.log('Error in ')
                                return callback(err)
                            } else if (data.length > 0) {
                                response = { 'error': true, 'message': 'collaborator allready exist in collabschema ' }
                                return callback(response)
                            } else {
                                const Data = new collab(collabData);
                                Data.save((err, result) => {
                                    if (err) {
                                        console.log('error in labelmodel', err)
                                        return callback(err)
                                    } else {
                                        console.log('data in labelmodel', result)
                                        return callback(null, result)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = new collabmodel()