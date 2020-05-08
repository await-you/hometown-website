var add = document.querySelector('.add-car');


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


    } else {
        xhr.send();
    }

    //xhr接收完响应数据后触发
    xhr.onload = function() {
        //获取响应头信息
        var contentType = xhr.getResponseHeader('Content-Type');
        //服务端返回的数据
        var responseText = xhr.responseText;
        //console.log(responseText);
        //如果响应类型中包含application/json
        if (contentType.includes('application/json')) {
            responseText = JSON.parse(responseText);

        }


        //状态码200，请求成功，调用成功情况的函数
        if (xhr.status == 200) {
            defaults.success(responseText);
        } else {
            defaults.error(responseText);
        }

    }
}

add.onclick = function() {
    var img = document.querySelector(".good-src");
    var img_src = img.src;
    //console.log(img_src);
    var customer_id = document.querySelector('.customer_id').innerText;
    //customer_id
    console.log(customer_id) //此处字符串外面加上了一个双引号，导致加入数据库失败
    customer_id = customer_id.substr(1, customer_id.length - 2);

    var message = document.querySelector('.sku-name').innerText;
    var price = document.querySelector('.price').innerText;
    price = parseInt(price.substr(1, 2));
    /* console.log(typeof price);
    console.log(price); */
    var num = document.querySelector('#txt').value;
    num = parseInt(num);

    // console.log(typeof num);
    // console.log(num);
    var gift = document.querySelector('.choose-gift .current').innerText;
    var sum = price * num;
    ajax({
        type: 'post',
        //请求地址
        url: '/admin/addcart',
        // 请求参数
        data: {
            customer: customer_id,
            img_src: img_src,
            message: message,
            price: price,
            num: num,
            gift: gift,
            sum: sum
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function(data) {
            console.log('这里是success函数');
            //console.log(data);
            if (data == '未登录') {
                alert('亲，请先登录哦！');
            } else {
                alert(data);

            }

        }
    });


}