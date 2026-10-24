# Mannequin sprites

Source: `C:/Users/desig/Desktop/HPコンテンツ/ヒーロー画像/2.png`

Created with the built-in image_gen tool (background-extraction edit). These are AI-derived cutouts; they are not pixel-exact extractions of the source. Original colors, poses, and orientation were requested as invariants. Tools were added as specified. No website layout or image references were changed.

Final assets: `aluminum.webp`, `pruning.webp`, `sakan.webp`, `block.webp`, `supervisor.webp`, `family.webp` in this directory. Lossless WebP; sizes normalized approximately to the sakan worker on 2026-10-24; crop bounds use alpha > 1 plus 2 pixels of padding, retaining original alpha inside the crop. Alpha and appearance on black and white backgrounds were checked after conversion.

## Common prompt

Use case: background-extraction with a precise small tool edit. The supplied scene is the EDIT TARGET. Extract ONLY the specified existing mannequin character as an isolated transparent-background sprite. Preserve the EXACT pose, limb placement, body proportions, head angle, viewing direction, elevated camera angle, silhouette, navy blue color, hardhat, clothing folds, matte miniature architectural-model material, and lighting of that existing figure. Do not invent a different person or re-pose or mirror it. Enlarge faithfully for clean edges. Reconstruct only small portions hidden by surrounding objects if needed to isolate the figure. No house, paving, vegetation, carport, wall, ground plane, base, surrounding objects or cast ground shadow. Keep subtle self-shading on the mannequin. Real transparent background with crisp clean alpha edges, no halo, no glow, no black or white backdrop, no text. Frame the complete figure and required tool without cutting extremities, with only a very narrow transparent margin.

## aluminum

Target: the far-right NAVY BLUE CARPORT INSTALLER underneath the carport roof, around x1175 y490 in the 1672x941 reference. Standing facing away in a slight three-quarter view, BOTH ARMS RAISED overhead. Keep this exact raised-arm installation pose. Add a small recognizable cordless electric screwdriver/drill in the mannequin's RIGHT hand, pointed upward as if tightening the former overhead roof; keep the wrist and arm positions unchanged. Remove the roof and all posts around the figure.

## pruning

Target: the NAVY BLUE PRUNING WORKER at center-right beside the small tree, around x970 y490 in the 1672x941 reference. Standing with back mostly toward viewer, head turned slightly left, BOTH arms reaching forward-left around shoulder height. Preserve that exact stance and arm reach. Add compact pruning shears in the RIGHT hand at its existing location, with visible short metallic blades. Remove all branches and plants; preserve the worker.

## sakan

Target: the NAVY BLUE PLASTERER in the foreground-right, around x1040 y605 in the 1672x941 reference. Kneeling low on BOTH knees and leaning forward-left, looking down, with right arm reaching toward the floor and the existing trowel near x990 y626. Preserve the exact kneeling and leaning pose and the existing RIGHT-hand flat steel plastering trowel. Remove paving and all ground while keeping the complete hand and trowel.

## block

Target: the NAVY BLUE BLOCKLAYING WORKER at center-left, around x677 y548 in the 1672x941 reference. Low crouching/kneeling stance on the left side of the low block wall, torso leaning forward toward image-right, head looking down at work, right arm reaching forward-right. Preserve the exact knee, leg, back, head and arm pose. Keep a small concrete masonry block in the RIGHT hand at its existing working-hand location, lifted free from the former wall. Preserve its concrete gray material. Remove the entire surrounding wall and ground; only the worker and the block it holds remain.

## supervisor

Target: the NAVY BLUE SITE SUPERVISOR at left-center, around x552 y521 in the 1672x941 reference. Standing upright, hardhat, three-quarter back/side view looking toward image-right, one arm extended horizontally toward image-right, the other bent near the waist. Preserve this exact stance, body orientation and ALL arm positions. Have the mannequin's RIGHT hand hold a small pale architectural plan sheet with very subtle thin plan lines. Keep the extended arm position unchanged, with the sheet held at that same hand location if that is its right hand; do not lower or re-pose the arms. Remove all paving and plants.

## family

Target: ONLY the TERRACOTTA/SALMON-COLORED FAMILY GROUP at foreground-left, around x420 y625 in the 1672x941 reference. It consists of the mother on the left holding a baby, the tall father in the middle, and the standing child on the right. Preserve the exact four-person grouping (two adults, one baby being held, one standing child), poses, arm and leg placement, spacing, back/three-quarter viewing directions, proportions and uniform terracotta/salmon miniature mannequin color. Do not change colors to blue. No tools or extra people. Remove the ground patch, shadows, house, platform and all other scene objects; only the complete family group with transparent gaps between figures remains.

## Supervisor selected version

