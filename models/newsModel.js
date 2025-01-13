const db = require('../config/db');

const getAllNews = (callback) => {
  db.query('SELECT * FROM news', callback);
};

const getNewsById = (id, callback) => {
  db.query('SELECT * FROM news WHERE id = ?', [id], callback);
};

const createNews = (news, callback) => {
  db.query('INSERT INTO news SET ?', news, callback);
};

const updateNews = (id, news, callback) => {
  db.query('UPDATE news SET ? WHERE id = ?', [news, id], callback);
};

const deleteNews = (id, callback) => {
  db.query('DELETE FROM news WHERE id = ?', [id], callback);
};

module.exports = { getAllNews, getNewsById, createNews, updateNews, deleteNews };
