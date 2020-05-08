//引入mongoose 模块
const mongoose = require('mongoose');
//创建购物车集合规则
const { User } = require('./user')
const cartSchema = new mongoose.Schema({

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    img_src: {
        type: String
    },
    message: {
        type: String
    },
    price: {
        type: Number
    },
    num: {
        type: Number
    },
    gift: {
        type: String
    },
    sum: {
        type: Number
    }
});
//根据规则创建购物车集合,返回构造函数
const Cart = mongoose.model('Cart', cartSchema);
//暴露出去
module.exports = {
    Cart
}