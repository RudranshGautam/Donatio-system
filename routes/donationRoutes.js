const express = require('express');
const { initiateDonation, captureDonation } = require('../controllers/donationController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/donate/initiate', authenticateToken, initiateDonation);
router.post('/donate/capture', authenticateToken, captureDonation);

module.exports = router;
