const checkAuth = require('../middleware/check-auth');

const express = require('express');
const router = express.Router();

router.get('/', checkAuth, (req, res, next) => {
    res.status(200).json({userdata: req.userData});
});

module.exports = router;