const express = require('express');
const db = require('./knex')
const PORT = 3007;

const app = express();

app.get('/api/example_resources', async (req, res) => {
  try {
    const rows = await db('example_resources').select('id', 'name', 'image', 'species', 'is_done');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
