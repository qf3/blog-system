module.exports={
	// 程序启动监听的端口号
	port:3333,
	// express-session配置信息
	session:{
		secret:'blog',
		key:'blog',
		maxAge: 2592000000
	},
	// mongodb的地址,myblog是数据库名称
	mongodb: 'mongodb://localhost:27017/blog'
}