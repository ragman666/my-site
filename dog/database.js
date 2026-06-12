const Database = require('better-sqlite3');
const path = require('path');
 
// Creates (or opens) a file called data.db in your project root
const db = new Database(path.join(__dirname, 'data.db'));

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create your table(s) on startup
db.exec(`
    CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        totalpeeps INTEGER,
        behaviour INTEGER,
        pulling INTEGER,
        reactive INTEGER,
        datetime DATETIME,
        length DATETIME,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
);

module.exports = db;

process.on('SIGINT', () => {
    db.close();
});