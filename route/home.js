//引入express框架
const express = require('express');
//创建展示路由
const home = express.Router();
// home.get('/register', (req, res) => {
//     res.render('home/specialty_purchase/html/register');
// });

//家乡介绍路由
home.get('/index', (req, res) => {
    res.render('home/index');
});
home.get('/history', (req, res) => {
    res.render('home/history');
});
home.get('/scenery', (req, res) => {
    res.render('home/scenery');
});
home.get('/famous', (req, res) => {
    res.render('home/famous');
});
home.get('/zhaozhou', (req, res) => {
    res.render('home/zhaozhou');
});


//商城内部路由

home.get('/specialty_purchase/index', (req, res) => {
    res.render('home/specialty_purchase/index');
});

home.get('/specialty_purchase/html/gongmian_detail', (req, res) => {
    res.render('home/specialty_purchase/html/gongmian_detail');
});

home.get('/specialty_purchase/html/hetao_detail', (req, res) => {
    res.render('home/specialty_purchase/html/hetao_detail');
});

home.get('/specialty_purchase/html/jinsizao_detail', (req, res) => {
    res.render('home/specialty_purchase/html/jinsizao_detail');
});

home.get('/specialty_purchase/html/login', (req, res) => {
    res.render('home/specialty_purchase/html/login');
});
home.get('/specialty_purchase/html/luji_detail', (req, res) => {
    res.render('home/specialty_purchase/html/luji_detail');
});
home.get('/specialty_purchase/html/register', (req, res) => {
    //获取地址栏参数
    const { message } = req.query;
    res.render('home/specialty_purchase/html/register', {
        //把注册错误信息传递到模板中
        message: message
    });
});
home.get('/specialty_purchase/html/shizi_detail', (req, res) => {
    res.render('home/specialty_purchase/html/shizi_detail');
});
home.get('/specialty_purchase/html/xiangchun_detail', (req, res) => {
    res.render('home/specialty_purchase/html/xiangchun_detail');
});
home.get('/specialty_purchase/html/xigua_detail', (req, res) => {
    res.render('home/specialty_purchase/html/xigua_detail');
});
home.get('/specialty_purchase/html/yali_detail', (req, res) => {
    res.render('home/specialty_purchase/html/yali_detail');
});
//赵州专卖路由

home.get('/specialty_purchase/html/qiuligao_detail', (req, res) => {
    res.render('home/specialty_purchase/html/qiuligao_detail');
});
home.get('/specialty_purchase/html/huangguan_detail', (req, res) => {
    res.render('home/specialty_purchase/html/huangguan_detail');
});
home.get('/specialty_purchase/html/xueligan_detail', (req, res) => {
    res.render('home/specialty_purchase/html/xueligan_detail');
});
home.get('/specialty_purchase/html/lvrou_detail', (req, res) => {
    res.render('home/specialty_purchase/html/lvrou_detail');
});
home.get('/specialty_purchase/html/xuelizhi_detail', (req, res) => {
    res.render('home/specialty_purchase/html/xuelizhi_detail');
});
home.get('/specialty_purchase/html/xuehuali_detail', (req, res) => {
    res.render('home/specialty_purchase/html/xuehuali_detail');
});
home.get('/specialty_purchase/html/shaobing_detail', (req, res) => {
    res.render('home/specialty_purchase/html/shaobing_detail');
});
//民间工艺路由
home.get('/specialty_purchase/html/folk', (req, res) => {
    res.render('home/specialty_purchase/html/folk');
});



//搜索框路由
// home.get('/search', (req, res) => {

//     // 搜索关键字
//     const key = req.query.key;
//     // 提示文字列表
//     const list = [

//         {
//             name: '晋州鸭梨',
//             url: './html/yali_detail.html'
//         },
//         // '赵州鲜榨雪梨汁',
//         // '赵州驴肉',
//         // '赵州烧饼',
//         // '赵州雪花梨',
//         // '晋州鸭梨',
//         // '赵州手工秋梨膏',
//         // '赞皇金丝枣',
//         // '元氏大红袍柿子',
//         // '藁城宫面',
//         // '平山绵核桃',
//         // '鹿泉香椿',
//         {
//             name: '正定马家卤鸡',
//             url: './html/luji_detail.html'
//         }

//     ];
//     // 搜索结果
//     let result = list.filter(item => item.name.includes(key));


//     // 将查询结果返回给客户端
//     res.send(result);
// });

// home.get('/search', (req, res) => {

//     // 搜索关键字
//     const key = req.query.key;
//     // 提示文字列表
//     const list = [



//     ];
//     // 搜索结果
//     let result = list.filter(item => item.includes(key));


//     // 将查询结果返回给客户端
//     res.send(result);
// });

home.get('/search', (req, res) => {
    // 搜索关键字
    const key = req.query.key;
    // 提示文字列表
    const list = [{
            name: '正定马家卤鸡',
            url: '/home/specialty_purchase/html/luji_detail'
        },
        {
            name: '赞皇金丝枣',
            url: '/home/specialty_purchase/html/jinsizao_detail'
        },
        {
            name: '藁城宫面',
            url: '/home/specialty_purchase/html/gongmian_detail'
        },
        {
            name: '平山绵核桃',
            url: '/home/specialty_purchase/html/hetao_detail'
        },
        {
            name: '鹿泉香椿',
            url: '/home/specialty_purchase/html/xiangchun_detail'
        },
        {
            name: '新乐西瓜',
            url: '/home/specialty_purchase/html/xigua_detail'
        },
        {
            name: '元氏大红袍柿子',
            url: '/home/specialty_purchase/html/shizi_detail'
        },
        {
            name: '晋州鸭梨',
            url: '/home/specialty_purchase/html/yali_detail'
        },
        {
            name: '手工秋梨膏',
            url: '/home/specialty_purchase/html/qiuligao_detail'
        },
        {
            name: '赵州皇冠梨',
            url: '/home/specialty_purchase/html/huangguan_detail'
        },
        {
            name: '赵州驴肉焖子',
            url: '/home/specialty_purchase/html/lvrou_detail'
        },
        {
            name: '赵县石塔烧饼',
            url: '/home/specialty_purchase/html/shaobing_detail'
        },
        {
            name: '赵县雪梨干',
            url: '/home/specialty_purchase/html/xueligan_detail'
        },
        {
            name: '鲜榨雪梨汁',
            url: '/home/specialty_purchase/html/xuelizhi_detail'
        },

    ];
    // 搜索结果
    let result = list.filter(item => item.name.includes(key));
    // 将查询结果返回给客户端

    res.send(result);
});


//导出路由模块
module.exports = home;