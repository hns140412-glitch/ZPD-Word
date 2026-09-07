# Hide & Seek Deployment

Deploy the contents of this folder to the site root of an HTTPS static host such as Netlify.

Current product master: `Hide_Seek_UI_MASTER_LOGIC_REV_04.md`

## Before deploy

- Keep directory structure unchanged.
- Do not add long-lived AI/API credentials to source files.
- Preserve existing learner data during world/name migration.
- Verify current product title is Hide & Seek.
- Verify no police/detective/arrest/case child-facing wording remains.

## Live deployment gate

After deploy, test the real URL in this order:

1. first load and asset-path smoke test
2. manifest availability and Hide & Seek installed name
3. Service Worker registration/activation
4. create one test sheet by camera and by photo library
5. rapid capture: shutter → immediate temp save → next shot
6. OCR SEE → PAIR → Review → Commit with an authorized API environment
7. FIRST FIND → MEANING CLUE → CONNECTION TRAIL → HIDDEN WORDS → FINAL SEEK → SEEK AGAIN
8. close/reopen and verify saved progress
9. install to home screen / standalone launch
10. load once online, then disable network and reopen
11. verify cached shell and previously stored learning data
12. deploy a changed cache version and verify update/old-cache cleanup
13. scan visible UI for legacy product/police/detective/arrest/case terminology

Only after those checks can the deployment advance to `RELEASE PASS`.

`DEPLOYED ≠ RELEASE PASS`
