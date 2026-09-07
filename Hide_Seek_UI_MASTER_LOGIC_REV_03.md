# Hide & Seek Ui Master Logic — REV_03

> Status: FORMAL BASELINE / SOURCE OF TRUTH
> Date: 2026-09-06
> Previous Product Baseline: ZPD Word UI Master REV_02 learning core
> Shared Contract: `TAKY/MASTER/LEARNING_APP_FAMILY_MASTER_REV_01.md`
> Product Name: **Hide & Seek**
> Tagline: **머릿속에 숨어버린 단어 찾기**

REV_03 replaces the child-facing ZPD/police-capture brand concept while preserving validated vocabulary learning, capture/OCR safety and spaced retrieval logic unless explicitly changed below.

## 1. PRODUCT ROLE — HARD LOCK

Hide & Seek is the connected island's vocabulary discovery and retrieval specialist.

Child-facing experience:
`WORD DISCOVERED → WORD HIDES → CLUE → FIND/RETRIEVE → SPEAK/USE → HIDES AGAIN → FIND AGAIN → STABLE MEMORY`

Do not expose educational jargon such as ZPD as the primary child-facing concept.

## 2. BRAND / WORLD REPLACEMENT

Replace the prior police/capture metaphor with hide-and-seek exploration.

Possible hiding environments may include forest, beach, cave, under-ground/under-floor ruins, secret containers and other island locations.

World styling must remain original and must not imitate a copyrighted commercial game world.

## 3. PRESERVE LEARNING CORE

Preserve reliable source intake and vocabulary learning functions, including:
- camera/photo vocabulary-list intake,
- trustworthy word/meaning pairing,
- review-before-commit for uncertain OCR,
- bidirectional retrieval,
- speaking/TTS where supported,
- repeated recall of missed/weak words,
- multiple worksheet/list sets and separate/combined statistics where useful.

Visual metaphor changes must not reduce capture/OCR reliability.

## 3.1 SHARED ASSIGNMENT / RAPID CAPTURE INHERITANCE — HARD LOCK

When Hide & Seek renders or calls the shared GUIDE assignment/camera intake, it inherits the shared capture meaning from `TAKY/OS/GUIDE_FAMILY_LEARNING_OS.md`:

`SHUTTER → IMMEDIATE TEMP SAVE → NEXT SHOT`

`ANALYZE ≠ END CAPTURE`
`BATCH ANALYZED ≠ SESSION CLOSED`

A targeted retake SHALL preserve unaffected valid photos/results and reprocess only affected evidence where safe.

Hide & Seek continues to own vocabulary-specific OCR/retrieval semantics; it does not absorb MAIN assignment authority.

## 3.2 OCR REVIEW PROVENANCE — HARD LOCK

`OCR DRAFT ≠ CONFIRMED WORD SET`

A low-confidence / `needsReview` item SHALL NOT become confirmed solely because a batch commit action occurred.
Confirmation requires a valid explicit resolution state such as user correction, user acceptance, or project-approved deterministic evidence.

## 4. CONNECTED SESSION CONTRACT

When called from Ready & Set:
- inherit `session_id / goal_id / task_id / lap_id / return_target`,
- app switch does not pause/reset the shared timer,
- app switch does not end the current Lap,
- Hide & Seek owns vocabulary-task results only,
- return `COMPLETED / PARTIAL / BLOCKED / HELP_NEEDED` as task-level state,
- never close the full Ready & Set session.

## 5. SNAP & POP HANDOFF

A retrieved word may become expression material for Snap & Pop.

Example:
`FIND WORD → SPEAK WORD → SEND WORD/CONTEXT TO SNAP & POP → CHILD MAKES SENTENCE OR SPEAKS → RESULT RETURNS TO SHARED LEARNING HISTORY`

Do not create a duplicate independent long-term vocabulary registry inside Snap & Pop.

## 6. RADIO / GUIDE

Use the existing shared Guide persona and radio connection concept.

Guide may give a minimal clue or short support, but must not reveal every answer immediately.

Clue use is a learning event, not a punishment.

## 7. IMAGINATION CLOUD

Hide & Seek may call the shared Imagination Cloud when a word's meaning, context or image association would materially help retrieval.

Rules:
- child question may trigger it,
- visual/context support must explain rather than decorate,
- do not replace retrieval effort with answer display,
- preserve session/task/lap,
- return to the same vocabulary task.

## 8. REWARD IDENTITY

Hide & Seek may use its own found-word/hidden-word/treasure-style collection feedback.

Do not copy Snap & Pop's gem/wish/blessing economy wholesale.
Do not make reward accumulation more important than actual retrieval.

Historical/runtime reward mechanics such as XP, streak, level, calendar, themes, best record or achievements SHALL NOT be silently promoted to protected Hide & Seek identity or silently removed while current product authority remains unresolved.

## 9. DEVICE / RESPONSIVE CONTRACT — HARD LOCK

Phone:
- Portrait Only.

Tablet:
- Portrait + Landscape.

Tablet UI Scale Ceiling:
- landscape usable height.

Additional tablet width should expand World / Environment before inflating the core UI into an oversized phone-like surface.

`TEXT IS NEVER BAKED INTO IMAGE`
`BACKGROUND ≠ UI`
`SYSTEM FACT ≠ GUIDE VOICE`

Unintended overlap, excessive separation, clipping, broken alignment/anchoring or alternate-orientation composition failure = FAIL.

## 10. PWA SAFE AUTO-UPDATE — HARD LOCK

Inherit shared update strategy:
`GITHUB PUSH → HOST AUTO DEPLOY → AUTO VERSION DETECT → PREPARE UPDATE → APPLY AT SAFE POINT`

Never force reload during an active shared session or active vocabulary attempt.
Persist current sheet/list, word position, task/lap/session identifiers and committed results before activation.

## 11. APP NAME / ICON RELEASE GATE

Master product name is now **Hide & Seek**, but installed-app manifest/name/icon changes should be released together after the new UI/visual direction is approved.

At UI freeze:
- create an original ultra-high-density illustration master icon,
- derive required PWA/Apple touch icon sizes,
- update manifest `name`, `short_name`, icons and relevant title metadata,
- test Safari + iPhone Home Screen installation/update behavior,
- verify no stale ZPD Word/police branding remains in the approved release.

## 12. REGRESSION FAIL CONDITIONS

FAIL if:
- old police/capture concept remains dominant in final approved child UI,
- OCR/capture safety is weakened for visual novelty,
- a low-confidence OCR item is silently promoted to confirmed without a valid resolution state,
- rapid shared capture inserts per-shot blocking confirmation/classification,
- analysis is treated as automatic capture-session termination,
- phone/tablet orientation behavior contradicts the device contract,
- app switch resets timer/session/lap,
- Hide & Seek completes the whole multi-task session,
- clues reveal answers by default,
- Imagination Cloud bypasses retrieval,
- vocabulary results become isolated from shared Learning History,
- app update interrupts active learning.

END — HIDE & SEEK UI MASTER LOGIC REV_03
