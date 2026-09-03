# ZPD Word REV_07 — Self-Validation Report

Build status: **VALIDATED BUILD / DEPLOYMENT CANDIDATE**
Release status: **NOT RELEASE PASS**

## MASTER gate

- Source of Truth: REV_07 bundled in `docs/`.
- Deployment UI review: PASS.
- Function specification: PASS for implemented scope.
- No User-as-QA principle applied: known internal regressions were corrected before packaging.

## Static / package validation

Result: **35/35 PASS**

Covered: syntax, manifest/asset-map parsing, REV_07 cache/version markers, camera/library separation, image preflight, OCR SEE/PAIR, Review-before-Commit, learning chapters, Weak Word Priority, CODE RED Key Lock, Drag & Drop, Tap fallback, immediate wrong-key rejection, strict fake-key exclusion from required blank characters, PASS/TIMEOUT/HINT, RETRACE, Case/Memory separation, FEVER, Pulse Time Gauge, reduced-motion CSS, safe areas, narrow-mobile rules, session-only API key, export/import, REV_06 migration, live-text policy, photo-first Home, asset references, PNG integrity.

## Actual Chromium interaction smoke test

Chromium engine: `/usr/bin/chromium`, page loaded with equivalent inline HTML/CSS/JS because direct localhost/file navigation is blocked in this environment.

Result: **22/22 PASS**

Verified interactions/data:

- onboarding name
- optional avatar step
- guide selection
- guide naming
- Home photo-first CTA
- user/guide visual separation
- Learning Hub
- MEANING CHECK choices
- CONNECTION tiles
- CODE RED slots
- CODE RED keys
- PASS / Hint controls
- wrong Letter Key immediately rejected
- 320px no horizontal page overflow
- no page errors
- schema 7
- Case Mastery / Memory data separation
- API key not persisted in app state
- profile persistence
- learning history structure
- PASS record
- retrace pool update

## Correction made during REV_07 re-validation

The initial fake-key generator could occasionally generate a fake character equal to one of the required blank letters. That created an avoidable ambiguity risk. It was corrected so the fake-key pool explicitly excludes all required blank characters before final validation.

## PENDING LIVE TEST

The following cannot be honestly marked PASS until deployed to a real HTTPS origin:

- direct Service Worker registration and activation
- cache population and old-cache cleanup
- offline relaunch from installed PWA
- update behavior after a new deployment
- install prompt / standalone mode
- production asset-path smoke test

## PENDING DEVICE TEST

The following require an actual phone/device and/or authorized API environment:

- rear camera invocation
- photo-library invocation under mobile browser permissions
- real photographed academy worksheet quality/orientation cases
- real Gemini OCR request and error recovery
- iOS/Android home-screen install behavior
- touch Drag & Drop across supported mobile browsers

## Verdict

The package passes the internal MASTER/UI/function/data/static browser gates that can be executed in this environment and is suitable as a **deployment candidate**. Under REV_07 governance it must not be called `RELEASE PASS` until live HTTPS + Install + Offline + Cache + real-device checks pass.
