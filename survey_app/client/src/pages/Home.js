import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Survey App</h1>
        <p className="text-xl text-gray-600 mb-8">
          Create surveys, participate, and earn rewards
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home; 