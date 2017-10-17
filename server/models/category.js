/**
 * @ author  zenghongcong
 * @ date    2017-10-12 14:58
 * @ desc    文章
 */

const Blog = require('../config/db.js').Blog;
const articleSchema = Blog.import('../schema/article.js');
const categorySchema = Blog.import('../schema/category.js');

articleSchema.belongsTo(categorySchema, {
	foreignKey: 'cat_id',
    constraints: false
});

categorySchema.hasMany(articleSchema, {
	foreignKey:'cat_id',
	constraints: false
})

const getCategoryById = async function(id){
	return await categorySchema.findById(id, {
		include: [articleSchema]
	});
};

const getCategoryList = async function(){
	return await categorySchema.findAndCount({
		order: ['id'],
		include: [articleSchema]
	});
}

const upsertCategory = async function(data){
	return await categorySchema.upsert(data);
}

module.exports = {
	getCategoryById,
	getCategoryList,
	upsertCategory
};

