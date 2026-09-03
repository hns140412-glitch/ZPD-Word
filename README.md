# ZPD Word PWA — REV_07 VALIDATED BUILD

This package is built against `## ZPD Word Ui Master Logic REV_07##.md` and the approved fourth deployment visual concept.

## What changed from REV_06

- Photo-first Home hierarchy restored.
- Pastel high-density nature-city deployment UI refined.
- Functional text remains live DOM, never baked generated-image text.
- Full learning path: FIRST CONTACT → MEANING CHECK → CONNECTION → WEAK WORD → CODE RED → RETRACE.
- CODE RED Key Lock with Blank Slots, real/fake Letter Keys, Drag & Drop, Tap fallback, PASS, Hint, Timeout, Pulse Time Gauge.
- Fake keys cannot equal the required blank characters.
- Camera and photo-library inputs are separated.
- Image preflight/normalization added before OCR.
- OCR SEE / PAIR / Review-before-Commit retained and clarified.
- Schema upgraded to 7 with REV_06 state migration.
- Gemini key is session-only; public deployments should use a server/Edge proxy.
- PWA cache version updated to REV_07.

## Validation status

Internal static/package checks: PASS.
Actual Chromium interaction/data smoke checks: PASS.

This is a **VALIDATED BUILD / DEPLOYMENT CANDIDATE**, not a Release PASS. Real HTTPS Service Worker, Install/Offline/Cache, real camera/photo permissions, mobile touch behavior, and real OCR must still be verified after deployment.

See `docs/SELF_VALIDATION_REV_07.md`, `docs/UI_REVIEW_REV_07.md`, and `docs/FUNCTION_SPEC_REV_07.md`.
