const API_URL = process.env.REACT_APP_API_URL;

export const api = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },
  // Add other API calls here
}; 