require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const testDBConnection = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully!');

    // Test creating a user
    const testUser = new User({
      name: 'DB Test User',
      email: 'dbtest@example.com',
      password: 'testpass123',
      income_range: '20k-50k',
      location: 'Test City',
      job_type: 'Tester'
    });

    await testUser.save();
    console.log('Test user created successfully:', testUser);

    // Test fetching users
    const users = await User.find({});
    console.log('All users in database:', users);

    // Clean up test data
    await User.deleteOne({ email: 'dbtest@example.com' });
    console.log('Test user cleaned up');

  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

testDBConnection(); 