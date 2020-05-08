$(function() { //页面加载函数
    //1.购买单位选择
    $(".choose-unit a").click(function() {
        // console.log("哈哈");
        $(this).addClass("current");
        $(this).siblings().removeClass("current");
    });
    //2.赠品选择
    $(".choose-gift a").click(function() {
        $(this).addClass("current");
        $(this).siblings().removeClass();
    });
    //3.商品增加按钮
    $(".choose-amount .add").click(function() {
        var n = $(this).siblings("#txt").val();
        n++;
        if (n > 1) {
            $(this).siblings(".reduce").css("cursor", "pointer");
        }
        $(this).siblings("#txt").val(n);
    });
    //4.商品减少按钮
    $(".choose-amount .reduce").click(function() {
        var n = $(this).siblings("#txt").val();
        if (n > 1) {
            n--;
            $(this).siblings("#txt").val(n);
        } else {
            $(this).css("cursor", "not-allowed");
        }


    });
    //5、文本框输入小于1的值，自动修改成1
    $("#txt").blur(function() {
        var val = $("#txt").val();
        if (val < 1) {
            $("#txt").val("1");
        }
    });

    //6.全部商品分类下拉列表
    $(".dropdown").mouseover(function() {
        $(".dropdown .dd").css({ "position": "relative", "zIndex": 9 }).stop().slideDown();
    });
    $(".dropdown").mouseout(function() {
        $(".dropdown .dd").stop().slideUp();
    });
    //choose-size
    $(".choose-size a").click(function() {
        $(this).addClass("current");
        $(this).siblings().removeClass();
    });
    //choose-kilo
    $(".choose-kilo a").click(function() {
        $(this).addClass("current");
        $(this).siblings().removeClass();
    });
});