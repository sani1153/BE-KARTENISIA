const express = require('express')
const ArticleRoute = require('../controller/ArticleController')

const router = express.Router()

// POST ARTICLE
router.post('/post-article', ArticleRoute.addArticle);
// GET ALL ARTICLE/GET ARTICLE BY CATEGORY
router.get('/articles', ArticleRoute.getArticles);
// GET ARTICLE BY TITLE
router.get('/articles/search', ArticleRoute.getArticlesByTitle)
// GET ARTICLE BY ID
router.get('/article/:id', ArticleRoute.getArticlesById)
// GET ARTICLE BY DATE
router.get('/articles/date', ArticleRoute.getArticlesByDate)
// GET ARTICLE BY DATE AND CATEGORY
router.get('/articles/date&category', ArticleRoute.getArticlesByDateAndCategory)
// GET ALL ARTICLE BY RANDOM ID LIMIT
router.get('/articles/random/limit3', ArticleRoute.getAllRandomArticlesLimit3)
router.get('/articles/random/limit9', ArticleRoute.getAllRandomArticlesLimit9)
// GET ALL ARTICLE BY RANDOM ID
router.get('/articles/random', ArticleRoute.getAllRandomArticles)

module.exports = router;