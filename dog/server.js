const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Serve all static files (HTML, CSS, JS, images, etc.) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

 
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});