var label = require('../model/labelmodel')


/**
 *@description: To create a label of user and stored in database  
 */
exports.createLabel = (labelData, callback) => {
        try {
            console.log("label data in labelmodel", labelData.labelName);
            label.find({ 'labelName': labelData.labelName }, (err, data) => {

                if (err) {
                    console.log("Error in label schema ");
                    return callback(err);
                } else if (data.length > 0) {
                    var response = { "error": true, "message": "labelName already exists ", "errorCode": 404 };
                    return callback(response);
                } else {
                    const Data = new label(labelData);
                    Data.save((err, result) => {
                        if (err) {
                            console.log("error in labelmodel", err);
                            return callback(err);
                        } else {
                            console.log("data in labelmodel", result);
                            return callback(null, result);
                        }
                    })
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    /**
     *@description :To retrieve all label in database of particular user using id
     */
exports.findAllLabel = (req, callback) => {
        try {
            console.log("label data in labelmodel", req.body);
            label.find({ userID: req.body.userID }, (err, data) => {
                if (err) {
                    console.log("error in labelmodel", err);
                    return callback(err);
                } else {
                    console.log("data in labelmodel", data);
                    return callback(null, data);
                }

            }).sort({ "labelName": 1 })
        } catch (err) {
            console.log(err);
        }
    }
    /**
     *@description :To change the label name ,replace new name with old name
     */
exports.updateLabel = (req, callback) => {
        try {
            console.log("label data in labelmodel", req.body);
            var labelname = req.body.labelName;
            label.updateOne({ _id: req.body._id }, { labelName: labelname }, (err, data) => {
                if (err) {
                    console.log("error in labelmodel", err);
                    return callback(err);
                } else {
                    console.log("data in labelmodel", data);
                    return callback(null, data);
                }

            })
        } catch (err) {
            console.log(err)
        }
    }
    /**
     *@description:To remove label from database of perticular user 
     */
exports.deleteLabel = (req, callback) => {
    try {
        console.log("label data in labelmodel", req.body);
        label.deleteOne({ _id: req.body._id }, (err, data) => {
            if (err) {
                console.log("error in labelmodel", err);
                return callback(err);
            } else {
                console.log("data in labelmodel", data);
                return callback(null, data);
            }

        })
    } catch (err) {
        console.log(err);
    }
}