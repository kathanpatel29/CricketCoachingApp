# Cricket Coaching System

## Overview

The Cricket Coaching System is a full-stack web application designed to connect cricket enthusiasts with professional coaches. It provides a platform for scheduling coaching sessions, managing appointments, and facilitating payments.

## Features

- User authentication and authorization
- Coach profiles and availability management
- Appointment scheduling and management
- Review system for coaches
- Admin dashboard for system management
- Secure payment integration using Stripe

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Stripe for payment processing

### Frontend
- React.js
- Vite as the build tool
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling
- React Hot Toast for notifications

## Project Structure
cricket-coaching-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
└── README.md


## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Stripe account for payment processing

### Installation

1. Clone the repository:

git clone https://github.com/your-username/cricket-coaching-system.git
cd cricket-coaching-system

2. Install backend dependencies:

 cd backend
 npm install

3. Install frontend dependencies:

cd ../frontend
npm install


4. Set up environment variables:
Create a `.env` file in the `backend` directory with the following variables:

 PORT=5000
 MONGODB_URI=your_mongodb_connection_string
 JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key


### Running the Application

1. Start the backend server:
   cd backend
   npm run dev
   
2. In a new terminal, start the frontend development server:
   cd frontend
   npm run dev


3. Open your browser and navigate to `http://localhost:5173` to access the application.

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/coaches` - Coach management routes
- `/api/appointments` - Appointment management routes
- `/api/reviews` - Review management routes
- `/api/admin` - Admin management routes
- `/api/payments` - Payment processing routes
