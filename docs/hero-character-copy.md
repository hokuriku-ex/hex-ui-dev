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

各ブロックの `.hex-opening-main` がタイトル、`.hex-opening-sub` がサブタイトル、`.welcome_contents .text` が本文です。サンプルの文章を編集してください。本文では `<br hex-pc>` と `<br hex-sp>` も使えます。

通常表示では6ブロックは非表示で、人物をクリック・タップすると対応する紹介だけ表示します。登録がない人物は丸表示のみです。家族も同じ演出の対象です。

丸が完成するとWELCOMEと同じタイトルのロール・サブタイトル・本文の文字表示が始まります。PCは丸の右側、SPは丸の下です。長い本文は紹介欄内でスクロールできます。BACK、丸画像上のドラッグ・ズーム操作で紹介を閉じて全画面へ戻ります。
