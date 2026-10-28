# ヒーローの17レイヤー

CMSのヒーローHTMLは `examples/hero-layers.html` を使用します。画像は `images/top-hero/` に保存してください。CSS・JSは旧HTMLにも対応します。

## 奥から手前への重なり順

1. `plinth.webp`（台座：非表示・寸法基準）
2. `drawing.webp`（図面）
3. `exterior01.webp`（外構1：追加）
4. `tree01.webp`（樹木1）
5. `house.webp`（建物）
6. `underplant01.webp`（下草1）
7. `underplant02.webp`（下草2）
8. `exterior02.webp`（外構2：従来の外構）
9. `tree02.webp`（樹木2）
10. `tree03.webp`（樹木3）
11. `underplant03.webp`（下草3）
12. `aluminum.webp`（アルミ施工職人）
13. `pruning.webp`（剪定職人）
14. `sakan.webp`（左官職人）
15. `block.webp`（ブロック職人）
16. `supervisor.webp`（現場監督）
17. `family.webp`（家族）

原則としてHTMLの記載順で合成します。旧HTMLでも建物→下草1→下草2の順になるようJSで補正します。

## 画像の作り方

- `plinth.png` を基準に、`drawing.png`・`house.png`・`exterior02.webp` は同じ画像寸法・構図で出力します。台座以外は必要部分のみ残した透過PNGにします。
- `tree01～03.png`・`underplant01～03.png`・人物6枚は、単体の透過PNGを使います。位置・サイズは個別に指定します。
- 樹木・下草のCSS位置は画像追加前の仮配置です。完成画像を置いてからバランスを調整します。
- `exterior_sub.png`・`exterior_main.png`・`block_worker.png`・`tree.png`・`carport.png` は今回の最終構成には含めません。

## 個別配置の変更例

樹木・下草の配信用画像は `tree01～03.webp`・`underplant01～03.webp` です。元の3000×1854画像から透明余白だけを切り詰め、台座と同じ位置に重なるよう、基準倍率0.8を含めたCSSの配置・幅を設定しています。元画像内の切り抜き座標は `docs/hero-sprite-layout.json` に記録しています。以後は人物と同じ `--hex-sprite-x`・`--hex-sprite-bottom`・`--hex-sprite-width` で調整できます。

建物・図面・外構は3000×1854の余白を維持したWebPです。CMSのPNGファイル名指定はJSで対応するWebPに読み替えます。

```html
<img class="hex-hero-sprite hex-hero-sprite--tree01" src="tree01.png" alt=""
  style="--hex-sprite-x:15%;--hex-sprite-bottom:38%;--hex-sprite-width:12%;">
```

- `--hex-sprite-x`：台座画像の左端からの距離（台座の幅に対する％）
- `--hex-sprite-bottom`：台座画像の下端からの距離（台座の高さに対する％）
- `--hex-sprite-width`：画像の表示幅（台座の幅に対する％）

縦横比を保って表示します。樹木・下草は人物の操作判定の対象にはなりません。

## Chrome開発ツールでのリアルタイム調整

開発サイトでは、Elementsで対象の `.hex-hero-character` または `.hex-hero-sprite` を選び、Stylesの `--hex-sprite-x`・`--hex-sprite-bottom`・`--hex-sprite-width` を数値の％で変更すると、約150ms以内を目安にCanvasへ反映されます。クラスのCSSルールと要素のstyle属性、どちらの編集にも対応します。ドラッグ・ズーム位置は維持します。本番サイトでは監視せず、非表示タブでも確認を停止します。

左官職人は `.hex-hero-character--sakan`、ほかは `family`・`supervisor`・`block`・`pruning`・`aluminum` です。再読み込みで編集は元に戻るため、確定値は `css/hex_pc.css` へ保存してください。

## 外構の2枚構成

exterior01.webp は図面の直後、exterior02.webp は従来の外構の位置に表示します。どちらも提供された3000×1854の透過PNGを、寸法・余白を維持してロスレスWebPへ変換したものです。

改行なしの登録用HTMLは examples/hero-layers-inline.html です。旧ファイル名 exterior.png / exterior.webp はJSで exterior02.webp に読み替えます。

## 背景レイヤーと位置

空 → 上の雲（左右４枚）→ 下の雲（左右２枚）→ bottom植栽（左右６枚）→ 楕円 → 模型の順に表示します。bottom内部の重なりは01 → 03 → 02のまま、６枚の下端を背景面の水平な上端に揃えます。

楕円は台座・図面と同じカメラ座標に固定し、縦ドラッグでも相対位置がずれません。図面の100px下移動は取り消し、元の合成位置に戻しています。背景面は図面・建物・外構と同じ中央基準の倍率・上下位置で表示し、独立した下移動は加えません。bottom画像６枚も接点を維持します。非表示の台座は引き続き寸法基準として使います。建物・外構・人物・個別植栽の位置は変更しません。独立WELCOMEボタンは廃止し、ヒーロー下端のアンカーナビ先頭「ようこそ」で従来と同じ丸演出を開始します。人物紹介のBACKは従来の下部に表示します。

## ヒーロー下端のアンカーナビ

`examples/hero-anchor-source.html` のHTMLは、CMSで `.hex-aluminum-wrap` の直後（`.hex-welcome-wrap` より前）に登録できます。登録階層にかかわらず、表示用ナビはJSでヒーロー下端へ移します。

表示タイミングは従来のWELCOMEボタンと共通です。開幕・ヒーローの初期演出中、WELCOME移行後、人物の丸表示中は非表示です。先頭項目はWELCOMEの見出し検索に依存せず丸演出を開始し、２項目目以降は従来の見出しアンカーへ移動します。端末別の `data-sticky-pc`・`data-sticky-sp` 指定も引き続き読み取ります。

背景面は元アーチの頂点の高さで水平にしています。背景面とbottom画像の接点は同じ座標から計算し、ズーム・縦ドラッグ・WELCOMEへの複製時にも揃えます。

トップのナビ元HTMLは `.hex-home-anchor-source` を使用し、下層の `.hex-anchor-source` と区別します。トップの通常表示は `.hex-home-anchor-nav:not(.is-fixed)` の専用CSSで紺背景（#1f2774）・白文字に設定しています。固定後は共通の白背景・紺文字です。

## SVG背景面と幅変更時の縦位置

背景面は `images/top-hero/ellipse.svg` の透過SVGで描画します。図面と同じ3000×1854の画像座標を使い、上端は水平です。CSSのグラデーションによる代替描画は使いません。

模型全体と背景面は `HERO_LAYOUT_ANCHOR_Y` の共通基準点で配置します。表示サイズは従来どおり画面幅・高さから計算し、縦位置の補正には画面高さだけを使います。そのため、同じ画面高・ズーム・縦ドラッグ量なら、横幅が変わっても背景上端と模型の基準点は同じ高さになります。画像サイズが変わるため、模型の全輪郭が同じ高さになる意味ではありません。

ドラッグ・ズーム、人物クリック判定と丸の中央への移動、WELCOMEへ渡す複製画像にも同じ補正を反映します。背景面専用の200pxオフセットは撤去し、図面・建物・外構と同じ中央基準の80%倍率をSVGにも適用します。bottom６枚の下端合わせは維持します。
