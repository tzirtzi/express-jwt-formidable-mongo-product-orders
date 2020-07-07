const express = require('express');
const router = express.Router();

const upload = require('../middleware/uploadFileFormidable');

/** Handle uplopad request */
router.post('/', upload, (req, res) =>{

    //TO DO: Handle upload data to store file url and info in db!!
    console.log(req.uploadData);

    res.status(200).json(req.uploadData);

});

module.exports = router;


