const express = require('express');
const cors = require('cors');
const app = express();
const servicesRoute = require('./routes/services');

app.use(cors());
app.use(express.json());
app.use('/api/services', servicesRoute);

app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
