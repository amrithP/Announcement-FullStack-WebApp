const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let announcements = [];

app.use(cors());
app.use(bodyParser.json());

// Get all messages
app.get('/announcements', (req, res) => {
    res.json(announcements); // now returns message + date
});

// Save new message
app.post('/announcements', (req, res) => {
    const { message, date } = req.body;
    if (message) {
        announcements.push({ message, date });
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, error: "Empty message" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
