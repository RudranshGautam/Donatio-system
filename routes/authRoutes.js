const express = require('express');
const router = express.Router();
const { signupUser, signupCharity,loginUser, loginCharity } = require('../controllers/authController'); // Import controller methods

// POST route to register an individual user
router.post('/signup', signupUser);

// POST route to register a charity organization
router.post('/charity-signup', signupCharity);
router.post('/login-user', loginUser); // Individual user login
router.post('/login-charity', loginCharity);
module.exports = router;
