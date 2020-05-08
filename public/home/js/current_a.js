var title = document.getElementsByTagName("title");
if (title[0].innerText == "家乡首页") {
    var a = document.getElementById("index");
    a.style.backgroundImage = "url(/home/iamges/navbgc2.png)"
} else if (title[0].innerText == "家乡历史") {
    var a = document.getElementById("history");
    a.style.backgroundImage = "url(/home/iamges/navbgc2.png)"
} else if (title[0].innerText == "家乡风景") {
    var a = document.getElementById("scenery");
    a.style.backgroundImage = "url(/home/iamges/navbgc2.png)"
} else if (title[0].innerText == "家乡名人") {
    var a = document.getElementById("famous");
    a.style.backgroundImage = "url(/home/iamges/navbgc2.png)"
} else if (title[0].innerText == "聚焦赵州") {
    var a = document.getElementById("zhaozhou");
    a.style.backgroundImage = "url(/home/iamges/navbgc2.png)"
}