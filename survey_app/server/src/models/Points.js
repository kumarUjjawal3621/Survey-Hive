const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  survey_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  },
  points_earned: {
    type: Number,
    required: true,
    min: 0
  },
  earned_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Points', pointsSchema); 