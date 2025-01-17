const db = require('../config/db');
const { validationResult } = require('express-validator');

exports.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { first_name, last_name, email, password } = req.body;
  db.query(
    'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
    [first_name, last_name, email, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'User created successfully', id: result.insertId });
    }
  );
};

exports.getUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(200).json(results);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(results[0]);
  });
};

exports.updateUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const { first_name, last_name, email, password } = req.body;

  db.query(
    'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?',
    [first_name, last_name, email, password, id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(200).json({ message: 'User updated successfully' });
    }
  );
};

// Delete
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(200).json({ message: 'User deleted successfully' });
  });
};
