var express = require('express'),
    path = require('path'),//node中的路径对象
    config = require('config-lite'),
    bodyParser = require('body-parser'),//Node.js body parsing middleware
    session = require('express-session'),
    //flash = require('connect-flash');//一次性消息提示
    webpack =require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');

var MongoStore=require("connect-mongo")(session);//用mongodb存储session

var app = express();

var compiler = webpack(webpackDevConfig());
// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    // publicPath: webpackDevConfig().output.publicPath,
    noInfo: true,
    // index: "index.html",
    stats: {
        colors: true,
    }
}));
app.use(webpackHotMiddleware(compiler));



app.set('views',path.join(__dirname,'/server/views'));
//设置模板引擎为ejs
app.set('view engine','ejs');


// 设置静态文件目录
app.use(express.static(path.join(__dirname,'./server/public')));


// session
app.use(session({
    secret:config.session.secret,//通过设置secret计算hash值，并放在cookie中
    key:config.session.key,//cookie中的session id
    cookie:{
        maxAge:config.session.maxAge//过期时间，过期后cookie中的session id自动删除
    },
    store: new MongoStore({ //将session存储到mongodb中
        url:config.mongodb
    })

}));

//app.use(flash());
// 模板全局常量
app.locals.blog = {
    title:'UglyBlog'
}
//模板变量
app.use(function(req,res,next){

    res.locals.user = req.session.user
    res.locals.message = req.session.message;
    next();
});

//解析form表单的提交数据,Content/Type:application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//解析json格式
app.use(bodyParser.json());




//主页
app.use('/',require('./server/routes/index'));

//验证页
app.use('/validator',require('./server/models/validator'));

// 注册页 math paths starting with /register
app.use('/register',require('./server/routes/register'));

//登录页
app.use('/login',require('./server/routes/login'));

//退出
app.use('/logout',require('./server/routes/logout'));

//内容页
app.use('/content',require('./server/routes/content'));

//发布页
app.use('/post',require('./server/routes/post'));



app.listen(3333, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.log("The server has started at localhost:3333")
})