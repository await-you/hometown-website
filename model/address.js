//创建地址结合

//引入mongoose第三方模块
const mongoose = require('mongoose');
//引入user模块
const { User } = require('./user')

//设定地址集合规则
const addressSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String
    }
});

//根据address集合规则创建集合，返回构造函数
const Address = mongoose.model('Address', addressSchema);

//把该模块暴露出去
module.exports = { Address }