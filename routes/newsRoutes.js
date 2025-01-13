const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/news', newsController.getNews);
router.get('/news/:id', newsController.getNewsById);
router.post('/news', newsController.createNews);
router.put('/news/:id', newsController.updateNews);
router.delete('/news/:id', newsController.deleteNews);

module.exports = router;
