const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the frontend's public directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

// API endpoint to fetch quiz data
app.get('/api/quiz', (req, res) => {
  try {
    // Read the mock quiz data from the JSON file
    const quizData = JSON.parse(fs.readFileSync(path.join(__dirname, 'quiz-data.json'), 'utf-8'));
    res.json(quizData);
  } catch (error) {
    console.error('Error reading quiz data:', error);
    res.status(500).json({ error: 'Failed to load quiz data' });
  }
});

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});