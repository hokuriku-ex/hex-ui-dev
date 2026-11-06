# ヒーローの人物紹介HTML

`examples/hero-character-copy.html` の6ブロックを、CMSの `hex-hero-wrap` と `hex-welcome-wrap` の間に登録します。HTMLは改行なしです。

| 登録クラス | 対応する人物 |
| --- | --- |
| hex-supervisor-wrap | 現場監督 |
| hex-block-wrap | ブロック職人 |
| hex-sakan-wrap | 左官職人 |
| hex-pruning-wrap | 剪定職人 |
| hex-aluminum-wrap | アルミ施工職人 |
| hex-family-wrap | 家族 |

各ブロックの `.hex-opening-sub` が日本語見出し、`.welcome_contents .text` が本文です。サンプルの文章を編集してください。本文では `<br hex-pc>` と `<br hex-sp>` も使えます。

通常表示では6ブロックは非表示で、人物をクリック・タップすると対応する紹介だけ表示します。登録がない人物は丸表示のみです。家族も同じ演出の対象です。

PCでは丸が完成すると、日本語見出しが共通のポンッ演出で現れ、本文の文字表示が始まります。丸の右にある紹介欄をスクロールでき、BACKや丸画像上のドラッグ・ズーム操作で探索へ戻ります。SPでは丸が完成すると見出しと本文が同時に静止表示されます。丸画像から本文の末尾まで一緒にスクロールでき、右上に固定された✕ボタンで紹介を閉じます。
