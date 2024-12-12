// controllers/campaignController.js
const Campaign = require('../models/campaign');
const User = require('../models/user');

// Create a campaign (only for organizations)
const createCampaign = async (req, res) => {
    try {
        const { name, description, target_amount } = req.body;
        const organizationId = req.user.id;;
        
        console.log('Received data:', name, description, target_amount, organizationId);
        // Create a new campaign record in the database
        const newCampaign = await Campaign.create({
            name,
            description,
            target_amount,
            organization_id: organizationId,
        });

        res.status(201).json({
            message: 'Campaign created successfully',
            campaignId: newCampaign.id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating campaign', error: err.message });
    }
};

// Get all campaigns (for users to see)
const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.findAll();
        console.log('Fetched campaigns:', campaigns);
        res.status(200).json(campaigns);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching campaigns', error: err.message });
    }
};

module.exports = { createCampaign, getAllCampaigns };
