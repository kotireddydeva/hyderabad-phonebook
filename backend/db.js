const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./services.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    service TEXT,
    area TEXT,
    phone TEXT,
    rating REAL DEFAULT 0,
    rating_count INTEGER DEFAULT 0
  )`);
});

module.exports = db;
