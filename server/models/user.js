/**
 * @ author  zenghongcong
 * @ date    2017-11-13 11:38
 * @ desc    用户
 */

const Blog = require('../config/db.js').Blog;
const userSchema = Blog.import('../schema/user.js');

const getUserByName = async function(name){
	let userInfo = await userSchema.findOne({
		where: {
			name: name
		}
	});
	
	return userInfo;
}

const getUserById = async function(id){
	let userInfo = await userSchema.findOne({
		where: {
			id: id
		}
	});
	return userInfo;
}

const getUserList = async function(){
	return await userSchema.findAndCount();
}

const upsertUser = async function(data){
	return await userSchema.upsert(data);
}

const delUserById = async function(id){
	return await userSchema.destroy({
		where: {
			id: id
		}
	});
}

module.exports = {
	getUserByName,
	getUserById,
	getUserList,
	upsertUser,
	delUserById
}
