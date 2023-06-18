const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

router.get('/', articleController.getArtcles);
router.post('/add', articleController.addArticle);

module.exports = router