# Survey Application

A full-stack application for creating and participating in surveys.

## Features

- User authentication
- Survey creation and management
- Survey participation
- Points system
- QR code generation for surveys

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```
3. Set up environment variables:
   - Create `.env` in server directory
   - Create `.env.development` and `.env.production` in client directory

4. Start development servers:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Deployment Checklist

- [ ] Set up environment variables
- [ ] Build frontend
- [ ] Test production build
- [ ] Configure database backups
- [ ] Set up monitoring
- [ ] Configure CORS for production
- [ ] Enable HTTPS
- [ ] Set up error logging 