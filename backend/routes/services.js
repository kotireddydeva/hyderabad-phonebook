const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new service person
router.post('/add', (req, res) => {
  const { name, service, area, phone } = req.body;
  db.run(
    `INSERT INTO services (name, service, area, phone) VALUES (?, ?, ?, ?)`,
    [name, service, area, phone],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send({ success: true, id: this.lastID });
    }
  );
});

// Search services by area
router.get('/search', (req, res) => {
  const { area = '', service = '', name = '' } = req.query;

  const query = `
    SELECT * FROM services
    WHERE area LIKE ?
      AND service LIKE ?
      AND name LIKE ?
  `;

  db.all(query, [`%${area}%`, `%${service}%`, `%${name}%`], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
});


// Rate a service person
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

module.exports = router;
