# react-linux-terminals

A React component that renders a Linux-style terminal window with a macOS-like title bar, themeable colors, and optional typewriter animation. Perfect for portfolios, docs, or landing pages.

![Demo screenshot — add a screenshot of your terminal demo here](https://via.placeholder.com/800x450/1a1a2e/eeeeee?text=react-linux-terminals+Demo)

---

## Install

```bash
npm install react-linux-terminals
```

**Peer dependencies:** React 18 or 19.

---

## Quick example

```tsx
import { Terminal, themes } from "react-linux-terminals";

function App() {
  return (
    <Terminal
      theme={themes.ubuntu}
      username="alice"
      hostname="dev-box"
      workingDirectory="~/projects"
      commands={[
        "ls -la",
        {
          input: "cat /etc/os-release",
          output: ["PRETTY_NAME=\"Ubuntu 24.04 LTS\"", "NAME=\"Ubuntu\""],
        },
      ]}
      cursorBlink
      typewriterEffect
      showHeader
    />
  );
}
```

Don’t forget to keep the default styles: the package ships CSS that is applied when you import the component (side-effect).

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|--------------|
| `theme` | `"ubuntu" \| "arch" \| "kali"` or `TerminalTheme` | — | Preset name or custom theme object. |
| `commands` | `Array<string \| CommandEntry>` | `[]` | Commands to show. Strings = input only; objects can include `output` and `isError`. |
| `username` | `string` | `"user"` | Username in the prompt. |
| `hostname` | `string` | `"localhost"` | Hostname in the prompt. |
| `workingDirectory` | `string` | `"~"` | Current path in the prompt. |
| `showPrompt` | `boolean` | `true` | Show `user@host:path$` before each command. |
| `showHeader` | `boolean` | `true` | Show the window bar with red/yellow/green buttons. |
| `cursorBlink` | `boolean` | `true` | Blink the cursor. |
| `typewriterEffect` | `boolean` | `false` | Animate the last command character-by-character. |
| `typewriterSpeed` | `number` | `40` | Delay per character (ms) when `typewriterEffect` is on. |
| `className` | `string` | — | Extra class on the root element. |
| `style` | `React.CSSProperties` | — | Inline styles on the root element. |

### CommandEntry

```ts
interface CommandEntry {
  input: string;        // The command line
  output?: string[];    // Lines of output
  isError?: boolean;    // Style output as error (e.g. red)
}
```

---

## Themes

Three built-in themes: **Ubuntu**, **Arch**, **Kali**.

```tsx
import { Terminal, themes } from "react-linux-terminals";

// By name
<Terminal theme="ubuntu" commands={["neofetch"]} />
<Terminal theme={themes.arch} commands={["pacman -Syu"]} />
<Terminal theme={themes.kali} commands={["whoami"]} />
```

Optional subpath for themes only:

```tsx
import { getTheme, themes } from "react-linux-terminals/themes";

const ubuntu = getTheme("ubuntu");
```

You can pass a full **custom theme** object (see `TerminalTheme` in the types) for your own colors and labels.

---

## useTypewriter hook

For custom UIs that need the same typing effect:

```tsx
import { useTypewriter } from "react-linux-terminals";

const { displayedText, isTyping, reset } = useTypewriter({
  text: "Hello, world!",
  speed: 50,
  autoStart: true,
});
```

---

## Development

```bash
# Build library → dist/
npm run build

# Build demo → preview/
npm run build:demo

# Serve demo at http://localhost:4173/demo.html
npm run demo:serve

# Type-check
npm run typecheck
```

See **PUBLISH.md** for publishing and `npm link` / unlink steps.

---

## License

MIT
