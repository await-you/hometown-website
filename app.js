//引入express框架
const express = require('express');
//引入path模块
const path = require('path');
//创建网站服务器
const app = express();
//引入body-parser模块
const bodyParser = require('body-parser');
//引入express-session模块
const session = require('express-session');
//数据库连接
require('./model/connect');

//处理post参数

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//配置session
app.use(session({
    secret: 'secret key'
}));
//配置中间件
// app.use(session({
//     secret: 'this is string key', // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名


//     name: 'session_id',
//     /*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
//     resave: false,
//     /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
//     saveUninitialized: true, //强制将未初始化的 session 存储。  默认值是true  建议设置成true
//     cookie: {
//         maxAge: 1800 /*过期时间*/

//     },
//     /*secure https这样的情况才可以访问cookie*/

//     //设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期

//     rolling: true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）


// }));
//告诉express,模板在哪里
app.set('views', path.join(__dirname, 'views'));
//设置模板后缀
app.set('view engine', 'art');
//渲染后缀为art的模板时，使用的模板引擎是什么？
app.engine('art', require('express-art-template'));


//引入路由
const home = require('./route/home');
const admin = require('./route/admin');
//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);




//监听端口
app.listen(80)
console.log('网站服务器启动成功，请访问localhost');