/**
 * @ author zenghongcong
 * @ date 2017-10-12 15:04
 * @ desc 文章
 */

const categoryModel = require('../models/category.js');

const getCategoryList = async function(ctx){
	let result = await categoryModel.getCategoryList();
	ctx.body = {
		msg: 'success',
		total: result.count,
		list: result.rows
	};
}

const getCategory = async function(ctx){
	let id = ctx.request.body.id;
	let result = await categoryModel.getCategoryById(id);
	ctx.body = result
	ctx.body = {
		msg: 'success',
		list: [result]
	};
}

const upsertCategory = async function(ctx){
	let data = ctx.request.body;
	let result = await categoryModel.upsertCategory(data);
	ctx.body = {
		msg: result == 'true' || result == true ? '添加成功' : '更新成功'
	};
}

module.exports = {
	getCategoryList,
	getCategory,
	upsertCategory
};
