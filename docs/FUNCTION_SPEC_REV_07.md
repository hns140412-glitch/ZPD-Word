# ZPD Word Function Specification — REV_07

Status: FUNCTION SPEC APPROVED FOR VALIDATED BUILD

## 1. Onboarding / User Profile

Entry: first launch or explicit profile reset.
Input: display name; optional camera/library image.
State: `onboardingStep`, `profile`, `onboardingDone`.
Data: display name in state; stylized avatar derivative in IndexedDB; original photo is not intentionally persisted long-term.
Error/fallback: photo can be skipped; default avatar remains usable.
Next: Guide creation or Home.

## 2. Guide Creation

Entry: onboarding step after optional avatar.
Input: animal companion choice, emphasis style, recommended/direct name, or skip.
State/data: `guide.id`, `guide.name`, `guide.style`, `guide.voice`.
Rule: no learning-power differences by character/name.
Next: Home.

## 3. Home

Primary action: **사진으로 시험지 만들기**.
Secondary action: continue active/recent case.
Displayed state: active sheet, Case Mastery, current progress, user/guide separation.
Rule: reward/stat/character content must not push the photo-first CTA below the primary hierarchy.

## 4. Camera / Photo Library Intake

Entry: Home or 시험지 tab.
Inputs: `sheetCameraInput` with rear-camera capture; `sheetLibraryInput` without forced capture.
Preflight: file existence/type/size, image decode, dimensions, simple quality warnings.
Normalization: `createImageBitmap` with orientation handling; normalized processing copy for OCR.
Error: unsupported/invalid image produces a specific recovery message and does not alter committed sheet data.
Next: OCR or manual-entry fallback.

## 5. OCR SEE / PAIR

SEE: transcribe only visible word/meaning rows; no examples/hints/invention.
PAIR: validate only the SEE rows and preserve sequence; no new source rows.
Confidence: high/medium/low.
Network: online Gemini request only when a session API key is present.
Fallback: manual entry when OCR/network/API is unavailable.
Next: Review.

## 6. Review Before Commit

Entry: successful OCR output, manual entry, or existing sheet review.
Input: edit/delete/add word/meaning rows.
Rule: nothing becomes a learning item until user commits the reviewed rows.
Commit: create/update a sheet atomically after valid rows exist.
Data: `recognitionMeta`, `sourceType`, `sourceCount`, normalized word records.
Next: Learning Hub.

## 7. FIRST CONTACT

Purpose: acquisition, not testing.
Interaction: see English word, Korean meaning, example, hear English TTS, move through cards.
Data: progress/history and study session counters.
Next: MEANING CHECK.

## 8. MEANING CHECK

Purpose: bidirectional recognition and early weakness detection.
Interaction: four-choice style task; direction can alternate between English→Korean and Korean→English.
Data: correct/wrong response signals feed weak score/history.
Next: CONNECTION.

## 9. CONNECTION

Purpose: fast word↔meaning association.
Interaction: tap matching tiles.
Exposure: broad current-sheet exposure first; weak signals influence later practice.
Next: WEAK WORD / CODE RED readiness.

## 10. WEAK WORD PRIORITY

Signals: wrong, pass, hint, slow-correct and repeated error.
Rule: weak words receive more study opportunity, but stable words are not permanently removed.
Data: per-word counters plus `learningStats`.
Next: CODE RED.

## 11. CODE RED — Key Lock

Target set: all valid words from the current sheet for the first CODE RED pass.
UI: partial spelling + multiple Blank Slots + mixed real/fake Letter Key Tray + Pulse Time Gauge + Hint + PASS + Guide.
Primary input: Drag & Drop.
Accessibility fallback: Tap Key → Tap Slot.
Fake-key rule: fake letters never duplicate any required blank character in the current key set; the generated completion has one valid spelling path under the current interaction model.
Wrong key: immediate rejection; no slot occupation; `wrongAttempts` increments.
Hint: progressive help state; hint-used success is not treated as fully secure.
Timeout: separate TIMEOUT result.
Pass: separate PASS result.
Data: `CORRECT`, `WRONG`, `PASS`, `TIMEOUT`, `HINT_USED` are recorded separately.
Next: RETRACE when unstable words exist; otherwise completion.

## 12. RETRACE

Entry: CODE RED collected unstable target ids.
Purpose: learn again before recall again.
Interaction: meaning/spelling/TTS exposure for only the retrace pool.
Rule: no immediate same-answer repetition directly after failure.
Next: targeted CODE RED with only retrace targets.

## 13. Completion / Memory Event

Case Mastery: current-sheet readiness. Set independently of long-term memory.
Memory Strength: cumulative retention signal.
Optional old-word event: sparse and skippable; it must not reduce completed Case Mastery or block current work.

## 14. Records / Wordbook

Wordbook: current valid words, sorted with weakness status.
Records: Case Mastery, Memory Strength, XP/streak/session history.
Rule: Case and Memory remain separate metrics.

## 15. Data Safety / Migration

Schema: 7.
Primary state key: `zpd_word_state`.
Legacy migration: reads `zpd_rev06_state` when the new key does not exist.
Avatar derivative: IndexedDB.
API key: sessionStorage only; excluded from export.
Export/import: JSON state with migration on import.

## 16. PWA

Manifest: install metadata and icons.
Service Worker cache: `zpd-word-rev07-v1`.
Offline target after successful caching: app shell, stored sheets, learning, records.
Online dependency: new OCR/AI requests.
Release rule: local/static validation is not Release PASS. Live HTTPS, install, offline relaunch, cache/update and real-device camera/OCR remain separate release gates.
