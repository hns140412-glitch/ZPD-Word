# ZPD Word REV_07 Deployment

Deploy the contents of this folder to the site root of an HTTPS static host such as GitHub Pages or Netlify.

## Before deploy

- Keep directory structure unchanged.
- Do not add a long-lived Gemini API key to source files.
- For personal testing, the UI accepts a key for the current session only.
- For public/shared deployment, protect AI credentials behind a server/Edge proxy.

## Live deployment gate

After deploy, test the real URL in this order:

1. first load and asset-path smoke test
2. manifest availability
3. Service Worker registration/activation
4. create one test sheet by camera and by photo library
5. OCR SEE → PAIR → Review → Commit with an authorized API environment
6. FIRST CONTACT → MEANING CHECK → CONNECTION → WEAK WORD → CODE RED → RETRACE
7. close/reopen and verify saved progress
8. install to home screen / standalone launch
9. load once online, then disable network and reopen
10. verify cached shell and previously stored learning data
11. deploy a changed cache version and verify update/old-cache cleanup

Only after those checks can the deployment advance from `DEPLOYED RC` / `LIVE VALIDATED RC` to `RELEASE PASS`.
