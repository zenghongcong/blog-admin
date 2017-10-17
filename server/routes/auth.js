const userController = require('../controllers/user.js');
const router = require('koa-router')();

router.post('/user', userController.getUserInfo);
router.post('/user/login', userController.postUserAuth);
router.post('/user/list', userController.getUserList);
router.post('/user/upsert', userController.upsertUser);
router.post('/user/del', userController.delUser);

module.exports = router;