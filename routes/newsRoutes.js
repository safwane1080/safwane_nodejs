const express = require('express');
const { body } = require('express-validator');
const newsController = require('../controllers/newsController');

const router = express.Router();

router.post('/news', [
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
], newsController.createNews);

router.get('/news', newsController.getAllNews);
router.get('/news/:id', newsController.getNewsById);
router.put('/news/:id', [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
], newsController.updateNews);
router.delete('/news/:id', newsController.deleteNews);

module.exports = router;
