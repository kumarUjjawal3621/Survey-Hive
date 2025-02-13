const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Survey = require('../models/Survey');
const Question = require('../models/Question');
const Response = require('../models/Response');
const Points = require('../models/Points');
const QRCode = require('qrcode');

// Create a new survey
router.post('/create', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      questions,
      participant_criteria,
      point_value,
      participant_limit,
      tags // Now tags will be provided in the request
    } = req.body;

    // Create survey
    const survey = new Survey({
      host_id: req.user._id,
      title,
      description,
      tags: tags || ['survey'], // Default tag if none provided
      point_value,
      participant_limit,
      participant_criteria
    });

    await survey.save();

    // Create questions
    const questionPromises = questions.map(q => {
      const question = new Question({
        survey_id: survey._id,
        question_text: q.text,
        question_type: q.type,
        options: q.options
      });
      return question.save();
    });

    await Promise.all(questionPromises);

    // Generate QR code
    const qrCode = await QRCode.toDataURL(`${process.env.CLIENT_URL}/surveys/${survey._id}`);
    survey.qr_code = qrCode;
    await survey.save();

    res.status(201).json({ survey, qrCode });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get relevant surveys for a user
router.get('/relevant', auth, async (req, res) => {
  try {
    const { income_range, location, job_type } = req.user;
    
    const surveys = await Survey.find({
      status: 'active',
      'participant_criteria.income_range': income_range,
      'participant_criteria.location': location,
      'participant_criteria.job_type': job_type
    }).populate('host_id', 'name email');

    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit survey response
router.post('/:surveyId/respond', auth, async (req, res) => {
  try {
    const { answers } = req.body;
    const survey = await Survey.findById(req.params.surveyId);

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    // Check if user already completed this survey
    const existingResponse = await Response.findOne({
      survey_id: survey._id,
      user_id: req.user._id
    });

    if (existingResponse) {
      return res.status(400).json({ error: 'You have already completed this survey' });
    }

    // Create response
    const response = new Response({
      survey_id: survey._id,
      user_id: req.user._id,
      answers
    });

    await response.save();

    // Award points
    const points = new Points({
      user_id: req.user._id,
      survey_id: survey._id,
      points_earned: survey.point_value
    });

    await points.save();

    res.status(201).json({ response, points });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get survey responses (for host)
router.get('/:surveyId/responses', auth, async (req, res) => {
  try {
    const survey = await Survey.findOne({
      _id: req.params.surveyId,
      host_id: req.user._id
    });

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    const responses = await Response.find({ survey_id: survey._id })
      .populate('user_id', 'name email')
      .populate('answers.question_id');

    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 