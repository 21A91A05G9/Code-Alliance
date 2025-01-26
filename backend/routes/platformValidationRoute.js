const express = require('express');
const validateUsername = require('../controllers/platformValidationController');

const router = express.Router();

// Route to validate the username on different platforms
router.post('/validate-username', validateUsername);

module.exports = router;
