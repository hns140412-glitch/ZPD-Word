# ZPD Word Deployment UI Review — REV_07

Status: DEPLOYMENT UI BASELINE — PASS FOR BUILD
Master: `## ZPD Word Ui Master Logic REV_07##.md`
Visual reference: approved fourth concept board `a_wide_promotional_collage_image_for_a_mobile_pwa.png`

## Review conclusion

The fourth concept is treated as the visual baseline, not as a bitmap screen to ship. The runtime UI uses raster artwork only for background, character, and decorative illustration. All functional copy, word spelling, buttons, choices, progress, CODE RED Letter Keys, Blank Slots, and gauges are live HTML/CSS/JS.

## Corrections from the previous deployment build

- Home priority changed to **사진으로 시험지 만들기** as the strongest primary CTA.
- User profile and Guide companion are visually separated: USER is protagonist; GUIDE is companion.
- Full learning path restored: FIRST CONTACT → MEANING CHECK → CONNECTION → WEAK WORD → CODE RED → RETRACE.
- CODE RED is visually enforced as partial spelling + Blank Slots + mixed Letter Key Tray, with Drag & Drop and Tap fallback.
- Wrong Letter Key is rejected immediately and does not occupy a slot.
- Pulse Time Gauge is visually distinct from Flow/Fever progress.
- Guide remains secondary to the current learning task and never intentionally covers question/CTA/Key/Slot areas.
- UI palette is softened toward pastel Leaf Green / Mint / Sky with nature-city depth; Police Red/Blue are state accents rather than default background colors.
- Repetitive cream/white stacked-card treatment was reduced through world hero, tinted materials, spatial sections, and illustrated context.
- Mobile safe areas and bottom navigation are preserved.
- Functional text is never dependent on generated-image typography.

## Visual regression gate

PASS criteria applied:

- Bright original animal-city investigation world.
- No commercial character names/logos in runtime copy.
- Task > learning information > progress > guide > decoration hierarchy.
- Photo-first home entry remains visually dominant.
- CODE RED does not regress to key/lock choice or multiple-choice UI.
- 320px width does not introduce horizontal page overflow in the Chromium smoke test.

## Known limitation

The user-photo avatar in this static PWA is a local privacy-preserving Canvas stylization, not a full server-side generative 2.5D redraw. This is intentionally kept optional and does not block test-sheet creation or learning.
