# Task: iris-ui-4 — CommentLayer / PresentationView / ShareDialog / HelpButton

Agent: ui-components-agent

## Files created (only these 4; no other files touched)

- `src/iris/ui/CommentLayer.tsx` — comment pins overlay (absolute inset-0, pointer-events-none
  wrapper; pins at `RULER_ACTIVE + worldToScreen(...)` with translate(-14px,-14px);
  28px pins, author initial, resolved = #383838 + inline SVG check; 260px popover with
  author/timeAgo/delete, textarea, Resolve toggle, Save (empty text -> deleteComment);
  pins z-10, active card z-30; hidden when `!showComments || presenting`).
- `src/iris/ui/PresentationView.tsx` — fullscreen present mode (fixed inset-0 z-[80]
  bg #1E1E1E). Fits current frame AABB (nodeWorldAABB) into window with 32px margin,
  dpr-aware canvas, preloads subtree images via `loadImage`, draws via
  `drawNodes(ctx, doc, pageId, 1, [frame.id])` wrapped in `setExportPass(true/false)`.
  Keys: Right/Down/Space/PageDown next, Left/Up/PageUp prev, Home/End, Esc exits
  (all preventDefault). Click canvas advances. Bottom-center pill bar with frame name +
  counter + prev/next chevrons; "Esc to exit" hint top-right; empty-state message when
  no frames.
- `src/iris/ui/ShareDialog.tsx` — modal when `shareOpen` (z-[70], backdrop close).
  440px card: header w/ doc name, preview notice, readonly link
  `https://iris.local/preview/{docId ?? 'untitled'}` + Copy link (clipboard API with
  execCommand fallback + toast), permission select (view/comment), collaborator row
  (TU avatar, Test User, you@iris.studio, Owner), footer note. Esc closes.
- `src/iris/ui/HelpButton.tsx` — 36px circle bottom-right (absolute bottom-4 right-4
  z-20), CircleHelp 18px, opens shortcuts overlay via `setShortcutsOpen(true)`.

## API verification results

- `loadImage` IS exported from `src/iris/engine/imageCache.ts` (also `getImage`,
  `onImageCacheChange`) — used `loadImage` for presentation preloading. No mismatch.
- Store fields/actions matched the brief exactly: `doc`, `docId: ID | null`,
  `currentPageId`, `viewport`, `viewFlags.rulers`, `activeCommentId`, `showComments`,
  `presenting`, `shareOpen`, `toast`, `setActiveComment`, `updateComment`,
  `deleteComment`, `setPresenting`, `setShareOpen`, `setShortcutsOpen`.
- Geometry: `worldToScreen(vp, x, y)`, `RULER = 20`, `nodeWorldAABB(doc, node)` confirmed.
- Renderer: `drawNodes(ctx, doc, pageId, alpha, ids?)` and `setExportPass(v)` confirmed.

## Deviations / notes

- Spec suggested syncing the comment draft text via useEffect; the project's ESLint
  enables `react-hooks/set-state-in-effect` (error), so the equivalent key-based
  remount pattern is used instead: `<CommentCard key={comment.id}>` initializes
  `useState(comment.text)` and the textarea uses `autoFocus`. Behavior is identical
  (re-sync + focus whenever activeCommentId changes).
- Engine's global keydown does not currently suppress keys while `presenting`
  (tools.ts `onKeyDown` only checks exportOpen/shortcutsOpen, though its Escape
  branch does exit presenting). Per the brief this suppression is assumed to be added
  by the concurrent agent; PresentationView's own handler is self-sufficient either way.

## Verification

- `bunx tsc --noEmit -p tsconfig.json`: zero errors in these 4 files (remaining errors
  are IrisApp.tsx missing ./LeftPanel + ./LeftRail — concurrent agent's files — and an
  unrelated skills/image-edit script).
- `bunx eslint <4 files>`: zero errors, zero warnings.
- lucide-react 0.525 exports confirmed: CircleHelp, ChevronLeft, ChevronRight, Check,
  Trash2, X.
