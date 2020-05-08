//引入express框架
const express = require('express');
const bodyParser = require('body-parser');
//引入用户集合构造函数
const { User } = require('../model/user');
//引入购物车集合构造函数
const { Cart } = require('../model/cart');
//引入地址集合构造函数
const { Address } = require('../model/address');
const { DingDan } = require('../model/dingdan');

// const { Jiesuan } = require('../model/jiesuan');
//引入joi模块,用于注册信息的服务器端验证
const Joi = require('joi');
//创建管理路由
const admin = express.Router();
// admin.get('/', (req, res) => {
//     res.send('管理界面');
// });

//登录逻辑实现
admin.post('/checklogin', async(req, res) => {
    //接收post请求参数-- body-parser
    //对象解构，es6语法
    const { phonenumber, password } = req.body;

    //服务器端的二次验证，因为客户端如果禁用js引擎，客户端验证就失效了
    if (phonenumber.trim().length == 0 || password.trim().length == 0) {
        //客户端错误，http状态码400
        // return res.status(400).render('/admin/error');
        return res.render('admin/error');
        // return res.status(400).send('error');
    }

    //根据手机号在数据库中查询用户，有就返回对象信息，无则null
    let user = await User.findOne({ phonenumber: phonenumber });

    if (user) { //查询到用户
        //将客户端传来的密码和数据库中的密码进行比对
        if (password == user.password) {
            //登录成功

            //服务器session设置，加密的session秘钥，存储到客户端的cookie中
            req.session.phonenumber = user.phonenumber;
            req.session._id = user._id;
            //开放成全局，将用户手机号码渲染到商城首页模板
            req.app.locals.userInfo = user;
            //重定向到首页
            res.redirect('/home/specialty_purchase/index');
            module.exports = req.session._id;

            // res.send('登录成功');
        } else {
            //登录失败--虽然密码错误，依然告诉用户手机号或密码错误
            res.render('admin/error');
        }

    } else { //没有查询到用户
        res.render('admin/error');
    }
});

//退出登录
admin.get('/outlogin', (req, res) => {
    req.session.phonenumber = null;
    req.session._id = null;
    req.app.locals.userInfo = null;
    res.redirect('/home/specialty_purchase/html/login');
});

//注册逻辑路由
admin.post('/register', async(req, res) => {

    //定义对象的验证规则
    const schema = {
        phonenumber: Joi.string().length(11).regex(/^1[3|4|5|7|8]\d{9}$/).required().error(new Error('手机号没有通过验证')),
        email: Joi.string().regex(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).required().error(new Error('邮箱没有通过验证')),
        password: Joi.string().min(6).max(16).regex(/^[a-zA-Z0-9_]{6,16}$/).required().error(new Error('密码没有通过验证')),
        //checkbox: Joi.valid(true).required().error(new Error('请勾选用户注册须知')),
        checkpassword: Joi.string().min(6).max(16).regex(/^[a-zA-Z0-9_]{6,16}$/).required().error(new Error('密码没有通过验证')),
        pay_psd: Joi.string().length(6).regex(/^[0-9]{6}$/).required().error(new Error('支付密码没有通过验证'))
    };


    try {
        //使用验证规则实施验证
        await Joi.validate(req.body, schema);
    } catch (e) {
        //验证没通过
        //重定向到注册页面,es6模板字符串,
        return res.redirect(`/home/specialty_purchase/html/register?message=${e.message}`);
    }
    //根据手机号查询用户是否已经注册了
    const { phonenumber } = req.body;
    const { password, checkpassword } = req.body;

    if (password != checkpassword) {
        return res.redirect(`/home/specialty_purchase/html/register?message=两次密码不一致！`);
    }
    // let user = User.findOne({ phonenumber: phonenumber });--缺少await 就会出错
    let user = await User.findOne({ phonenumber: phonenumber });
    if (user) { //手机号已被注册
        return res.redirect(`/home/specialty_purchase/html/register?message=该用户已经注册！`);
    } else { //没有注册，加入数据库
        await User.create(req.body);
        //重定向到登录界面
        return res.redirect(`/home/specialty_purchase/html/register?message=注册成功！2s后跳转到登录界面`);




    }




});

//商品信息加入购物车
admin.post('/addcart', async(req, res) => {

    if (!req.session.phonenumber) {
        //用户未登录
        res.send('未登录');
    } else {
        //用户是登录状态
        //res.send(data);
        //获取商品全部信息
        var data = req.body;
        //获取商品message

        var message = data.message;
        //res.send(message);

        //数据库中查询message字段是否已经存在
        let goods = await Cart.findOne({ message: message });


        if (goods) { //存在该商品
            res.send('亲，您已经添加该商品！')
        } else {
            await Cart.create(data);
            await DingDan.create(data);
            res.send('亲，成功加入购物车！');

        }


    }



});

