//创建用户集合
//引入mongoose第三方模块
const mongoose = require('mongoose');
//设定集合规则
const userSchema = new mongoose.Schema({
    phonenumber: {
        type: String,
        required: true, //必填
        unique: true //不能重复

    },
    email: {
        type: String,
        require: true //必填
    },
    password: {
        type: String,
        required: true, //必填
        minlength: 6,
        maxlength: 16
    },
    pay_psd: {
        type: String,
        required: true, //必填
        minlength: 6,
        maxlength: 6
    },
    final_total: {
        type: Number
    }
});

//使用规则创建集合,返回构造函数
const User = mongoose.model('User', userSchema);

// //创建一个用户，测试用
// User.create({
//         phonenumber: '15256065722',
//         email: '2239341763@qq.com',
//         password: '123456'
//     }).then(() => console.log('用户创建成功'))
//     .catch(() => console.log('用户创建失败'));

//导出User模块
module.exports = {
    User
}