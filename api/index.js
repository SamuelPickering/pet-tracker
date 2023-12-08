const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./knex')
const PORT = 3007;

const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

app.get('/api/example_resources', async (req, res) => {
  try {
    const rows = await db('example_resources').select('id', 'name', 'image', 'species', 'is_done');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/add_pet', async (req, res) => {
  try {
    const { name, image, species, isFriendly } = req.body;

    
    const insertedPet = await db('example_resources').insert({
      name,
      image,
      species,
      is_done: isFriendly, 
    });

    res.json({ success: true, pet: insertedPet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/api/delete_pet/:id', async (req, res) => {
  try {
    const { id } = req.params;


    await db.raw('DELETE FROM example_resources WHERE id = ?', [id]);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
