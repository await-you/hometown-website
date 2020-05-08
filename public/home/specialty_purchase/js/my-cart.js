//查看购物车的时候，向admin发送post请求

//获取 我的购物车按钮
$(function() { //页面加载函数
    $(".shopcar a").click(function() {
        $.ajax({
            type: 'post',
            url: '/admin/my-cart',
            success: function(response) {
                console.log(response);
                if (response == '未登录') {
                    $(".shopcar a").click(function() {
                        alert('亲，请先登录哦');
                        return false;
                    });
                }
            }
        });
    });


})