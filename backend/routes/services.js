const express = require('express');
const router = express.Router();
const db = require('../db');

// 🚫 Prevent duplicate phone + Add secretKey
router.post('/add', (req, res) => {
  const { name, service, area, phone, secretKey } = req.body;

  // Check for existing phone
  db.get(`SELECT * FROM services WHERE phone = ?`, [phone], (err, row) => {
    if (err) return res.status(500).send(err.message);

    if (row) {
      return res.status(400).send("Phone number already exists.");
    }

    // Insert new service
    db.run(
      `INSERT INTO services (name, service, area, phone, secretKey) VALUES (?, ?, ?, ?, ?)`,
      [name, service, area, phone, secretKey],
      function (err) {
        if (err) return res.status(500).send(err.message);
        res.send({ success: true, id: this.lastID });
      }
    );
  });
});

// 🔍 Search services
router.get('/search', (req, res) => {
  const { area = '', service = '', name = '' } = req.query;

  const query = `
    SELECT id, name, service, area, phone, rating, rating_count FROM services
    WHERE area LIKE ? AND service LIKE ? AND name LIKE ?
  `;

  db.all(query, [`%${area}%`, `%${service}%`, `%${name}%`], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
});

// ⭐ Rate a service
router.post('/rate/:id', (req, res) => {
  const id = req.params.id;
  const { rating } = req.body;

  db.get(`SELECT rating, rating_count FROM services WHERE id = ?`, [id], (err, row) => {
    if (err || !row) return res.status(404).send('Not found');

    const newCount = row.rating_count + 1;
    const newRating = ((row.rating * row.rating_count) + rating) / newCount;

    db.run(`UPDATE services SET rating = ?, rating_count = ? WHERE id = ?`,
      [newRating, newCount, id],
      (err) => {
        if (err) return res.status(500).send(err.message);
        res.send({ success: true });
      });
  });
});

// 🗑️ Delete by phone + secretKey
router.delete('/delete', (req, res) => {
  const { phone, secretKey } = req.body;

  db.get(`SELECT * FROM services WHERE phone = ? AND secretKey = ?`, [phone, secretKey], (err, row) => {
    if (err) return res.status(500).send(err.message);

    if (!row) {
      return res.status(404).send("Service not found or wrong secret key.");
    }

    db.run(`DELETE FROM services WHERE phone = ? AND secretKey = ?`, [phone, secretKey], (err) => {
      if (err) return res.status(500).send(err.message);
      res.send({ success: true, message: "Service deleted successfully." });
    });
  });
});

module.exports = router;
