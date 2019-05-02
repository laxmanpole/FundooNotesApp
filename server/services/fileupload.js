const aws = require('aws-sdk')
    // const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config();



const s3 = new aws.S3({
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    region: process.env.region
})
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(new Error('Invalid Mime Type,only JPEG and PNG'), false);
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'myfundoo',
        metadata: function(req, file, callback) {
            callback(null, { fieldName: file.fieldname });
        },
        key: function(req, file, callback) {
            callback(null, Date.now().toString())
        }
    })
})
module.exports = upload;