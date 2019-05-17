const aws = require('aws-sdk')
    // const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config();



const s3 = new aws.S3({
        secretAccessKey: process.env.SECRETACCESSKEY,
        accessKeyId: process.env.ACCESSKEYID,
        region: process.env.REGION
    })
    //check the type of file
const fileFilter = (req, file, callback) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            callback(null, true)
        } else {
            callback(new Error('Invalid Mime Type,only JPEG and PNG'), false);
        }
    }
    //upload the file in given bucket
const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'myfundoo', //The bucket used to store the file
        metadata: function(req, file, callback) { //The metadata object to be sent to S3
            callback(null, { fieldName: file.fieldname });
        },
        key: function(req, file, callback) { //The name of the file
            callback(null, Date.now().toString())
        }
    })
})
module.exports = upload;