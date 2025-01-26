const express = require('express');
const { updateUsername, updateEmail, updatePassword, updateProfilePicture, details } = require('../controllers/accountController');
const upload = require('../middleware/multer'); // Multer setup for profile picture upload

const router = express.Router();

router.get('/fetchDetails/:userId', details);
router.put('/username', updateUsername);
router.put('/email', updateEmail);
router.put('/password', updatePassword);
router.put('/profile-picture', upload, updateProfilePicture); 

module.exports = router;
