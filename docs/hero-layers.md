# ヒーローの16レイヤー

CMSのヒーローHTMLは `examples/hero-layers.html` を使用します。画像は `images/top-hero/` に保存してください。CSS・JSは旧HTMLにも対応します。

## 奥から手前への重なり順

1. `plinth.png`（台座）
2. `drawing.png`（図面）
3. `tree01.png`（樹木1）
4. `house.png`（建物）
5. `underplant01.png`（下草1）
6. `underplant02.png`（下草2）
7. `exterior.png`（外構）
8. `tree02.png`（樹木2）
9. `tree03.png`（樹木3）
10. `underplant03.png`（下草3）
11. `aluminum.png`（アルミ施工職人）
12. `pruning.png`（剪定職人）
13. `sakan.png`（左官職人）
14. `block.png`（ブロック職人）
15. `supervisor.png`（現場監督）
16. `family.png`（家族）

原則としてHTMLの記載順で合成します。旧HTMLでも建物→下草1→下草2の順になるようJSで補正します。

## 画像の作り方

- `plinth.png` を基準に、`drawing.png`・`house.png`・`exterior.png` は同じ画像寸法・構図で出力します。台座以外は必要部分のみ残した透過PNGにします。
- `tree01～03.png`・`underplant01～03.png`・人物6枚は、単体の透過PNGを使います。位置・サイズは個別に指定します。
- 樹木・下草のCSS位置は画像追加前の仮配置です。完成画像を置いてからバランスを調整します。
- `exterior_sub.png`・`exterior_main.png`・`block_worker.png`・`tree.png`・`carport.png` は今回の最終構成には含めません。

## 個別配置の変更例

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
