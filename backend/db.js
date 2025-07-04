// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'services.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ DB connection failed:', err.message);
  } else {
    console.log('✅ Connected to SQLite DB');

    // Create table if not exists
    db.run(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        service TEXT,
        area TEXT,
        phone TEXT UNIQUE,
        rating REAL DEFAULT 0,
        rating_count INTEGER DEFAULT 0
      )
    `);

    // 👇 Add secretKey column if it doesn't exist
    db.all(`PRAGMA table_info(services);`, (err, columns) => {
      const hasSecretKey = columns.some(col => col.name === 'secretKey');
      if (!hasSecretKey) {
        db.run(`ALTER TABLE services ADD COLUMN secretKey TEXT`, (err) => {
          if (err) console.error("❌ Failed to add secretKey:", err.message);
          else console.log("✅ secretKey column added");
        });
      }
    });
  }
});

module.exports = db;
