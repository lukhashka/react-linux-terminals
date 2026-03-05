import type { TerminalTheme } from "../types";

export const kaliTheme: TerminalTheme = {
  name: "kali",

  // Kali's dark slate background
  background: "#1a1a2e",
  foreground: "#e0e0e0",

  // Kali's iconic blue prompt  (root prompt uses red #)
  promptUser: "#268bd2",   // bright blue
  promptHost: "#268bd2",
  promptPath: "#2aa198",   // teal
  promptSymbol: "#dc322f", // red # (Kali defaults to root)

  cursorColor: "#268bd2",

  titleBarBackground: "#16213e",
  titleBarForeground: "#7eb2dd",

  windowTitle: "Kali Terminal",
  shellLabel: "zsh",
};

