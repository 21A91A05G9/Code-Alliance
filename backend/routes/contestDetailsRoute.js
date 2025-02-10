const express = require('express');
const fetchContestDetails = require('../controllers/contestDetailsController');

const router = express.Router();

// Route to validate the username on different platforms
router.post('/fetch-contests', fetchContestDetails);


module.exports = router;