// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/27017")
//mongoose.connect("mongodb+srv://sebastiananand123:Perni%40123@yeswanth.ezcwxpu.mongodb.net/structures_collection?retryWrites=true&w=majority&appName=Yeswanth")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Define the schema
const structureSchema = new mongoose.Schema({
  structure_id: String,
  structure_type: String,
  user_id: String,
  tags: [String]
});

// Define the model
const Structure = mongoose.model('Structure', structureSchema);

// Define the route to handle search queries
app.get('/structures', async (req, res) => {
  const query = req.query.q;
  try {
    // Search for documents that match the query
    const structures = await Structure.find({
      $or: [
        { structure_id: query },
        { structure_type: query },
        { user_id: query },
        { tags: query }
      ]
    });
    res.json(structures);
  } catch (error) {
    console.error('Error searching structures:', error);
    res.status(500).json({ error: 'An error occurred while searching structures' });
  }
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
