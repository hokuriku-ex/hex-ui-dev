# bottom04生成記録

## 内側への画像延長

4811×380pxに拡張。既存2172×380pxの絵を右端に画素を維持して保持し、built-in image_genで生成した延長部（植物のない左側）を取り出し、2639pxの追加領域へサイズ調整して接続。左右のWebPは同一で、左は従来どおりCSS反転。下草の元の画素と、画面上の位置・倍率を保持。CSS疑似要素の延長は削除。

延長部の生成プロンプト:

Edit target: the supplied transparent bottom04 garden strip. Extend ONLY its moss ground to the INNER LEFT. Preserve all existing plant clumps, flowers, colors, shapes, sizes and positions RELATIVE TO THE RIGHT EDGE, unchanged. Output a very wide transparent canvas, total width 4811 and height 380: original 2172x380 artwork occupies the RIGHTMOST 2172px at its original size, with 2639px added to the LEFT. Do not stretch or resize any plants. The left added area contains NO plants. Continue the same dark green moss band #306A52 from original left edge into the added left area: perfectly straight horizontal top at y252 throughout, lower contour smoothly tapers upward toward the far new LEFT edge to meet the top line. Existing plants remain in front of moss and their bases visible. Preserve the original right-hand artwork and original outer right edge. Transparent above and below entire silhouette, no background, shadow, text, border, glow or additional foliage. A clean flat botanical asset, no creative redesign. This extended source will be mirrored for the left side; do not mirror now.

Built-in image_genを使用。参照はleft_bottom01.webp（苔山の色）とleft_bottom02.webp（フラットな下草の描き方）。生成PNGは元の保存先に保持し、透明余白を整理してWebP品質94で保存。左右のファイル内容は同じで、表示時に左をCSS反転する。

出力:
- images/top-hero/left_bottom04.webp
- images/top-hero/right_bottom04.webp

初版プロンプト:

Create a NEW companion asset left_bottom04 for this established flat garden illustration set, using image 1 solely as moss color reference and image 2 solely as flat foliage style reference. This is a small foreground boundary-softening cutout, not a complete scene. Transparent background, wide low composition, approximately 3:1 aspect ratio. A shallow mossy ground mound/band colored solid muted dark green #306A52 matching image 1. Its silhouette curves in an inverse arch, naturally descending toward the OUTER LEFT screen edge, with more depth hanging down at left and tapering gently into a slim rounded tip at the INNER RIGHT. Organic smooth contours on both upper and lower edges; absolutely no rectangular base or straight horizontal cutoff. A few LOW clumps of underplanting on the moss: rounded oval leaves and delicate pointed grass blades, flatter, lower and more restrained than image 2, slightly different shapes and colors: sage green, muted mint, medium yellow-green, dark evergreen; avoid the intense fluorescent yellow of image 2. Unified clean flat illustration style, simple filled vector-like silhouettes, no outlines, no photorealism, no 3D, no shadows, no textured background. No trees, people, houses, text or border. Entire cutout contained on the canvas with only minimal transparent margin. Intended as LEFT foreground landscaping at the horizon of a website hero; its mirrored copy will be used on the right. Preserve the existing design language rather than copying the existing mound composition.

## 改訂

苔山の上端を水平に変更し、赤・紫の小花を追加。下草を苔山の手前に置き、株元を水平線の少し下まで見せる。表示幅はヒーロー表示高の45%で、既存bottom02を隠さない控えめな高さにする。WebPは2172×380px。水平な接続線は画像上端から252pxなので、配置の上移動量は表示幅×252/2172。

最終編集プロンプト（built-in image_gen）:

Targeted edit of this transparent wide garden strip. Preserve the overall wide canvas, positions of the plant clumps, flat botanical silhouettes, red/coral flowers, purple/lavender flowers, muted green palette, and low moss band with a STRAIGHT HORIZONTAL TOP EDGE and shallow curved bottom. Change ONLY the overlap order and visible bases of the plants: all the grass, shrubs and flowers must sit IN FRONT OF the dark moss band, so their WHOLE clumps including the lower leaves and natural rounded/tapered bases remain visible on the green ground. Do NOT crop or hide any foliage at the horizontal moss top edge. Place each clump's base a little BELOW that top edge, about 20 to 35 pixels down into the moss band, with the foliage extending above it. The straight top boundary of the moss is still visible between clumps, at the same height across the full width. The green band must NOT cover the plants' lower portions. Keep plant height restrained so they remain small underplant accents and do not obscure another foliage layer behind them. Moss color should match #306A52, flat solid fill; no shadows, textures, realism, outline, text or extra objects. Preserve genuine alpha transparency outside the complete strip.
