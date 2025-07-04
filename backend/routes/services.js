const express = require('express');
const router = express.Router();
const supabase = require('../supabase-db');

// ➕ Add a new service person
router.post('/add', async (req, res) => {
  const { name, service, area, phone, secretKey } = req.body;

  if (!name || !service || !area || !phone || !secretKey) {
    return res.status(400).send('All fields are required');
  }

  // Check for duplicate phone number
  const { data: existing, error: checkError } = await supabase
    .from('services')
    .select('*')
    .eq('phone', phone);

  if (checkError) return res.status(500).send(checkError.message);
  if (existing.length > 0) return res.status(409).send('Phone number already exists');

  // Insert new record
  const { error: insertError, data } = await supabase
    .from('services')
    .insert([{ name, service, area, phone, secretKey, rating: 0, rating_count: 0 }]);

  if (insertError) return res.status(500).send(insertError.message);
  res.send({ success: true, id: data[0].id });
});

// 🔍 Search services (area and service only)
router.get('/search', async (req, res) => {
  const { area = '', service = '' } = req.query;

  if (!area && !service) return res.status(400).send('Please provide area or service');

  let query = supabase.from('services').select('*');
  if (area) query = query.ilike('area', `%${area}%`);
  if (service) query = query.ilike('service', `%${service}%`);

  const { data, error } = await query;

  if (error) return res.status(500).send(error.message);
  res.send(data);
});

// ⭐ Rate a service person
router.post('/rate/:id', async (req, res) => {
  const { rating } = req.body;
  const id = req.params.id;

  const { data: existing, error: findError } = await supabase
    .from('services')
    .select('rating, rating_count')
    .eq('id', id)
    .single();

  if (findError || !existing) return res.status(404).send('Service not found');

  const newCount = existing.rating_count + 1;
  const newRating = ((existing.rating * existing.rating_count) + rating) / newCount;

  const { error } = await supabase
    .from('services')
    .update({ rating: newRating, rating_count: newCount })
    .eq('id', id);

  if (error) return res.status(500).send(error.message);
  res.send({ success: true });
});

// ❌ Delete a service by phone + secret key
router.post('/delete', async (req, res) => {
  const { phone, secretKey } = req.body;

  const { data, error } = await supabase
    .from('services')
    .delete()
    .eq('phone', phone)
    .eq('secretKey', secretKey);

  if (error) return res.status(500).send(error.message);
  if (data.length === 0) return res.status(404).send('No matching record');
  res.send({ success: true });
});

module.exports = router;
