# あかちゃん買い物まよったら

0〜1歳育児の「買う前の選び方」ガイドサイト。静的HTMLのみ、ビルド不要、外部リソース（CDN・フォント・画像）なし。

## 仕組み

- `index.html` トップ、`checklist.html` 月齢別お買い物チェックリスト、`disclosure.html` 広告・プライバシー、`guides/` に12本のガイド。
- Amazonへのリンクはすべて `href` を持たず、`data-asin` または `data-search` だけを持つ。`assets/config.js` が読み込み時に URL を生成する。
  - ASINあり: `https://www.amazon.co.jp/dp/<ASIN>/?tag=<TAG>`
  - 検索型: `https://www.amazon.co.jp/s?k=<キーワード>&tag=<TAG>`
  - `AFFILIATE_TAG` が空のときは `tag` を付けない。
- 価格、在庫、★評価、レビュー本文、Amazon商品画像は載せない（運営規約対策。価格更新の保守も不要になる）。
- チェックリストは JS 内のデータ配列から生成する。ブラウザ内だけで動作し、何も送信せず、保存もしない（localStorage 不使用）。

## タグの入れ方（1か所だけ）

`assets/config.js` の先頭を編集する。

```js
const AFFILIATE_TAG = "あなたのトラッキングID-22";
```

これで全ページの全Amazonリンクにタグが付く。

## プレースホルダURLの置換手順

URL は公開先の `https://rinkagit.github.io/baby-navi/` に置換済み（2026-11-02、対象は `canonical`、OGP の `og:url`、JSON-LD、`sitemap.xml`、`robots.txt`）。公開URLを変える場合は、フォルダ全体で次を置換する。

`SITE_URL` には、実際の公開URL（末尾に `/` を付ける）を設定する。`<username>` と `<repo>` は自分のGitHubユーザー名とリポジトリ名に置き換える。

```sh
SITE_URL="https://<username>.github.io/<repo>/"
grep -rl "https://example.github.io/baby-navi/" . | xargs sed -i "s#https://example.github.io/baby-navi/#${SITE_URL}#g"
```

置換後、`grep -r "example.github.io" .` で残りが無いことを確認する。

## GitHub Pages 公開手順（約3分）

1. GitHubで新しいリポジトリを作り（例: `baby-navi`）、このフォルダの中身をすべてpushする。`WORK_ORDER.md`、`.conventions.md`、`.verify/` があれば削除してからpushする。
2. リポジトリの Settings > Pages を開く。
3. Source を「Deploy from a branch」、Branch を `main` / `/ (root)` にして Save。
4. 数分後に `https://ユーザー名.github.io/リポジトリ名/` で公開される。
5. 上記の手順でプレースホルダURLを置換して再push。
6. 必要なら Google Search Console にサイトを登録し、`sitemap.xml` を送信する。

## Amazonアソシエイトの審査について

- 登録後 **180日以内に、適格販売を3件** 発生させる必要がある。達成できないとアカウントが閉鎖されることがある。
- 審査ではサイトの内容が確認される。公開直後は記事数、開示ページ、PR表記がそろっていることが重要（本サイトは対応済み）。
- 最新の条件は Amazon の公式ガイドラインで確認すること。
- Amazonのリンクは必ず `sponsored nofollow` 付きで生成される（`config.js` が自動付与）。

## OGP画像について

OGP画像ファイルは作成していない。`og:title` / `og:description` / `og:type` / `og:url` のみ設定している（画像は省略）。SNSで画像付きカードを出したい場合は、画像を `assets/` に置き、各ページに `og:image`（絶対URL）を追加する。

## 保守ゼロ設計

- 価格・在庫・評価を載せないため、更新作業が発生しない。
- 特定商品が終売になっても、検索型リンクが受け皿になる。現状は全ボタンが検索型で、ASIN型は使っていない（確実に実在するASINだけを data-asin で追記してよい）。
- 記事は「選び方の基準」中心で、型落ちで陳腐化しにくい。
- サーバー、データベース、ビルドが無いため、壊れる部品が少ない。

## 本人が必要な作業

残るのは **Amazonアソシエイトへの登録と、`AFFILIATE_TAG` の入力だけ**（あわせて公開時のURL置換とGitHub Pagesの有効化）。

## ファイル構成

```
index.html / checklist.html / disclosure.html
sitemap.xml / robots.txt
assets/style.css  assets/config.js  assets/main.js
guides/g01-nyuhyubin.html ... g12-shussan.html
```