//未登录时，不能查看购物车界面
admin.post("/my_cart", (req, res) => {
    if (!req.session.phonenumber) {
        res.send('0');
    } else {
        res.send("1");
    }
});
//购物车列表界面
admin.get('/cart-list', async(req, res) => {
    if (!req.session.phonenumber) {
        // res.send('亲，登录后才能查看购物车哦');
        res.redirect("/home/specialty_purchase/index");
    } else {
        //let k = await Cart.find({ customer: req.session._id });
        //先查询数据库中当前用户id购买的所有商品，在把商品信息中的有用信息获取出来
        let goods = await Cart.find({ customer: req.session._id }).select(' img_src message price num gift sum -_id ');

        //将有用的商品信息获取后，通过模板引擎显示在商品列表页面
        res.render('admin/cart-list.art', {
            goods: goods
        });
    }

});



//删除当前商品
admin.post('/delete_one', async(req, res) => {

    var customer_id = req.body.customer_id;
    var src = req.body.src;
    await Cart.findOneAndDelete({ customer: customer_id, img_src: src }).then(result => res.send(result));
    //res.send(src);
});

//删除所有商品
admin.post("/clear_all", async(req, res) => {
    var customer_id = req.body.customer_id;
    await Cart.deleteMany({ customer: customer_id })
        .then(result => { res.send(result) });
});

//删出选中的商品
admin.post("/delete_checked", async(req, res) => {
    var customer_id = req.body.customer_id;
    var srcObj = req.body.src;
    //res.send(srcObj)

    for (var key in srcObj) {
        await Cart.deleteMany({
            customer: customer_id,
            img_src: srcObj[key]
        }).then(result => console.log(result));
    }
});

//更新数数据库购物车信息
admin.post('/reduce_alter', async(req, res) => {
    var customer_id = req.session._id
    var src = req.body.src;
    var num = req.body.num;
    var sum = req.body.sum;
    //var total = req.body.total;
    await Cart.updateOne({ customer: customer_id, img_src: src }, { num: num, sum: sum }).then(result => console.log(result));
    //res.send(req.body);
});

admin.post('/add_alter', async(req, res) => {
    var customer_id = req.session._id
    var src = req.body.src;
    var num = req.body.num;
    var sum = req.body.sum;
    //var total = req.body.total;
    await Cart.updateOne({ customer: customer_id, img_src: src }, { num: num, sum: sum }).then(result => console.log(result));
    //res.send(req.body);
});

admin.post('/input_alter', async(req, res) => {
    //res.send(req.body);
    var customer_id = req.session._id
    var src = req.body.src;
    var num = req.body.num;
    var sum = req.body.sum;
    //var total = req.body.total;
    await Cart.updateOne({ customer: customer_id, img_src: src }, { num: num, sum: sum }).then(result => console.log(result));

});

//地址逻辑实现
admin.post('/address', async(req, res) => {
    const { customer, address, final_total } = req.body;
    const data = {
        customer: customer,
        address: address
    }

    await Address.create(data);
    await DingDan.updateMany({ customer: req.session._id }, { final_total: final_total, address: address })
    await User.updateOne({ phonenumber: req.session.phonenumber }, { final_total: final_total });

});

admin.get('/jiesuan', async(req, res) => {
    const data = await Cart.find({
        customer: req.session._id
    });
    res.render('admin/jiesuan.art', {
        data: data
    });

});




//从结算页面到支付页面
admin.get('/zhifu', async(req, res) => {
    let user = await User.findOne({ phonenumber: req.session.phonenumber });
    res.render('admin/zhifu.art', {
        data: user
    });


});

admin.get('/finish_firework', async(req, res) => {
    res.render('admin/finish_firework.art');
});

//支付密码校验
admin.post('/zhifu-psd', async(req, res) => {
    //首先获取数据库中该用户的密码
    let user = await User.findOne({ phonenumber: req.session.phonenumber });
    let pay_psd = user.pay_psd;

    const { payPassword_rsainput } = req.body
        //res.send(payPassword_rsainput);
    if (payPassword_rsainput == pay_psd) { //支付密码正确
        res.redirect(`/admin/finish_firework`);
        await Cart.deleteMany({
            customer: req.session._id
        }).then(result => console.log(result));



    } else { //密码错误
        // var message = '密码错误请重新输入！'
        // data1 = {
        //     message: message
        // }
        // res.render('admin/zhifu.art', {
        //     data: data1
        // });
        let user = await User.findOne({ phonenumber: req.session.phonenumber });
        res.render('admin/zhifu.art', {
            data: user,
            err: "支付密码错误!"
        });

    }
})

//未登录时，不能查看订单界面
admin.post("/my_dingdan", (req, res) => {
    if (!req.session.phonenumber) {
        res.send('0');
    } else {
        res.send("1");
    }
})
admin.get("/dingdan", async(req, res) => {
    if (!req.session.phonenumber) {
        // res.send('亲，登录后才能查看订单哦');
        res.redirect("/home/specialty_purchase/index");

    } else {
        let data = await DingDan.find({ customer: req.session._id });

        res.render('admin/dingdan.art', { data: data });

    }
});

//删除订单
admin.get("/delete_dingdan", async(req, res) => {


    await DingDan.deleteMany({
        customer: req.session._id
    }).then(result => console.log(result));
    res.send("订单已清空");

});

//导出路由模块
module.exports = admin;