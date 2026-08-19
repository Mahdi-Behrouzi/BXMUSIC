# BXMUSIC — refactor/split-structure

This branch creates an initial module scaffold so the project can be
migrated from the single-file `script.js` into a modular `js/` layout.

What I changed in this branch:

- Replaced the inline script include in `index.html` with a module entrypoint:
  `<script type="module" src="js/app.js"></script>`
- Added `js/app.js` which waits for DOMContentLoaded and injects the
  existing `script.js` (legacy) to preserve current behavior.
- Created placeholder module files under `js/` (data/, store/, components/, pages/, utils/).

Why this approach?
- It is low-risk: the existing `script.js` is still loaded and runs as before.
- It creates a place to gradually move code out of `script.js` into modules.

Run locally
-----------

1) Serve the project with a static server (recommended):

- Python 3:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

- Node (if you have npm):

```bash
npx http-server -p 8000
# or
npx serve -p 8000
```

2) Open the URL and check DevTools console for any runtime errors.

Next steps I can do for you
---------------------------
- Move portions of `script.js` into the new module files (data -> `js/data/*.js`, store -> `js/store/*`, components -> `js/components/*`).
- Rename `script.js` to `js/legacy/script.legacy.js` and update app.js to load that file instead.
- Replace inline `onclick` handlers with JS-attached event listeners and stop exposing globals.

Tell me which next step you prefer and I will continue on this branch and open a PR.
