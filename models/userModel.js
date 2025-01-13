const db = require('../config/db');

const getAllUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

const getUserById = (id, callback) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], callback);
};

const createUser = (user, callback) => {
  db.query('INSERT INTO users SET ?', user, callback);
};

const updateUser = (id, user, callback) => {
  db.query('UPDATE users SET ? WHERE id = ?', [user, id], callback);
};

const deleteUser = (id, callback) => {
  db.query('DELETE FROM users WHERE id = ?', [id], callback);
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
