const express = require('express')
const ArticleRoute = require('../controller/ArticleController')

const router = express.Router()

router.get('/articles', ArticleRoute.getArticles);
router.post('/post-article', ArticleRoute.addArticle);

module.exports = router;