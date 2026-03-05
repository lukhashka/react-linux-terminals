import type { TerminalTheme } from "../types";

export const ubuntuTheme: TerminalTheme = {
  name: "ubuntu",

  // Ubuntu's signature dark aubergine terminal background
  background: "#300a24",
  foreground: "#ffffff",

  // Prompt colors match the default Ubuntu bash PS1
  promptUser: "#4ce54c",   // bright green
  promptHost: "#4ce54c",   // bright green
  promptPath: "#729fcf",   // ubuntu blue
  promptSymbol: "#ffffff", // white $

  cursorColor: "#ffffff",

  // Title bar mirrors the Unity/GNOME header bar
  titleBarBackground: "#3c3b37",
  titleBarForeground: "#eeeeec",

  windowTitle: "Terminal",
  shellLabel: "bash",
};

