const Database = require('better-sqlite3');
const path = require('path');

let db;

try {
    // Creates (or opens) a file called data.db in your project root
    db = new Database(path.join(__dirname, 'data.db'));
    console.log('✓ Database file opened');

    // Enable WAL mode for better performance
    //db.pragma();
    db.pragma('journal_mode = persist');
    //console.log('✓ WAL mode enabled');

    // Create your table(s) on startup
    db.exec(`
        CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            totalpeeps INTEGER,
            excitingness INTEGER,
            behaviour INTEGER,
            pulling INTEGER,
            reactive INTEGER,
            datetime DATETIME,
            length DATETIME,
            notes TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log('✓ Table created/verified');

} catch (err) {
    console.error('✗ Database initialization error:', err.message);
    console.error('Error code:', err.code);
    process.exit(1);
}

module.exports = db;

//process.on('SIGINT', () => {
//    console.log('Closing database connection...');
//    try {
 //       db.close();
//        console.log('Database closed');
//    } catch (err) {
//        console.error('Error closing database:', err.message);
//    }
//});