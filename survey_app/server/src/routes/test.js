const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Test route to create a sample user
router.post('/test-user', async (req, res) => {
  try {
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      income_range: '20k-50k',
      location: 'Test Location',
      job_type: 'Test Job'
    });

    await testUser.save();
    res.status(201).json({ message: 'Test user created successfully', user: testUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Test route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 