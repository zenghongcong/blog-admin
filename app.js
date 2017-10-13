/**
 * @ author  zenghongcong
 * @ date    2017-10-13 14:47
 * @ desc    启动文件
 */

const path = require('path'),
	koa = new (require('koa'))(),
	koaRouter = require('koa-router')(),
	logger = require('koa-logger'),
  	auth = require('./server/routes/auth.js'),
  	api = require('./server/routes/api.js');
  	

koa.use(require('koa-bodyparser')());
koa.use(logger());

koa.use(async (ctx, next) => {
	let start = new Date();
  	await next();
  	let ms = new Date - start;
  	console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

koa.on('error', function(err, ctx) {
  	console.log('server error: ', err);
});

koaRouter.use('/api', api.routes());
koaRouter.use('/auth', auth.routes());

koa.use(koaRouter.routes()); // 将路由规则挂载到Koa上。

koa.listen(8889, () => {
  console.log('Koa is listening on port 8889');
});

module.exports = koa;
