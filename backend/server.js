require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const servicesRoute = require('./routes/services');

app.use(cors());
app.use(express.json());
app.use('/api/services', servicesRoute);

app.delete("/api/admin/clear-db", async (req, res) => {
  try {
    await db.run("DELETE FROM services");
    await db.run("DELETE FROM ratings");
    res.send("✅ Database cleared successfully");
  } catch (error) {
    console.error("❌ Error clearing DB:", error.message);
    res.status(500).send("Error clearing database");
  }
});


app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));