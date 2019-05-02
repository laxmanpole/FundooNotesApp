const express = require('express');
const router = express.Router();
const upload = require('../services/fileupload');

const singleUpload = upload.single('image');
router.post('/image-upload', function(req, res) {
    singleUpload(req, res, function(err) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'file upload error', detail: err.message }] });

        }
        return res.json({ 'imageUrl': req.file.location });
    });
});
module.exports = router;