/*
 * @Author: hzw
 * @Date:   2020-01-30 17:20:49
 * @Last Modified by: hzw
 * @Last Modified time: 2020-03-03 18:05:14
 */

//图片散开效果代码
var flag = true; //--假设所有动画执行完毕了---防止旋转过快导致图片成一团
var config = [{
        width: 400,
        top: 20,
        left: 50,
        opacity: 0.2,
        zIndex: 2
    }, //0
    {
        width: 600,
        top: 70,
        left: 0,
        opacity: 0.8,
        zIndex: 3
    }, //1
    {
        width: 800,
        top: 100,
        left: 200,
        opacity: 1,
        zIndex: 4
    }, //2
    {
        width: 600,
        top: 70,
        left: 600,
        opacity: 0.8,
        zIndex: 3
    }, //3
    {
        width: 400,
        top: 20,
        left: 750,
        opacity: 0.2,
        zIndex: 2
    } //4

];

//封装图片分配函数
function assign() {
    var list = my$("slide").getElementsByTagName("li");
    for (var i = 0; i < list.length; i++) {
        animate(list[i], config[i], function() {
            flag = true;
        });
    }
}
assign();



//鼠标进入事件，左右焦点显示
my$("slide").onmouseover = function() {
    animate(my$("arrow"), { "opacity": 1 });
};

//鼠标离开事件，左右焦点隐藏
my$("slide").onmouseout = function() {
    animate(my$("arrow"), { "opacity": 0 });
};

//点击右边按钮
my$("arrRight").onclick = function() {
        if (flag) {
            flag = false;
            config.push(config.shift());
            assign(); //此分配函数的中的动画函数中的回调函数执行完毕后为flag为true;
        }

    }
    //点击左边按钮
my$("arrLeft").onclick = function() {
    if (flag) {
        flag = false;
        config.unshift(config.pop());
        assign(); //此分配函数的中的动画函数中的回调函数执行完毕后为flag为true;
    }


}



//move
;
//通过class获取元素
function getClass(cls) {
    var ret = [];
    var els = document.getElementsByTagName("*");
    for (var i = 0; i < els.length; i++) {
        //判断els[i]中是否存在cls这个className;.indexOf("cls")判断cls存在的下标，如果下标>=0则存在;
        if (els[i].className === cls || els[i].className.indexOf("cls") >= 0 || els[i].className.indexOf(" cls") >= 0 || els[i].className.indexOf(" cls ") > 0) {
            ret.push(els[i]);
        }
    }
    return ret;
}

function getStyle(obj, attr) { //解决JS兼容问题获取正确的属性值
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

function startMove(obj, json, fun) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var isStop = true;
        for (var attr in json) {
            var iCur = 0;
            //判断运动的是不是透明度值
            if (attr == "opacity") {
                iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            var ispeed = (json[attr] - iCur) / 8;
            //运动速度如果大于0则向下取整，如果小于0想上取整；
            ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
            //判断所有运动是否全部完成
            if (iCur != json[attr]) {
                isStop = false;
            }
            //运动开始
            if (attr == "opacity") {
                obj.style.filter = "alpha:(opacity:" + (json[attr] + ispeed) + ")";
                obj.style.opacity = (json[attr] + ispeed) / 100;
            } else {
                obj.style[attr] = iCur + ispeed + "px";
            }
        }
        //判断是否全部完成
        if (isStop) {
            clearInterval(obj.timer);
            if (fun) {
                fun();
            }
        }
    }, 30);
}


//拖拽

