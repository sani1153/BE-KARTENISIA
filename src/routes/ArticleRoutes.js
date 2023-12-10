const express = require('express')
const ArticleRoute = require('../controller/ArticleController')

const router = express.Router()

router.get('/articles', ArticleRoute.getArticles);
router.post('/post-article', ArticleRoute.addArticle);
router.get('/articles/search', ArticleRoute.getArticlesByTittle)
router.get('/article', ArticleRoute.getArticlesById)

module.exports = router;