# HEX UI

北陸エクステリア公式サイトの開発用UIライブラリ

## CSS

- hex_pc.css
- hex_sp.css

## JavaScript

- hex.js

## GitHub Pages

https://hokuriku-ex.github.io/hex-ui-dev/
## 開幕セクションの画像指定

画像は `images/opening/` に配置し、HTMLにはファイル名を指定します。
読み込んだ `js/hex.js` と同じ環境のフォルダを参照します。
既存の絶対URL・相対パス指定も使用できます。HTMLはCMSの対象ブロックに記述します。

### 開幕キャッチ

既存のキャッチ文はそのままに、PC用・スマートフォン用の `src` を指定します。

```html
<div class="hex-opening-intro-source">
  <div class="hex-opening-intro-pc">
    <img src="opening-pc.webp" alt="住まいと家族">
  </div>
  <div class="hex-opening-intro-sp">
    <img src="opening-sp.webp" alt="住まいと家族">
  </div>
  <span class="hex-opening-intro-main">What Shall We Draw?</span>
  <span class="hex-opening-intro-sub">既存のサブコピー</span>
</div>
```

### 静止画スライド

開始・終了マーカーの間に、表示する順番で指定します。
`data-title`・`data-subtitle` には既存のコピーを設定してください。
PC用またはスマートフォン用の片方だけを指定した場合は、両端末で同じ画像を使用します。

```html
<div class="hex-opening-slide-start"></div>
<div class="hex-opening-slide-source"
  data-pc-image="family-pc.webp" data-sp-image="family-sp.webp"
  data-title="" data-subtitle="" data-alt="家族と過ごす庭"></div>
<div class="hex-opening-slide-source"
  data-pc-image="friends-pc.webp" data-sp-image="friends-sp.webp"
  data-title="" data-subtitle="" data-alt="友人と集うテラス"></div>
<div class="hex-opening-slide-source"
  data-pc-image="hobbies-pc.webp" data-sp-image="hobbies-sp.webp"
  data-title="" data-subtitle="" data-alt="趣味を楽しむガレージ"></div>
<div class="hex-opening-slide-source"
  data-pc-image="pets-pc.webp" data-sp-image="pets-sp.webp"
  data-title="" data-subtitle="" data-alt="ペットと過ごす庭"></div>
<div class="hex-opening-slide-end"></div>
```
