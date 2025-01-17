const db = require('../config/db');

const User = {
  create: (first_name, last_name, email, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
        [first_name, last_name, email, password],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        if (results.length === 0) resolve(null);
        resolve(results[0]);
      });
    });
  },
  update: (id, first_name, last_name, email, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?',
        [first_name, last_name, email, password, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },
};

module.exports = User;
