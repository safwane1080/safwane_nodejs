const db = require('../config/db');

const News = {
  create: (user_id, title, content, image_url) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO news (user_id, title, content, image_url) VALUES (?, ?, ?, ?)',
        [user_id, title, content, image_url],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
  getAll: (limit = 10, offset = 0, search = '') => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM news';
      const params = [];
      if (search) {
        query += ' WHERE title LIKE ?';
        params.push(`%${search}%`);
      }
      query += ' LIMIT ? OFFSET ?';
      params.push(Number(limit), Number(offset));

      db.query(query, params, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM news WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        if (results.length === 0) resolve(null);
        resolve(results[0]);
      });
    });
  },
  update: (id, title, content, image_url) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE news SET title = ?, content = ?, image_url = ? WHERE id = ?',
        [title, content, image_url, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM news WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },
};

module.exports = News;
