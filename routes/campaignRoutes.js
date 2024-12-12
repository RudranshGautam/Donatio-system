// routes/campaignRoutes.js

const express = require('express');
const { createCampaign, getAllCampaigns } = require('../controllers/campaignController');
const { authenticateToken, authorizeOrganization } = require('../middlewares/authMiddleware'); // Middleware for authentication and authorization
const router = express.Router();

// Route to create a campaign (only accessible by organizations)
router.post('/create', authenticateToken, authorizeOrganization, createCampaign);

// Route to get all campaigns (accessible by users)
router.get('/campaigns', authenticateToken, getAllCampaigns);

module.exports = router;
