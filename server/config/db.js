/**
 * @ author  zenghongcong
 * @ date    2017-10-13 11:36
 * @ des     用于初始化Sequelize和数据库的连接
 */

const Sequelize = require('sequelize');

const Blog = new Sequelize('mysql://root:123456@localhost/blog', {
	define: {
		timestamps: false
	}
});

module.exports = {
	Blog
};
