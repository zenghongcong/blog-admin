/**
 * @ author  zenghongcong
 * @ date    2017-11-13 11:45
 * @ desc    用户
 */

const userModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.json').sign;

const postUserAuth = async function(ctx){
	let data = ctx.request.body;
	let userInfo = await userModel.getUserByName(data.name);
	
	if(userInfo != null){
		if(userInfo.password != data.password){
			ctx.body = {
				code: 400,
				msg: '密码错误'
			}
		}else{
			let userToken = {
				name: userInfo.name,
				id: userInfo.id
			};
			let token = jwt.sign(userToken, secret);
			ctx.body = {
				msg: "success",
				code: 200,
				user: userInfo.name,
				token: token
			}
		}
	}else{
		ctx.body = {
			code: 400,
			msg: '用户不存在'
		}
	}
}

const getUserInfo = async function(ctx){
	let id = ctx.request.body.id;
	let result = await userModel.getUserById(id);
	ctx.body = {
		code: 200,
		msg: 'success',
		userInfo: result
	};
}

const getUserList = async function(ctx){
	let result = await userModel.getUserList();
	ctx.body = {
		code: 200,
		msg: 'success',
		total: result.count,
		list: result.rows
	}
}

const upsertUser = async function(ctx){
	let data = ctx.request.body;
	let user = await userModel.getUserByName(data.name);
	if(user){
		ctx.body = {
			msg: '该用户名已存在'
		};
	}else{
		let result = await userModel.upsertUser(data);
		ctx.body = {
			msg: result == 'true' || result == true ? '添加成功' : '更新成功'
		};
	}
}

const delUser = async function(ctx){
	let id = ctx.request.body.id;
	let result = await userModel.delUserById(id);
	ctx.body = {
		msg: '删除成功',
		id: result
	};
}

module.exports = {
	postUserAuth,
	getUserInfo,
	getUserList,
	upsertUser,
	delUser
}


