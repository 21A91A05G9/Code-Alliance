require('dotenv').config(); // Ensure environment variables are loaded
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the function from db.js
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');

const app = express();

// Middleware
app.use(express.json());

// Enable CORS (allow requests from your frontend domain)
app.use(cors({
    origin: 'http://localhost:8081', // Allow requests from this frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  }));

// Routes
app.use('/api/auth', registerRoute);
app.use('/api/auth', loginRoute);

// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
