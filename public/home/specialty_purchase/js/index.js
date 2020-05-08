/*
 * @Author: hzw 
 * @Date: 2020-02-24 17:20:37 
 * @Last Modified by: hzw
 * @Last Modified time: 2020-02-26 01:20:11
 */
window.addEventListener('load', function() {
    //获取左右按钮
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    //获取focus
    var focus = document.querySelector('.focus');
    //获取focus宽度
    var focusWidth = focus.offsetWidth;
    //1.鼠标经过focus，就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量 
    });

    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    //2.动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个li
        var li = document.createElement('li');
        //把li追加到ol中
        ol.appendChild(li);
        li.setAttribute('index', i);
        //给li绑定点击事件
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                this.className = 'current';

            }
            //点击圆圈，移动图片
            //ul移动距离是圆圈的索引号乘图片的宽度

            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        });
    }
    //把ol中第一个li设置为current
    ol.children[0].className = 'current';

    //克隆第一张图片，放到最后面.
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //3.点击右侧按钮，滚动
    var num = 0;
    var circle = 0;
    //circle控制小圆圈的播放

    //flag节流阀，防止点击过快
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //无缝滚动原理
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                ol.children[circle].className = 'current';
            }

        }
    });

    //4.左侧按钮
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //无缝滚动原理
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                ol.children[circle].className = 'current';
            }
        }
    });

    //5.自动播放轮播图,类似于点击右侧按钮
    var timer = this.setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);




});

//二、jquery 电梯导航
$(function() { //页面加载函数
    $(window).scroll(function() {
        //1.到这个位置开始出现
        var toolTop = $(".main").offset().top;
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    });
    //返回顶部
    $(".back").click(function() {

        $("body,html").stop().animate({
            scrollTop: 0
        });
    });
    //去到底部
    $(".goBottom").click(function() {


        var footer = $(".footer").offset().top;
        $("body,html").stop().animate({
            scrollTop: footer
        });
    });

    //floor层导航
    $(".sold").click(function() {
        var soldTop = $(".zhaozhou").offset().top;

        $("html,body").stop().animate({ scrollTop: soldTop }

        );
    });
    $(".folk-art").click(function() {
        var folkTop = $(".folk-custom").offset().top;
        $("html,body").stop().animate({
            scrollTop: folkTop
        });
    });

    $(".fixedtool li").on("mouseover", function() {
        $(this).addClass("current");
        $(this).siblings("li").removeClass("current");
    });

});