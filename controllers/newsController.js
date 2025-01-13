const newsModel = require('../models/newsModel');

const getNews = (req, res) => {
  newsModel.getAllNews((err, result) => {
    if (err) {
      return res.status(500).send('Error retrieving news');
    }
    res.json(result);
  });
};

const getNewsById = (req, res) => {
  const { id } = req.params;
  newsModel.getNewsById(id, (err, result) => {
    if (err) {
      return res.status(500).send('Error retrieving news item');
    }
    res.json(result);
  });
};

const createNews = (req, res) => {
  const news = req.body;
  newsModel.createNews(news, (err, result) => {
    if (err) {
      return res.status(500).send('Error creating news item');
    }
    res.status(201).send('News item created');
  });
};

const updateNews = (req, res) => {
  const { id } = req.params;
  const news = req.body;
  newsModel.updateNews(id, news, (err, result) => {
    if (err) {
      return res.status(500).send('Error updating news item');
    }
    res.send('News item updated');
  });
};

const deleteNews = (req, res) => {
  const { id } = req.params;
  newsModel.deleteNews(id, (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting news item');
    }
    res.send('News item deleted');
  });
};

module.exports = { getNews, getNewsById, createNews, updateNews, deleteNews };
