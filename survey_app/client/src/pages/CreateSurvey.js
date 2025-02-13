import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateSurvey() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    point_value: 0,
    participant_limit: 0,
    participant_criteria: {
      income_range: [],
      location: [],
      job_type: []
    },
    questions: [
      { text: '', type: 'MCQ', options: [''] }
    ],
    tags: []
  });

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { text: '', type: 'MCQ', options: [''] }]
    });
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setFormData({ ...formData, questions: newQuestions });
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options.push('');
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/surveys/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create survey');
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating survey:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Survey</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Points Value</label>
          <input
            type="number"
            value={formData.point_value}
            onChange={(e) => setFormData({ ...formData, point_value: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Participant Limit</label>
          <input
            type="number"
            value={formData.participant_limit}
            onChange={(e) => setFormData({ ...formData, participant_limit: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            min="1"
            required
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Questions</h3>
          {formData.questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-6 p-4 border rounded">
              <input
                type="text"
                value={question.text}
                onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                placeholder="Question text"
                className="w-full p-2 border rounded mb-2"
                required
              />
              <select
                value={question.type}
                onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="MCQ">Multiple Choice</option>
                <option value="Text">Text</option>
                <option value="Rating">Rating</option>
              </select>
              {question.type === 'MCQ' && (
                <div className="ml-4">
                  {question.options.map((option, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      placeholder={`Option ${oIndex + 1}`}
                      className="w-full p-2 border rounded mb-2"
                      required
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(qIndex)}
                    className="text-blue-500 hover:underline"
                  >
                    Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Add Question
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Create Survey
        </button>
      </form>
    </div>
  );
}

export default CreateSurvey; 