window.onload = function() {
    var oUl = document.getElementById("drag_div");
    var aLi = oUl.getElementsByTagName('div');
    var disX = 0;
    var disY = 0;
    var minZindex = 1;
    var aPos = [];
    for (var i = 0; i < aLi.length; i++) {
        var t = aLi[i].offsetTop;
        var l = aLi[i].offsetLeft;
        aLi[i].style.top = t + "px";
        aLi[i].style.left = l + "px";
        aPos[i] = { left: l, top: t };
        aLi[i].index = i;
    }
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].style.position = "absolute";
        aLi[i].style.margin = 0;
        setDrag(aLi[i]);
    }
    //拖拽
    function setDrag(obj) {
        obj.onmouseover = function() {
            obj.style.cursor = "move";
        }
        obj.onmousedown = function(event) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            obj.style.zIndex = minZindex++;
            //当鼠标按下时计算鼠标与拖拽对象的距离
            disX = event.clientX + scrollLeft - obj.offsetLeft;
            disY = event.clientY + scrollTop - obj.offsetTop;
            document.onmousemove = function(event) {
                //当鼠标拖动时计算div的位置
                var l = event.clientX - disX + scrollLeft;
                var t = event.clientY - disY + scrollTop;
                obj.style.left = l + "px";
                obj.style.top = t + "px";
                /*for(var i=0;i<aLi.length;i++){
                  aLi[i].className = "";
                  if(obj==aLi[i])continue;//如果是自己则跳过自己不加红色虚线
                  if(colTest(obj,aLi[i])){
                    aLi[i].className = "active";
                  }
                }*/
                for (var i = 0; i < aLi.length; i++) {
                    aLi[i].className = aLi[i].className;
                }
                var oNear = findMin(obj);


                if (oNear) {
                    //oNear.className = "active";
                }
            }
            document.onmouseup = function() {
                document.onmousemove = null; //当鼠标弹起时移出移动事件
                document.onmouseup = null; //移出up事件，清空内存
                //检测是否普碰上，在交换位置
                var oNear = findMin(obj);
                if (oNear) {
                    var width1 = oNear.clientWidth;
                    var height1 = oNear.clientHeight;
                    var width2 = obj.clientWidth;
                    var height2 = obj.clientHeight;
                    console.log(width1 + width2)
                    console.log(oNear.className);
                    console.log(obj.className)
                    var className1 = obj.className;
                    var className2 = oNear.className;
                    obj.className = className2;
                    oNear.className = className1;
                    oNear.style.zIndex = minZindex++;
                    obj.style.zIndex = minZindex++;
                    startMove(oNear, aPos[obj.index]);
                    startMove(obj, aPos[oNear.index]);
                    //交换index
                    oNear.index += obj.index;
                    obj.index = oNear.index - obj.index;
                    oNear.index = oNear.index - obj.index;


                    obj.clientWidth = width2;
                    obj.clientHeight = height2;

                    oNear.clientWidth = width1;
                    oNear.clientHeight = height1;

                } else {

                    startMove(obj, aPos[obj.index]);
                }
            }
            clearInterval(obj.timer);
            return false; //低版本出现禁止符号
        }
    }
    //碰撞检测
    function colTest(obj1, obj2) {
        var t1 = obj1.offsetTop;
        var r1 = obj1.offsetWidth + obj1.offsetLeft;
        var b1 = obj1.offsetHeight + obj1.offsetTop;
        var l1 = obj1.offsetLeft;

        var t2 = obj2.offsetTop;
        var r2 = obj2.offsetWidth + obj2.offsetLeft;
        var b2 = obj2.offsetHeight + obj2.offsetTop;
        var l2 = obj2.offsetLeft;

        if (t1 > b2 || r1 < l2 || b1 < t2 || l1 > r2) {
            return false;
        } else {
            return true;
        }
    }
    //勾股定理求距离
    function getDis(obj1, obj2) {
        var a = obj1.offsetLeft - obj2.offsetLeft;
        var b = obj1.offsetTop - obj2.offsetTop;
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }
    //找到距离最近的
    function findMin(obj) {
        var minDis = 999999999;
        var minIndex = -1;
        for (var i = 0; i < aLi.length; i++) {
            if (obj == aLi[i]) continue;
            if (colTest(obj, aLi[i])) {
                var dis = getDis(obj, aLi[i]);
                if (dis < minDis) {
                    minDis = dis;
                    minIndex = i;
                }
            }
        }
        if (minIndex == -1) {
            return null;
        } else {
            return aLi[minIndex];
        }
    }
}