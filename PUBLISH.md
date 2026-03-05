# Publishing to npm

## Before first publish

1. **Create a GitHub repo** (if you haven’t) and push this project.

2. **Update `package.json`**:
   - Replace `YOUR_USERNAME` in `repository`, `homepage`, and `bugs` with your GitHub username (or org).
   - Set `"author"` to your name/email if you want, e.g. `"Your Name <you@example.com>"`.

3. **Check the package name**: `react-linux-terminals` might already be taken on npm. If so:
   - Use a scoped name: `"name": "@YOUR_USERNAME/react-linux-terminals"`.
   - Then installs will be: `npm install @YOUR_USERNAME/react-linux-terminals`.

4. **Add a LICENSE file** in the repo root (e.g. MIT) so `npm publish` doesn’t warn.

---

## Publish

```bash
# Log in to npm (one-time, or when your token expires)
npm login

# Bump version (patch = 0.1.0 → 0.1.1)
npm version patch

# Publish (use --access public if the package is scoped, e.g. @user/react-linux-terminals)
npm publish --access public
```

`prepublishOnly` will run `typecheck` and `build` before publish, so `dist/` is always fresh.

---

## Local development with another app (no link)

**Recommended:** use a **file dependency** in your demo app so you don’t need `npm link`:

In the demo app’s `package.json`:

```json
"dependencies": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-linux-terminals": "file:../react-linux-terminals"
}
```

Then in the demo folder:

```bash
npm install
npm run dev
```

After you change the library, run `npm run build` in the library, then `npm install` again in the demo (or restart the dev server) to pick up changes.

---

## If you use `npm link`

**Link the library (in this repo):**

```bash
cd c:\coding\npm\react-linux-terminals
npm run build
npm link
```

**Use it in another project:**

```bash
cd path\to\your\app
npm link react-linux-terminals
npm run dev
```

**Stop using the linked package:**

In the **app** that was using the link:

```bash
npm unlink react-linux-terminals
npm install
```

In the **library** (this repo), to remove the global link:

```bash
npm run link:off
```

(or `npm unlink`).

---

## Summary of scripts

| Script            | What it does                                      |
|-------------------|---------------------------------------------------|
| `npm run build`   | Build library → `dist/` (what gets published)    |
| `npm run build:demo` | Build demo → `preview/` (local only)           |
| `npm run build:all`  | Build library + demo                             |
| `npm run demo:serve` | Serve `preview/` at http://localhost:4173      |
| `npm run link:off`   | Run `npm unlink` in this package                |
| `npm run typecheck`  | Type-check without emitting files               |
