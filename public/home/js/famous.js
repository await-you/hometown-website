/*
 * @Author: hzw
 * @Date:   2020-01-10 20:22:02
 * @Last Modified by: hzw
 * @Last Modified time: 2020-03-03 16:25:20
 */


//获取所有的标签
var liObjs = document.getElementsByTagName("li");
//获取所有的div对象
var dv = document.getElementById("dv");
var dvObjs = dv.getElementsByTagName("div");

//遍历循环所有的li,为其注册点击事件
for (var i = 0; i < liObjs.length; i++) {
    //在点击前，就把索引添加到li标签中
    liObjs[i].setAttribute("index", i);
    liObjs[i].onclick = function() {
        //点击事件中第一步：所有li的类样式全部移除
        for (var j = 0; j < liObjs.length; j++) {
            liObjs[j].removeAttribute("class");
        }

        //第二步，当前被点击的li应用类样式
        this.className = "current";

        //li被点击时，获取存储的索引值
        //alert(this.getAttribute("index"));
        var num = this.getAttribute("index");

        //获取所有的div标签,让所有的div先全部隐藏
        for (var k = 0; k < dvObjs.length; k++) {
            dvObjs[k].className = "";
        }
        //li被点击时，对应的div盒子显示
        dvObjs[num].className = "current";
    };
}