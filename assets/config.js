// ===== 設定：AmazonアソシエイトのトラッキングID（例: "xxxxx-22"）をここ1か所に入れる =====
const AFFILIATE_TAG = "";

// Amazonリンク生成。opts.asin があれば商品ページ型、なければ検索型。tag が空なら tag パラメータは付けない。
function buildAmazonUrl(opts, tag) {
  tag = String(tag || "").trim();
  opts = opts || {};
  var base = "https://www.amazon.co.jp";
  var url;
  if (opts.asin) {
    url = base + "/dp/" + encodeURIComponent(opts.asin) + "/";
    if (tag) url += "?tag=" + encodeURIComponent(tag);
  } else if (opts.search) {
    url = base + "/s?k=" + encodeURIComponent(opts.search);
    if (tag) url += "&tag=" + encodeURIComponent(tag);
  } else {
    url = base + "/";
    if (tag) url += "?tag=" + encodeURIComponent(tag);
  }
  return url;
}

// a[data-asin], a[data-search] の href を生成（checklist.html の動的生成分にも再利用）
function applyAmazonLinks(root) {
  var links = (root || document).querySelectorAll("a[data-asin],a[data-search]");
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    a.href = buildAmazonUrl({ asin: a.getAttribute("data-asin"), search: a.getAttribute("data-search") }, AFFILIATE_TAG);
    a.target = "_blank";
    a.rel = "sponsored nofollow noopener";
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () { applyAmazonLinks(document); });
}
if (typeof module !== "undefined") module.exports = { buildAmazonUrl: buildAmazonUrl };
