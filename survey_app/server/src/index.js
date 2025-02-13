const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const config = require('./config/config');

// Add this to check if environment variables are loaded
console.log('Environment check:', {
  port: config.port,
  mongodbUri: config.mongodbUri ? 'Set' : 'Not set',
  jwtSecret: config.jwtSecret ? 'Set' : 'Not set',
  clientUrl: config.clientUrl
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test');
const surveyRoutes = require('./routes/surveys');
const rewardRoutes = require('./routes/rewards');

// Basic test route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Survey App API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/rewards', rewardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Start server and connect to database
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start server
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer().catch(err => {
  console.error('Startup error:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
}); 