/*
 * @Author: hzw 
 * @Date: 2020-03-14 15:45:00 
 * @Last Modified by:   hzw 
 * @Last Modified time: 2020-03-14 15:45:00 
 */
//ajax实现搜索框提示
//获取搜索框
var search = document.querySelector(".search .text");
//console.log(serch);
//获取搜索提示框
var searchList = document.querySelector('#search_list');
console.log(searchList);
//获取搜索按钮
var btn = document.querySelector('.btn');
//存储定时器的变量
var timer = null;
search.onfocus = function() {
    this.value = ''
}

search.oninput = function() {
    //清除上一次定时器
    clearTimeout(timer);
    this.style.color = "black";

    //获取用户输入的内容
    var key = this.value;
    //console.log(key)

    //开启定时器，让请求延迟发送

    timer = setTimeout(function() {

        ajax({
            type: 'get',
            url: '/home/search',
            data: {
                key: key
            },
            success: function(result) {

                //使用模板引擎拼接字符串

                var search_list_item = template('tpl', {
                    result: result
                });
                // console.log(result);
                // console.log(typeof result);
                // console.log(result[0].url);
                //console.log(search_list_item)
                //将拼接好的字符串显示在界面中
                searchList.innerHTML = search_list_item;


                //显示ul容器
                searchList.style.display = 'block';

                var search_list_item_a = document.querySelectorAll('.search_list_item_a');

                //没有搜索到此商品，提示
                if (search_list_item_a.length == 0) {
                    searchList.style.display = 'none';
                    btn.onclick = function() {
                        alert('亲，该店没有此商品哦');
                    }

                }

                for (let i = 0; i < search_list_item_a.length; i++) {

                    search_list_item_a[i].onclick = function() {

                        var value = this.innerText;
                        console.log(value);
                        //获取下拉列表中每一项的url

                        var url = result[i]['url'];

                        console.log(url);

                        //把提示的信息放入搜索框
                        search.value = value;
                        //隐藏提示信息列表
                        searchList.style.display = 'none';

                        btn.onclick = function() {
                            document.location = url;
                        }
                    }
                }

                //输入框中内容为空，下拉框隐藏
                if (search.value == '') {
                    searchList.style.display = 'none';
                }

            }
        });
    }, 250);



}