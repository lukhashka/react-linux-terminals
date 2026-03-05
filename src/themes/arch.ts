import type { TerminalTheme } from "../types";

export const archTheme: TerminalTheme = {
  name: "arch",

  // Classic Arch: pure black terminal
  background: "#0d0d0d",
  foreground: "#d8d8d8",

  // Arch default prompt is cyan user@host, no frills
  promptUser: "#5bc8af",   // teal/cyan — Arch blue-ish
  promptHost: "#5bc8af",
  promptPath: "#a89984",   // muted warm gray
  promptSymbol: "#ebdbb2", // gruvbox cream

  cursorColor: "#5bc8af",

  titleBarBackground: "#1a1a1a",
  titleBarForeground: "#a89984",

  windowTitle: "~",
  shellLabel: "zsh",
};

