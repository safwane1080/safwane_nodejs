const db = require('../config/db');
const { validationResult } = require('express-validator');

// Create
exports.createNews = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { user_id, title, content, image_url } = req.body;
  db.query(
    'INSERT INTO news (user_id, title, content, image_url) VALUES (?, ?, ?, ?)',
    [user_id, title, content, image_url],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'News added successfully', id: result.insertId });
    }
  );
};

// Read all
exports.getAllNews = (req, res) => {
  const { limit, offset, search } = req.query;
  let query = 'SELECT * FROM news';
  const params = [];

  if (search) {
    query += ' WHERE title LIKE ?';
    params.push(`%${search}%`);
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(Number(limit) || 10, Number(offset) || 0);

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(200).json(results);
  });
};

// Read one
exports.getNewsById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM news WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'News not found' });
    res.status(200).json(results[0]);
  });
};

// Update
exports.updateNews = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const { title, content, image_url } = req.body;

  db.query(
    'UPDATE news SET title = ?, content = ?, image_url = ? WHERE id = ?',
    [title, content, image_url, id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(200).json({ message: 'News updated successfully' });
    }
  );
};

// Delete
exports.deleteNews = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM news WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(200).json({ message: 'News deleted successfully' });
  });
};
