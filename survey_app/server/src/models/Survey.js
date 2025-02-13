const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  host_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  point_value: {
    type: Number,
    required: true,
    min: 0
  },
  participant_limit: {
    type: Number,
    required: true,
    min: 1
  },
  participant_criteria: {
    income_range: {
      type: [String],
      required: true
    },
    location: {
      type: [String],
      required: true
    },
    job_type: {
      type: [String],
      required: true
    }
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  qr_code: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Survey', surveySchema); 