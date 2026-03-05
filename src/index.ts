// ─── Components ────────────────────────────────────────────────────────────────
export { Terminal } from "./components/terminal";

// ─── Themes ────────────────────────────────────────────────────────────────────
export {
  ubuntuTheme,
  archTheme,
  kaliTheme,
  themes,
  getTheme,
  isThemeName,
} from "./themes";

// ─── Hooks ─────────────────────────────────────────────────────────────────────
export { useTypewriter } from "./hooks/useTypewriter";

// ─── Types (re-exported so consumers don't need a separate import path) ─────────
export type {
  ThemeName,
  TerminalTheme,
  CommandEntry,
  TerminalProps,
  UseTypewriterOptions,
  UseTypewriterReturn,
} from "./types";
