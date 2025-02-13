const express = require("express");
const { updateProfile } = require("../controllers/userController");

const router = express.Router();

// Route to update user profile
router.put("/update-profile", updateProfile);

module.exports = router;
