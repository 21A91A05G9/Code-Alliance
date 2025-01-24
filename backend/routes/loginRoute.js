const express = require('express');
const { loginUser } = require('../controllers/loginController');
const router = express.Router();

// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;
