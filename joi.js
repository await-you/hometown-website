/*
 * @Author: hzw 
 * @Date: 2020-03-06 01:35:10 
 * @Last Modified by:   hzw 
 * @Last Modified time: 2020-03-06 01:35:10 
 */
//测试用

//引入joi模块，返回模块兑对象
const Joi = require('joi');
//定义对象的验证规则
const schema = {
    phonenumber: Joi.string().length(11).required().error(new Error('手机号没有通过验证')),
    password: Joi.string().min(6).max(16).required().error(new Error('密码没有通过验证'))
};


async function run() {
    try {
        //使用验证规则，实施验证
        await Joi.validate({ phonenumber: '15256065722', password: '12345' }, schema);
    } catch (ex) {
        console.log(ex.message);
        return;
    }
    console.log('验证通过');

}
run();