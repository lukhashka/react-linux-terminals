export { ubuntuTheme } from "./ubuntu";
export { archTheme } from "./arch";
export { kaliTheme } from "./kali";

import { ubuntuTheme } from "./ubuntu";
import { archTheme } from "./arch";
import { kaliTheme } from "./kali";
import type { ThemeName, TerminalTheme } from "../types";

/**
 * Lookup map — use `getTheme("kali")` to resolve a preset by name.
 */
export const themes: Record<ThemeName, TerminalTheme> = {
  ubuntu: ubuntuTheme,
  arch: archTheme,
  kali: kaliTheme,
};

/**
 * Returns the built-in theme for the given name.
 *
 * @example
 * const theme = getTheme("ubuntu");
 */
export function getTheme(name: ThemeName): TerminalTheme {
  return themes[name];
}

/**
 * Type guard — returns `true` if the value is a recognised `ThemeName` string.
 */
export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === "string" && value in themes;
}
