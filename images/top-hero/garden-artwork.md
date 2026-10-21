# Hero woodland planting layers

Generated with the built-in ImageGen tool, using the user's temporary hero illustration as a style reference.

## Assets

- `left_bottom01.png` / `right_bottom01.png`: moss mound.
- `left_bottom02.png` / `right_bottom02.png`: groundcover and low shrubs.
- `left_bottom03.png` / `right_bottom03.png`: medium and tall deciduous trees.

The six basenames are retained, with `.webp` replacing `.png` for the active assets. All assets use a transparent 1536 x 1024 canvas and lossless WebP encoding. Right-hand files contain horizontally mirrored artwork. Existing CSS positioning, stacking and reveal timing are retained; layout balancing will be handled separately after the image replacement. The URL resolver changes only these six legacy PNG extensions to WebP.

## Revised artwork

Edited with the built-in ImageGen tool using each original layer as its edit target. Final assets are `left_bottom01.webp` through `left_bottom03.webp`, and their mirrored `right_bottom01.webp` through `right_bottom03.webp` counterparts.

- Moss: preserve the mound silhouette and transparent canvas; replace all three colored regions with the darkest existing green as one flat uniform fill. No internal curves, highlights or shading.
- Understory: preserve the flat leaf shapes and cluster arrangement; use brighter, more saturated spring greens and yellow-greens with a few dark accents. Reduce planting height by about 25 percent, keeping the same width and bottom baseline.
- Trees: preserve the green palette, scalloped foliage and branching brown trunks. Remove the smallest sapling, leaving three trees. Swap the largest and second-largest positions: medium left, largest middle, smallest right. Reduce size differences; overlap neighboring foliage, with largest behind medium behind smallest. Lean toward the inner edge of the left corner at varied gentle angles.

Final targeted tree prompt: Conservative final correction to this same three-tree flat botanical illustration. Preserve exact foliage palette, simple scalloped shape style, brown branching trunks, THREE trees and their order (medium on left, largest in middle, smallest on right). Increase the rightmost tree height about 25 percent so its height is about 75 percent of the largest, and make its leaves overlap the middle tree leaves slightly. Show all trees gently leaning to the RIGHT (toward the inner edge of a LEFT corner website illustration), with differing angles: left tree 10 degrees, middle tree 4 degrees, right tree 8 degrees. Do not space them in a tidy row. Largest behind medium behind smallest. Keep roots near the same bottom baseline, entire artwork inside canvas with at least 60 pixels transparent margin above foliage. No ground, no shrubs, no additional objects, real transparent background. Same 1536x1024 canvas. Do not redesign.

## Final generation prompts

Shared prompt:

Use the attached screenshot ONLY as a STYLE reference for the simple flat plants in its lower right corner. Generate a NEW isolated botanical layer, not a screenshot. EXTREMELY SIMPLE FLAT VECTOR CLIPART: large clean geometric organic color shapes like the reference; 5 solid colors only, FULLY OPAQUE fills inside shapes and hard clean anti-aliased edges. Absolutely NO glow, NO blur, NO gradients, NO shadows, NO painterly watercolor, NO fine leaf texture, NO translucent halos. Real transparent PNG background with zero alpha outside the silhouettes. Wide canvas 1536x1024. Left corner composition for a website bottom edge, high on left and low on right. Identical registration for a 3-layer set: root/ground baseline on left x100 y850, center x750 y880, right x1400 y970. Main colors olive #7C9E48, yellowgreen #B0C96A, medium green #529A68, dark green #28674D, sage #91B8A1, brown #80604A for trunks. No text, no faces, no stakes or cables.

Moss layer:

ONLY draw a LOW MOSS MOUND at the bottom. Upper 75% of canvas empty transparent. One smooth low elongated mound, crest at x350 y800, gently tapering to bottom-right. Entire bottom edge filled. Use 3 large SOLID flat overlapping curved shapes, like smooth green paper cutouts. NO grass, NO plants, NO trees. Minimal flat cartoon illustration.

Understory layer:

ONLY draw UNDERSTORY AND LOW SHRUBS with transparent gaps, no ground or mound. 5 simple groups with their bases along the registered baseline: rounded low shrubs made of 4-6 scalloped blobs and small sets of broad simple leaves, a few bold arching grass blades. Tallest shrub at left y630. Everything above y600 empty transparent. The plant silhouettes become smaller toward right. About 30 big simple leaves TOTAL, not hundreds. No small detailed texture. Minimal flat cartoon illustration.

Tree layer:

ONLY draw FOUR UPRIGHT JAPANESE DECIDUOUS WOODLAND TREES, no ground or shrubs. Slender visible brown forks, each tree canopy built from just 4-7 broad scalloped opaque green shapes like the screenshot's simple flat trees. Largest tree at x300 base y850 top y150, medium at x720 base y880 top y380, smaller at x1070 base y930 top y570, sapling at x1340 base y970 top y730. Roughly 25 broad leaf masses TOTAL for the entire image; no individual tiny foliage rendering. Trees naturally multi-stem and asymmetrical, no poles or tree supports. All artwork fits canvas. Minimal flat cartoon illustration.
