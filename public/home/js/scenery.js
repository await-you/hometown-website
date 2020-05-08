/*
* @Author: hzw
* @Date:   2020-01-19 20:54:57
* @Last Modified by:   hzw
* @Last Modified time: 2020-01-23 22:46:44
*/

//获取轮播图的box
var box=my$("box");
//获取box下的相框ad
var ad=box.children[0];
//获取相框的宽度
var adWidth=ad.offsetWidth;
//获取ul
var ulObj=ad.children[0];
//获取左右焦点所在的div
var focus=my$("focus");

//显示和隐藏左右div的---为box注册鼠标进入和鼠标离开事件
box.onmouseover=function(){
	focus.style.display="block";
};
box.onmouseout=function(){
	focus.style.display="none";
};

//动画函数--任意元素移动到任意位置

function animate(element,target){
	//清除定时器，若果不清除，重复点击事件的时候，会让动画移动速度加快
	clearInterval(element.timeId);
	element.timeId=setInterval(function(){
		//获取当前元素的位置,数字类型
		var current=element.offsetLeft;
		//每次移动的距离
		var step=10;
		step=current<target?step:-step;
		current+=step;
		if(Math.abs(current-target)>Math.abs(step)){
			element.style.left=current+"px";
		}else{
			//清理定时器,不清理会有抽搐效果
			clearInterval(element.timeId);
			//直接到达target
			element.style.left=target+"px";
		}
	},15);
}

//点击右边焦点
var index=0;
my$("right").onclick=function(){
	if(index<ulObj.children.length-1){
		index++;
		animate(ulObj,-index*adWidth);
	}
};

//点击左边按钮
my$("left").onclick = function () {
  if(index>0){
    index--;
    animate(ulObj,-index*adWidth);
  }
};


//功能2---点击轮播图中的图片在main中显示相应的图片及介绍

//获取相框中的所有li
var liObjs=ad.getElementsByTagName("li");
//获取main
var main=my$("main");
//获取轮播图中每张图片对应的div
var dvObjs=main.children;

//console.log(dvObjs[0]); /*自己测试有没有获取div对象*/

//为轮播图中的li注册点击事件
for(var i=0;i<liObjs.length;i++){
	//点击前把索引放到每个li中
	liObjs[i].setAttribute("index",i);
	liObjs[i].onmouseover=function(){
		//获取当前点击的index属性
		var index=this.getAttribute("index");
		
		for(var k=0;k<dvObjs.length;k++){
			//先移除样式
			dvObjs[k].removeAttribute("class");
			
		}
		//再设置当前为current
		dvObjs[index].className="current";
	};
}