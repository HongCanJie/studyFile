// 用来管理菜单相关的数据
import Cookie from 'js-cookie'
export default {
	state: { //状态
		isCollapse: false, //控制左侧菜单展开还是收起
		tabsList:[
			{
				path: '/',
				name: 'home',
				label: '首页',
				icon: 's-home',
				url: 'Home/Home'
			  },
		],//面包屑数据，和路由展示的对应，与菜单的数据相关
		menu: [],// 不同角色动态显示左边侧栏

	},
	mutations: { // 修改state状态的方法
		collapseMenu(state) {
			state.isCollapse = !state.isCollapse
		},
		// 删除指定的tag数据
		closeTag(state, val) {
			// console.log('itemmmmmm');
			const index = state.tabsList.findIndex(item => item.name === val.name) // 找到当前项的index
			state.tabsList.splice(index, 1); // splice（删除的位置，删除的个数）删除当前项

		},
		// 更新面包屑数据 点击左侧栏
		selectMenu(state, val) {
			console.log('val', val);
			// 如果是首页，点击首页不会添加，如果是其他页面的话先判断在当前中是否存在，不存在的话添加，否则不添加
			// 判断是否为首页

			if (val.name !== 'home') {
				// 如果tabsList存在此项会返回索引，否则返回-1
				const index = state.tabsList.findIndex(item => item.name === val.name) 
				if (index === -1) {
					state.tabsList.push(val) // 添加到tabsList
				}
				console.log(state.tabsList,'tabsList');
			}
		},

		// 设置不同用户角色显示不同的模块
		// 设置menu数据
		setMenu(state, val) {
			state.menu = val
			// localStorage.setItem('menu',JSON.stringify(val)) // localStorage缓存数据
			Cookie.set('menu', JSON.stringify(val)) // 用cookie缓存数据
		},

		// 动态注册路由  登录的时候调用
		addMenu(state, router) {
		// 判断缓存中是否有数据
			if(!Cookie.get('menu')) return 
			const menu= JSON.parse(Cookie.get('menu'))
			state.menu = menu
			// 组装动态路由的数据
			const menuArray = [] // permission
			menu.forEach(item => {
				// 判断是否有子路由
				if(item.children) {
					item.children = item.children.map(item => {
						item.compoent = () => import(`../views/${item.url}`)
						return item
					})
					menuArray.push(...item.children)
				}else {
					item.compoent = () => import(`../views/${item.url}`)
					menuArray.push(item)
				}
			});
			console.log(menuArray,'menuArray');
// 路由的动态添加
			menuArray.forEach(item => {
				router.addRoute('Main',item) // 添加在主路由之后
			})

		},
	}

}