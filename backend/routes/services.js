const express = require('express');
const router = express.Router();
const supabase = require('../db');

// ➕ Add a new service
router.post('/add', async (req, res) => {
  const { name, service, area, phone, secretKey } = req.body;

  if (!name || !service || !area || !phone || !secretKey) {
    return res.status(400).send('All fields are required.');
  }

  // Check for duplicate phone
  const { data: existing, error: findErr } = await supabase
    .from('services')
    .select('*')
    .eq('phone', phone);

  if (findErr) return res.status(500).send(findErr.message);
  if (existing.length > 0) return res.status(409).send('Phone number already exists.');

  const { data, error } = await supabase
    .from('services')
    .insert([{ name, service, area, phone, secretKey, rating: 0, rating_count: 0 }]);

  if (error) return res.status(500).send(error.message);
  res.send({ success: true, id: data[0].id });
});

// 🔍 Search services
router.get('/search', async (req, res) => {
  const { area = '', service = '' } = req.query;

  if (!area && !service) return res.status(400).send('At least one search field is required.');

  let query = supabase.from('services').select('*');

  if (area) query = query.ilike('area', `%${area}%`);
  if (service) query = query.ilike('service', `%${service}%`);

  const { data, error } = await query;

  if (error) return res.status(500).send(error.message);
  res.send(data);
});

// ⭐ Rate a service provider
router.post('/rate/:id', async (req, res) => {
  const id = req.params.id;
  const { rating } = req.body;

  const { data: existing, error: findErr } = await supabase
    .from('services')
    .select('rating, rating_count')
    .eq('id', id)
    .single();

  if (findErr || !existing) return res.status(404).send('Service not found.');

  const newCount = existing.rating_count + 1;
  const newRating = ((existing.rating * existing.rating_count) + rating) / newCount;

  const { error } = await supabase
    .from('services')
    .update({ rating: newRating, rating_count: newCount })
    .eq('id', id);

  if (error) return res.status(500).send(error.message);
  res.send({ success: true });
});

// ❌ Delete a service using secret key
router.post('/delete', async (req, res) => {
  const { phone, secretKey } = req.body;

  if (!phone || !secretKey) return res.status(400).send('Phone and secret key required.');

  const { data, error } = await supabase
    .from('services')
    .delete()
    .eq('phone', phone)
    .eq('secretKey', secretKey);

  if (error) return res.status(500).send(error.message);
  if (data.length === 0) return res.status(404).send('No matching record found.');
  res.send({ success: true });
});

module.exports = router;
