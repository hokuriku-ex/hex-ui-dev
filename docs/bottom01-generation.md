# bottom01の山の調整

Built-in image_genを使用。山の高さを元の約2/3へ抑え、横幅を約4/3へ拡大。生成画像を2048×1024pxの透過WebPに変換し、右側は左側の左右反転で保存。山の不透明部分の高さは約187px。CSS幅は42%から56%に変更し、画像の横長化で高さが縮まないようにする。下端・配置・追従・重なり順は維持。

- images/top-hero/left_bottom01.webp
- images/top-hero/right_bottom01.webp

最終生成プロンプト:

Generate a minimal clean vector-like flat garden moss hill cutout asset. Actual transparent background. Canvas 1536x1024. Draw ONE entirely opaque uniform solid dark green #306A52 shape in the bottom 187 pixels only. Smooth wide shallow asymmetric hill: broad peak at x350,y837; left edge starts y890; slope gradually descends toward right edge x1535,y1015. Straight baseline along bottom y1023. Crisp edge, with absolutely no glow, mist, shadow, gradient, lighting, texture or extra shapes. Everything above the hill silhouette is fully transparent. This is a flat website ground silhouette, not a landscape photograph. No plants, objects or text. The art will be widened horizontally by one third for final use; keep height and bottom baseline.
