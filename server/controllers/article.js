/**
 * @ author zenghongcong
 * @ date 2017-9-27 20:33
 * @ desc 文章
 */

const articleModel = require('../models/article.js');

const getArticleList = async function(ctx){
	let postData = ctx.request.body;
	let limit = postData.size;
	let offset = (postData.page - 1) * limit;
	let result = await articleModel.getArticleList(limit, offset);
	ctx.body = {
		msg: 'success',
		total: result.count,
		list: result.rows
	};
}

const getArticle = async function(ctx){
	let id = ctx.request.body.id;
	let result = await articleModel.getArticleById(id);
	ctx.body = {
		msg: 'success',
		article: result
	};
}

const upsertArticle = async function(ctx){
	let data = ctx.request.body;
	let result = await articleModel.upsertArticle(data);
	ctx.body = {
		msg: result == 'true' || result == true ? '添加成功' : '更新成功'
	};
}

const delArticle = async function(ctx){
	let id = ctx.request.body.id;
	let result = await articleModel.delArticleById(id);
	ctx.body = {
		msg: '删除成功',
		id: result
	};
}

module.exports = {
	getArticleList,
	getArticle,
	delArticle,
	upsertArticle
};
