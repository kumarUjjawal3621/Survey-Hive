const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Points = require('../models/Points');
const User = require('../models/User');

// Get user points balance
router.get('/balance', auth, async (req, res) => {
  try {
    const points = await Points.find({ user_id: req.user._id });
    const totalPoints = points.reduce((sum, p) => sum + p.points_earned, 0);
    
    res.json({ points: totalPoints });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Redeem points
router.post('/redeem', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const points = await Points.find({ user_id: req.user._id });
    const totalPoints = points.reduce((sum, p) => sum + p.points_earned, 0);

    if (amount > totalPoints) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    // Create redemption record
    // Note: Implement actual payment processing here
    
    res.json({ message: 'Redemption successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 