On 2026-10-24 the user selected the original generated supervisor, pointing with one hand and holding the plan at the waist. Source: `C:/Users/desig/Desktop/exec-dd7d2054-da4f-440a-a35b-00dcfd8f77d8.png`. Converted directly to lossless WebP with the same alpha crop procedure; no new generation or pose edits.


## Approximate common figure scale

Sakan kept at 1330 x 958 pixels. Proportional pixel resizing only, with poses and alpha retained. Factors relative to the previous files: aluminum 1.40, pruning 1.25, sakan 1.00, block 1.00, supervisor 1.30, family 1.75. The preview now shows all assets at the same 20% pixel scale, rather than fitting each asset to its cell.

## 2026-10-24: height 1000 px and local revisions

Latest request supersedes the earlier approximate figure scale. All six tightly cropped assets are now exactly 1000 pixels tall, with widths calculated proportionally. Alpha and visible pixels on black/white were verified after lossless WebP encoding. No website layout references changed.

Built-in image_gen edits: pruning shears requested at 150% linear size; blocklayer left palm presses empty air and right hand holds a raised hammer, with no block; mother has looser naturally draped trousers around hips and seat. Other three assets were only resized.

### pruning

Use case: precise-object-edit. The attached mannequin sprite is the edit target. Preserve exact camera angle, orientation, navy/terracotta colors, material, lighting, full body and all details except the explicitly requested local change. True transparent alpha background; no backdrop, no ground, no cast shadow or glow; tight framing with complete extremities. Change only the existing pruning shears: enlarge the entire shears to 150% of its current linear size, pivoting around the same grip position in the hand. Keep hand, arm and body pose unchanged. The enlarged metal blades and handle must remain recognizable as pruning shears.

### block

Use case: precise-object-edit. The attached mannequin sprite is the edit target. Preserve exact camera angle, orientation, navy/terracotta colors, material, lighting, full body and all details except the explicitly requested local change. True transparent alpha background; no backdrop, no ground, no cast shadow or glow; tight framing with complete extremities. Modify only the task performed by the kneeling blocklayer. The hand currently holding the floating concrete block at image-right is anatomically the LEFT hand. Remove that floating held block. Put a concrete masonry block down at working ground level in front of the worker at image-right, without showing a ground plane. LEFT hand presses firmly on the TOP of this resting block to steady it (not gripping or lifting it). RIGHT hand, which is currently low in the image foreground, now holds a small masonry hammer raised above the block, poised to strike DOWN onto the top of the block. Clearly show a wooden hammer handle and compact metal hammer head directly above the block, no motion lines. Adjust only forearms/hands as required. Keep the original kneeling legs, torso, helmet, navy color, view angle and overall stance. Only one resting block; no floating blocks or wall.

### family

Use case: precise-object-edit. The attached mannequin sprite is the edit target. Preserve exact camera angle, orientation, navy/terracotta colors, material, lighting, full body and all details except the explicitly requested local change. True transparent alpha background; no backdrop, no ground, no cast shadow or glow; tight framing with complete extremities. Change only the MOTHER's clothing around her hips and seat, at image-left holding the baby. Make her trousers naturally loose-fitting around the seat and hips, with gentle fabric drape and subtle folds, avoiding a tight or accentuated buttock outline and center crease. Keep a natural modest relaxed silhouette; do not exaggerate width. Preserve her pose holding the baby and preserve all four family members, spacing, proportions, heads, hands, feet and uniform terracotta color. Father, baby and standing child stay exactly as in the input.

### Block removal follow-up

Use case: precise-object-edit. Edit the attached navy kneeling blocklayer sprite. Remove ONLY the gray concrete block under the extended LEFT palm at lower image-right. Leave empty transparent air where that block was. Keep the LEFT hand and all fingers in exactly their current flat pressing-down pose and location as if steadying an invisible block. Keep the RIGHT hand holding the raised wooden-handled hammer, hammer angle, arms, torso, legs, helmet, colors and all other details exactly unchanged. NO block, NO support, NO wall, NO ground plane, NO shadow. Full body transparent-background sprite with clean alpha.

### Mother clothing refinement

Precise local clothing edit of the attached terracotta family sprite. Change only the mother's trousers at image-left, in the seat/hips area directly below her waistband. The current seat is still tightly molded into two prominent rounded buttocks. Replace that with loose draped trouser fabric: a relaxed straight silhouette from waist over the hips, soft vertical folds falling toward the thighs, no visible central buttock cleft, no two spherical lobes, no stretched fabric. Modest natural everyday loose trousers. Keep the same trouser color, waistband height, wide trouser legs, mother pose and all other family members absolutely unchanged. Do not change the faces, baby, hands, shoes, overall layout or materials. Transparent background, complete four-person family, no ground or shadows.
