import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [userSurveys, setUserSurveys] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Fetch user's points
    const fetchPoints = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rewards/balance', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setPoints(data.points);
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchPoints();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded">
            Points: {points}
          </span>
          <Link
            to="/create-survey"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Survey
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Surveys</h2>
          <Link
            to="/my-surveys"
            className="text-blue-500 hover:underline"
          >
            View All Surveys
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Available Surveys</h2>
          <Link
            to="/available-surveys"
            className="text-blue-500 hover:underline"
          >
            Browse Surveys
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 