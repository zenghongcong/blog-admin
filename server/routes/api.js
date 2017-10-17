/**
 * @ 
 */
const articleController = require('../controllers/article.js');
const categoryController = require('../controllers/category.js');
const router = require('koa-router')();

router.post('/article', articleController.getArticle);
router.post('/article/list', articleController.getArticleList);
router.post('/article/del', articleController.delArticle);
router.post('/article/upsert', articleController.upsertArticle);
router.post('/category', categoryController.getCategory);
router.post('/category/list', categoryController.getCategoryList);
router.post('/category/upsert', categoryController.upsertCategory);

module.exports = router; // 把router规则暴露出去