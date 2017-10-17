/**
 * @ author  zenghongcong
 * @ date    2017-9-27 20:18
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

const getArticleById = async function(id){
	return await articleSchema.findById(id, {
		include: [categorySchema]
	});
};

const getArticleList = async function(limit, offset){
	return await articleSchema.findAndCount({
		order: [['create_time', 'desc']],
		limit: limit,
		offset: offset,
		include: [categorySchema]
	});
}

const upsertArticle = async function(data){
	return await articleSchema.upsert(data);
}

const delArticleById = async function(id){
	return await articleSchema.destroy({
		where: {
			id: id
		}
	});
}

module.exports = {
	getArticleById,
	getArticleList,
	delArticleById,
	upsertArticle
};

