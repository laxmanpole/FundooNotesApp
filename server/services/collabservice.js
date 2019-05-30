var collab = require('../model/colabmodel')
const user = require('../model/usermodel')
const note = require('../model/notemodel')
    /**
     *@description:Invite user for note collaborating and check this 
     *             user are available or not in database.    
     */

exports.notecollab = (collabData, callback) => {
    try {
        console.log('data in collabmodel', collabData)

        user.find({ '_id': collabData.userID }, (err, data) => {
            if (err) {
                console.log('Error in noteschema ')
                return callback(err)
            } else if (!data.length > 0) {
                var response = { 'error': true, 'message': 'User id is not exist userschema' }
                return callback(response)
            } else {
                // find note in database
                note.find({ '_id': collabData.noteID }, (err, data) => {
                    if (err) {
                        console.log('Error in noteschema ')
                        return callback(err)
                    } else if (!data.length > 0) {
                        response = { 'error': true, 'message': 'note id is not exist in noteschema ' }
                        return callback(response)
                    } else {
                        // find user in database
                        collab.find({ 'userID': collabData.userID, 'noteID': collabData.noteID }, (err, data) => {
                            if (err) {
                                console.log('Error in ')
                                return callback(err)
                            } else if (data.length > 0) {
                                response = { 'error': true, 'message': 'collaborator allready exist in collabschema ' }
                                return callback(response)
                            } else {
                                const Data = new collab(collabData)
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