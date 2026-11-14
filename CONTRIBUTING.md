# Contributing to Iris

Thanks for helping Iris grow! 🌸

## Getting set up

```bash
git clone https://github.com/thebluedogcorp/iris.git
cd iris
bun install
bun run dev       # http://localhost:3000
```

## Ground rules

- **`bun run lint` must pass.** CI enforces it on every PR.
- **Keep the engine framework-agnostic.** Nothing in `src/iris/engine/` may
  import React — the engine is designed to be embeddable in any host
  (browser, Electron, future native shells). React lives in `src/iris/ui/`.
- **Match the existing style.** TypeScript strict mode, functional React
  components, Zustand for editor state, Tailwind for styling.
- **No telemetry, ever.** If your change involves the network, it must be
  opt-in and clearly disclosed (see the roadmap's "Iris Cloud" boundary).

## Making changes

1. Fork, then create a branch: `feat/my-feature` or `fix/my-bugfix`.
2. Make your change with focused, well-described commits.
3. Test manually in the studio: create a document, draw, undo/redo, save a
   `.iris` file, reopen it, export PNG/SVG.
4. For UI changes, include before/after screenshots in your PR.
5. Open a pull request against `main`.

## Reporting bugs

Open an issue with:

- What you did, what you expected, what happened
- Browser + OS + version
- Console output (the studio logs errors to the browser console)
- A `.iris` file that reproduces the problem, if applicable

## Feature ideas

Check the [roadmap](./README.md#-roadmap) first — if your idea is on it,
comment on the relevant issue. If not, open a discussion; we would love to
hear it.

## License

By contributing you agree that your contributions are licensed under the
[MIT License](./LICENSE).
