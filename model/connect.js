//引入mongoose第三方模块
const mongoose = require('mongoose');
//连接数据库
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/hometown', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库链接成功'))
    .catch(() => console.log('数据库连接失败'));