/*
* @Author: hzw
* @Date:   2020-01-19 20:53:55
* @Last Modified by:   hzw
* @Last Modified time: 2020-01-30 18:56:43
*/

function my$(id) {
    return document.getElementById(id);
}


//获取任意一个元素的任意一个样式属性的值---返回值是字符串类型

function getStyle(element,attr) {
    return window.getComputedStyle?window.getComputedStyle(element,null)[attr]:element.currentStyle[attr];
}


//动画函数

   function animate(element,json,fn) {
       //清理定时器--如果不清理就会出现多次点击使得移动速度加快的bug
       clearInterval(element.timeId);
       element.timeId=setInterval(function () {
           //默认全部到达目标
           var flag=true;
           for(var attr in json) {
               //判断这个属性是不是opacity
               if (attr == "opacity") {
                   //获取当前元素的透明度,放大100倍
                   var current = getStyle(element, attr) * 100;
                   //目标的透明度*100
                   var target = json[attr] * 100;
                   var step = (target - current) / 10;
                   step = step > 0 ? Math.ceil(step) : Math.floor(step);
                   current += step;
                   element.style[attr] = current / 100;
               }
               else if (attr == "zIndex") {//判断这个属性是不是zIndex
                   element.style[attr] = json[attr];
               }
               else {//普通元素
                   //获取元素当前的位置
                   var current = parseInt(getStyle(element, attr));  //转化成数字类型
                   var target = json[attr];
                   var step = (target - current) / 10;
                   //正数向上取整，负数向下取整
                   step = step > 0 ? Math.ceil(step) : Math.floor(step);
                   current += step;
                   element.style[attr] = current + "px";

               }
               //是否到达目标
               if (current != target) {
                   flag = false;
               }

           }
           if(flag){
               clearTimeout(element.timeId);
               if(fn){//回调函数
                   fn();
               }
           }

       },10);
   }

