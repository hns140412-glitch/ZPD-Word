# Hide & Seek Runtime Migration — REV_00

Status: IMPLEMENTATION BRANCH / NOT MAIN / NOT DEPLOYED / NOT RELEASED
Branch: `implementation/hide-runtime-rapid-capture-20260907`
Master owner: `Hide_Seek_UI_MASTER_LOGIC_REV_03.md`

## Purpose
Realize the current Hide & Seek master contracts without changing unresolved product-policy items.

## Implemented in this branch

### Rapid Capture
- sheet camera/library inputs are migrated to a persistent CaptureSession flow;
- each selected image is preflight-checked and written to IndexedDB before capture state advances;
- no per-shot confirmation/classification modal is inserted;
- multiple library images are accepted;
- camera flow returns to a shutter-first capture surface;
- `ANALYZE ≠ END CAPTURE`;
- after analysis the user may select `이어서 촬영하기`;
- interrupted local capture state resumes on next load when recoverable.

### Analysis Batch
- only pages whose analysis state is not `ANALYZED` are analyzed;
- each batch has `batchId`, page references, start/completion state and issues;
- targeted retake clears only the selected page OCR result and preserves unaffected pages;
- subsequent analysis reprocesses only pending/error pages.

### OCR Review Provenance
- low-confidence rows remain `needsReview=true`;
- a low-confidence row is resolved only by explicit user edit or explicit user acceptance;
- commit is blocked while any row is unresolved or incomplete;
- committed sheet recognition metadata preserves CaptureSession/AnalysisBatch trace.

### Local source continuity
- capture blobs are stored in the existing IndexedDB asset store;
- committed capture history preserves page/blob references instead of silently orphaning the source pointer;
- explicit user page deletion deletes that selected local blob;
- targeted retake replaces only the selected page original.

### Device contract
- manifest orientation is loosened to `any` on this implementation branch so tablet landscape is not blocked by the PWA manifest;
- phone landscape receives a runtime guard for short-height landscape viewports;
- tablet layout uses usable-height-based scale ceilings in the migration stylesheet.

### Offline shell
- service worker cache includes the migration JS/CSS and uses a new cache key.

## Deliberately not changed
- installed product name / icon / full legacy copy migration: waits for the existing UI-freeze release gate;
- XP / streak / level / calendar / themes policy: remains `DESIGN_AUTHORITY_REVIEW_REQUIRED`;
- exact CaptureSession schema is implementation-owned, not promoted to a new Master hard lock;
- no deployment, Netlify production change or main-branch merge;
- no Gemini credential architecture change.

## Validation performed
- new runtime JS: `node --check` PASS;
- Git blob SHA of locally syntax-checked JS matched GitHub written blob SHA;
- main→implementation branch diff verified as additive/scope-limited;
- main branch remains unchanged by this runtime migration.

## Validation still required
- real Safari/iPhone camera loop;
- iPad portrait/landscape behavior;
- IndexedDB persistence after reload/background/low-storage conditions;
- real Gemini OCR batch behavior and error/rate-limit paths;
- low-confidence edit/accept UI behavior;
- targeted retake and affected-only reanalysis with actual images;
- PWA service-worker update behavior;
- full child-facing Hide & Seek branding/copy after UI freeze.

`IMPLEMENTATION BRANCH PASS ≠ RUNTIME E2E PASS ≠ DEPLOY PASS ≠ RELEASE PASS`
