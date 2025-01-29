// Import required modules
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// Load environment variables from data.env file
dotenv.config({ path: './data.env' });

// Initialize the app
const app = express();

// Port number (You can change this if 5000 is in use)
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI is not defined. Check your .env file.');
  process.exit(1);  // Exit the process if MONGO_URI is not defined
}

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);  // Exit if MongoDB connection fails
  });

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
