function ajax(options) {

    var defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-Type': 'application/w-www-form-urlencoded'
        },
        success: function() {

        },
        error: function() {

        }


    };
    //使用options中的属性覆盖defaults中的属性 
    Object.assign(defaults, options);
    //创建ajax对象
    var xhr = new XMLHttpRequest();
    /*{
        name:'zhangsan',
        age:20

        变为
        name='zhangsan'&age=20
    }*/
    //拼接请求参数的变量
    var params = ''
        //循环对象格式参数，转成字符串
    for (var attr in defaults.data) {
        params += attr + '=' + defaults.data[attr] + '&';
    }
    //将参数最后面的&截取掉，重新复制给params
    params = params.substr(0, params.length - 1);
    //判断请求方式
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
    }

    //配置ajax
    xhr.open(defaults.type, defaults.url);

    //发送请求
    //如果请求方式为post
    if (defaults.type == 'post') {
        //请求参数的类型
        var contentType = defaults.header['Content-Type'];
        xhr.setRequestHeader('Content-Type', contentType);
        if (contentType == 'application/json') {
            xhr.send(JSON.stringify(defaults.data));
        } else {
            xhr.send(params);
        }

        xhr.send(params);
    } else {
        xhr.send();
    }

    //xhr接收完响应数据后触发
    xhr.onload = function() {
        //获取响应头信息
        var contentType = xhr.getResponseHeader('Content-Type');
        //服务端返回的数据
        var responseText = xhr.responseText;
        //如果响应类型中包含application/json
        if (contentType.includes('application/json')) {
            responseText = JSON.parse(responseText);

        }


        //状态码200，请求成功，调用成功情况的函数
        if (xhr.status == 200) {
            defaults.success(responseText, xhr);
        } else {
            defaults.error(responseText, xhr);
        }

    }

}

// ajax({
//     //请求方式
//     type: 'post',
//     //请求地址
//     url: 'http://localhost/first',
//     //请求参数
//     // data: {
//     //     name: 'zhangsan',
//     //     age: 20
//     // },
//     // header: {
//     //     'Content-Type': 'application/json'
//     // },
//     success: function(data) {
//             console.log('这里是success函数');
//             console.log(data);

//         }
//         // error: function(data, xhr) {
//         //     console.log('这是error函数');
//         //     console.log(data);
//         // }
// });

/*
    1.请求参数考虑的问题
    将请求参数，传递到ajax函数内部，在函数内部根据请求方式，
    将请求参数放在不同的位置

    get---参数放在请求地址的后面
    post--参数放在send方法里面

    2.请求参数格式的问题
    
    (1)application/x-www-form-urlencoded
    参数名称=参数值& 参数名称=参数值--name=张三&name=20

    (2)application/json
    {name:'zs',age:20}

*/