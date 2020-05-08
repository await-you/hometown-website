//引入mongoose模块
const mongoose = require('mongoose');
const { User } = require('./user');
//创建结算结合
const dingDanSchema = new mongoose.Schema({
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
    },
    address: {
        type: String
    },
    final_total: {
        type: Number
    }
});

//根据规则创建结算集合,返回构造函数
const DingDan = mongoose.model('Dingdan', dingDanSchema);

module.exports = {
    DingDan
}