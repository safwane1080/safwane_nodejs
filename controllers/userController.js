const userModel = require('../models/userModel');

const getUsers = (req, res) => {
  userModel.getAllUsers((err, result) => {
    if (err) {
      return res.status(500).send('Error retrieving users');
    }
    res.json(result);
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  userModel.getUserById(id, (err, result) => {
    if (err) {
      return res.status(500).send('Error retrieving user');
    }
    res.json(result);
  });
};

const createUser = (req, res) => {
  const user = req.body;
  userModel.createUser(user, (err, result) => {
    if (err) {
      return res.status(500).send('Error creating user');
    }
    res.status(201).send('User created');
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;
  userModel.updateUser(id, user, (err, result) => {
    if (err) {
      return res.status(500).send('Error updating user');
    }
    res.send('User updated');
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel.deleteUser(id, (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting user');
    }
    res.send('User deleted');
  });
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
