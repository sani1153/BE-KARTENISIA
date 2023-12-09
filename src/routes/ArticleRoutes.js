const express = require('express')
const ArticleRoute = require('../controller/ArticleController')

const router = express.Router()

router.get('/articles', ArticleRoute.getArticles);
router.post('/post-article', ArticleRoute.addArticle);
router.get('/articles/search', ArticleRoute.getArticlesByTittle)

module.exports = router;