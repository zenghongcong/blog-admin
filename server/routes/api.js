/**
 * @ 
 */
const articleController = require('../controllers/article.js');
const categoryController = require('../controllers/category.js');
const router = require('koa-router')();

router.post('/article', articleController.getArticle);
router.post('/article/list', articleController.getArticleList);
router.post('/category', categoryController.getCategory);
router.post('/category/list', categoryController.getCategoryList);

module.exports = router; // 把router规则暴露出去