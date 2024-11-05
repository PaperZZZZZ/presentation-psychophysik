const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (your HTML, CSS, and JS files)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to handle submissions
app.post('/api/submit', (req, res) => {
    const data = req.body;

    // Load existing submissions
    const filePath = path.join(__dirname, 'submissions.json');
    let submissions = [];

    try {
        // Read existing data from the JSON file
        const fileData = fs.readFileSync(filePath, 'utf8');
        submissions = JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading submissions.json:', error);
    }

    // Add the new submission
    submissions.push(data);

    // Save the updated submissions back to the JSON file
    try {
        fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
        res.status(200).json({ message: 'Submission saved successfully!' });
    } catch (error) {
        console.error('Error writing to submissions.json:', error);
        res.status(500).json({ message: 'Error saving submission' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
