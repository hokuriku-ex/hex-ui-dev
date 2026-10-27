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

空 → 上の雲（左右４枚）→ 下の雲（左右２枚）→ bottom植栽（左右６枚）→ 楕円 → 模型の順に表示します。bottom内部の重なりは01 → 03 → 02のまま、６枚の下端をヒーロー表示領域の縦中央に揃えます。

楕円は台座・図面と同じカメラ座標に固定し、縦ドラッグでも相対位置がずれません。図面は100%表示時に100px下げ、ズーム時も楕円と同じ割合で移動します。非表示の台座は引き続き寸法基準として使います。建物・外構・人物・個別植栽の位置は変更しません。WELCOMEはヘッダー直下、人物紹介のBACKは従来の下部に表示します。
