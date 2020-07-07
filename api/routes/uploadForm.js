const express = require('express');
const router = express.Router();

/** This is only for test purposes */
router.get('/', (req, res) => {
    res.send(`
      <h2>With <code>"express"</code> npm package</h2>
      <form action="/api/upload" enctype="multipart/form-data" method="post">
        <div>Text field title: <input type="text" name="title" /></div>
        <div>File: <input type="file" name="uploadedFiles" multiple="multiple" /></div>
        <input type="submit" value="Upload" />
      </form>
    `);
  });

module.exports = router;

