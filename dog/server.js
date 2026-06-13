const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 3001;

// Verify database connection on startup
try {
    const result = db.prepare('SELECT 1').get();
    console.log('✓ Database connection established');
} catch (err) {
    console.error('✗ Database connection failed:', err.message);
    process.exit(1);
}

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST - Save a new entry
app.post('/api/entries', (req, res) => {
    try {
        const { name, totalpeeps, excitingness, behaviour, pulling, reactive, datetime, length, notes } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const stmt = db.prepare(
            'INSERT INTO entries (name, totalpeeps, excitingness, behaviour, pulling, reactive, datetime, length, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );        

        const result = stmt.run(name, totalpeeps, excitingness, behaviour, pulling, reactive, datetime, length, notes);

        res.status(201).json({
            success: true,
            id: result.lastInsertRowid
        });

    } catch (err) {
        console.error('DB insert error:', err.message);
        res.status(500).json({ error: 'Failed to save entry' });
    }
});

// GET - Retrieve all entries
app.get('/api/entries', (req, res) => {
    try {
        const entries = db.prepare('SELECT * FROM entries ORDER BY created_at DESC LIMIT 5').all();
        res.json(entries);
    } catch (err) {
        console.error('DB read error:', err.message);
        res.status(500).json({ error: 'Failed to retrieve entries' });
    }
});

// GET - Retrieve a single entry by ID
app.get('/api/entries/:id', (req, res) => {
    try {
        const entry = db.prepare('SELECT * FROM entries WHERE id = ?').get(req.params.id);
        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        res.json(entry);
    } catch (err) {
        console.error('DB read error:', err.message);
        res.status(500).json({ error: 'Failed to retrieve entry' });
    }
});

// DELETE - Remove an entry
app.delete('/api/entries/:id', (req, res) => {
    try {
        const result = db.prepare('DELETE FROM entries WHERE id = ?').run(req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        
        res.json({ success: true });
        
    } catch (err) {
        console.error('DB delete error:', err.message);
        res.status(500).json({ error: 'Failed to delete entry' });
    }
});


// Serve all static files (HTML, CSS, JS, images, etc.) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
 
const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down gracefully...');
    db.close();
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

