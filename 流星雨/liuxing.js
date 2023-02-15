// 随机生成100个星星
for (var i = 0; i < 100; i++) {
    var star = document.createElement("div");
    star.classList.add("star");
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight * 0.4 + "px";
    star.style.animationDelay = Math.random() * 10 + "s";
    document.body.appendChild(star);
}
// 随机生成100个流星
for (var i = 0; i < 100; i++) {
    var meteor = document.createElement("div");
    meteor.classList.add("meteor");
    document.body.appendChild(meteor);
    meteor.style.left = Math.random() * window.innerWidth * 10 + "px";
    meteor.style.top = Math.random() * window.innerHeight * 0.4 + "px";
    meteor.style.animationDelay = Math.random() * 5 + "s";
    document.body.appendChild(meteor);
}