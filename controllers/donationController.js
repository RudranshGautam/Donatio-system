const Razorpay = require('razorpay');
const Donation = require('../models/donation');
const Campaign = require('../models/campaign');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Initialize donation process
const initiateDonation = async (req, res) => {
    try {
        const { campaign_id, amount } = req.body;

        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${campaign_id}_${Date.now()}`
        });

        res.status(200).json({
            order_id: order.id,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error('Error initiating donation:', error);
        res.status(500).json({ message: 'Failed to initiate donation' });
    }
};

// Capture donation
const captureDonation = async (req, res) => {
    try {
        const { payment_id, order_id, campaign_id, amount } = req.body;
        const userId = req.user.id;

        // Verify payment
        await razorpay.payments.fetch(payment_id);

        // Save donation details in the database
        const newDonation = await Donation.create({
            user_id: userId,
            campaign_id,
            amount,
        });

        // Update campaign raised amount
        const campaign = await Campaign.findByPk(campaign_id);
        campaign.raised_amount += amount;
        await campaign.save();

        res.status(200).json({ message: 'Donation successful', donationId: newDonation.id });
    } catch (error) {
        console.error('Error capturing donation:', error);
        res.status(500).json({ message: 'Failed to capture donation' });
    }
};

module.exports = { initiateDonation, captureDonation };
