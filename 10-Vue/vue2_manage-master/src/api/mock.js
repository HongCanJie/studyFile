
import Mock from 'mockjs'
// 引入api
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permission from './mockServeData/permission'


// 定义mock请求拦截 这里的getData是index.js中需要获得的   ‘get'类型可省略
Mock.mock('/api/home/getData', 'get',homeApi.getStatisticalData )


// Mock.mock('/api/home/getData', 'get', function () {
// 	// 拦截到请求后的处理逻辑
// 	console.log('拦截到了');
// 	// 这里的return返回的是data
// 	return []
	
// })
// 把相同的逻辑封装在一起,设计一个方法可以放在mock()里面代替那个function（）{}
// {
// 	getData:function() {

// 	}
// }


// 报404错误说明是Mock拦截出错 定义拦截路径两种方法：1.直接写死一个路径，直接按照当前路径匹配，加了url则匹配不到 2.使用正则
// 用户列表的数据  add是自己起的名字
Mock.mock('/api/user/add','post', userApi.createUser)
Mock.mock('/api/user/del', 'post',userApi.deleteUser)
Mock.mock('/api/user/edit', 'post',userApi.updateUser)
// 注意路径匹配，此处换成正则   {url: '/api/user/getUser?page=6&limit=10'}
Mock.mock(/api\/user\/getUser/, userApi.getUserList)  // get可以省略不写

// 定义
Mock.mock(/api\/permission\/getMenu/,'post', permission.getMenu)


// 去api/indexedDB.js定义前端相关的