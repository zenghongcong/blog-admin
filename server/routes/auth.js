const userController = require('../controllers/user.js');
const router = require('koa-router')();

router.post('/user', userController.getUserInfo);
router.post('/user/login', userController.postUserAuth);
router.post('/user/list', userController.getUserList);

module.exports = router;