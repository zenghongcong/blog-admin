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

module.exports = {
	getCategoryList,
	getCategory
};
