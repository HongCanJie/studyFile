import http from '../utils/request'

// 在mock.js中添加了后端的操作之后，还需要在index.js中定义前端相关的API

// 请求首页的数据接口
export const getData = () => { 
	// 返回一个promse对象
	return http.get('/home/getData')  // get方法
}

// 用户页面的API数据接口  
// 注意axios的get和post不同，get1里面传进去的parm, post传入的是data
export const getUser = (param) => { 
	console.log('param',param);
	// 返回用户列表数据
	return http.get('/user/getUser', param)
}
export const addUser = (data) => {
	// 返回新增用户
	return http.post('/user/add', data)
}
export const delUser = (data) => {
	return http.post('/user/del', data) // 传入的data是一个对象 
}
export const editUser = (data) => {
	return http.post('/user/edit', data)
}

export const getMenu = (data) => {
	return http.post('/permission/getMenu', data)
}

// 可以在Login.vue中调用getMenu方法