// 共通：ナビの現在地表示のみ（リンク生成は config.js）
(function () {
  var here = location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".site-nav a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute("href").split("/").pop() === here) links[i].setAttribute("aria-current", "page");
  }
})();
