import { useMemo, useRef, useEffect } from "react";
import type { TerminalProps, TerminalTheme, CommandEntry } from "../types";
import { themes, isThemeName } from "../themes";
import { useTypewriter } from "../hooks";
import styles from "./terminal.module.css";

// ─── Internal sub-components ───────────────────────────────────────────────────

interface PromptProps {
  username: string;
  hostname: string;
  workingDirectory: string;
  theme: TerminalTheme;
  showPrompt: boolean;
}

function Prompt({
  username,
  hostname,
  workingDirectory,
  theme,
  showPrompt,
}: PromptProps) {
  if (!showPrompt) return null;
  return (
    <span className={styles.prompt}>
      <span className={styles.promptUser} style={{ color: theme.promptUser }}>
        {username}
      </span>
      <span className={styles.promptAt}>@</span>
      <span className={styles.promptHost} style={{ color: theme.promptHost }}>
        {hostname}
      </span>
      <span className={styles.promptColon}>:</span>
      <span className={styles.promptPath} style={{ color: theme.promptPath }}>
        {workingDirectory}
      </span>
      <span
        className={styles.promptSymbol}
        style={{ color: theme.promptSymbol }}
      >
        $
      </span>
    </span>
  );
}

interface CursorProps {
  color: string;
  blink: boolean;
}

function Cursor({ color, blink }: CursorProps) {
  return (
    <span
      className={`${styles.cursor} ${blink ? styles.cursorBlink : ""}`}
      style={{ background: color }}
      aria-hidden="true"
    />
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function normaliseCommand(raw: string | CommandEntry): CommandEntry {
  return typeof raw === "string" ? { input: raw } : raw;
}

function resolveTheme(raw: TerminalProps["theme"]): TerminalTheme {
  if (!raw) return themes.ubuntu;
  if (isThemeName(raw)) return themes[raw];
  return raw as TerminalTheme;
}

// ─── Typewriter-aware command line ─────────────────────────────────────────────

interface TypewriterCommandProps {
  entry: CommandEntry;
  isLast: boolean;
  username: string;
  hostname: string;
  workingDirectory: string;
  theme: TerminalTheme;
  showPrompt: boolean;
  cursorBlink: boolean;
  typewriterEffect: boolean;
  typewriterSpeed: number;
}

function TypewriterCommand({
  entry,
  isLast,
  username,
  hostname,
  workingDirectory,
  theme,
  showPrompt,
  cursorBlink,
  typewriterEffect,
  typewriterSpeed,
}: TypewriterCommandProps) {
  const { displayedText, isTyping } = useTypewriter({
    text: entry.input,
    speed: typewriterSpeed,
    autoStart: typewriterEffect && isLast,
  });

  const visibleText = typewriterEffect && isLast ? displayedText : entry.input;
  const showCursor = isLast && (isTyping || !typewriterEffect);

  return (
    <div className={styles.fadeIn}>
      <div className={styles.commandRow}>
        <Prompt
          username={username}
          hostname={hostname}
          workingDirectory={workingDirectory}
          theme={theme}
          showPrompt={showPrompt}
        />
        <span
          className={styles.commandText}
          style={{ color: theme.foreground }}
        >
          {visibleText}
        </span>
        {showCursor && <Cursor color={theme.cursorColor} blink={cursorBlink} />}
      </div>

      {entry.output?.map((line, i) => (
        <div
          key={i}
          className={`${styles.outputLine} ${entry.isError ? styles.outputLineError : ""}`}
          style={{ color: entry.isError ? undefined : theme.foreground }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

// ─── Main Terminal component ───────────────────────────────────────────────────

/**
 * `<Terminal>` — renders a Linux-style terminal window.
 *
 * @example
 * <Terminal
 *   theme="ubuntu"
 *   username="alice"
 *   hostname="dev-box"
 *   commands={["ls -la", { input: "cat /etc/os-release", output: ["Ubuntu 24.04 LTS"] }]}
 *   cursorBlink
 *   typewriterEffect
 * />
 */
export function Terminal({
  theme: themeProp,
  commands = [],
  showPrompt = true,
  cursorBlink = true,
  username = "user",
  hostname = "localhost",
  workingDirectory = "~",
  typewriterEffect = false,
  typewriterSpeed = 40,
  showWindowChrome = true,
  showHeader,
  className,
  style,
}: TerminalProps) {
  const theme = useMemo(() => resolveTheme(themeProp), [themeProp]);
  const entries = useMemo(() => commands.map(normaliseCommand), [commands]);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when commands change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [commands]);

  const shouldShowHeader = showHeader ?? showWindowChrome;

  return (
    <div
      className={`${styles.terminal} ${className ?? ""}`}
      style={{ background: theme.background, ...style }}
      role="region"
      aria-label={`${theme.windowTitle ?? "Terminal"} window`}
    >
      {/* ── Title bar ── */}
      {shouldShowHeader && (
        <div
          className={styles.titleBar}
          style={{
            background: theme.titleBarBackground,
            color: theme.titleBarForeground,
          }}
        >
          <span className={styles.trafficLights} aria-hidden="true">
            <span
              className={`${styles.dot} ${styles.dotClose}`}
              title="Close"
            />
            <span
              className={`${styles.dot} ${styles.dotMin}`}
              title="Minimise"
            />
            <span
              className={`${styles.dot} ${styles.dotMax}`}
              title="Maximise"
            />
          </span>
          <span className={styles.titleText}>
            {username}@{hostname}: {workingDirectory}
            {theme.shellLabel ? ` — ${theme.shellLabel}` : ""}
          </span>
        </div>
      )}

      {/* ── Body ── */}
      <div className={styles.body} ref={bodyRef}>
        {entries.length === 0 ? (
          // Empty terminal — show a blinking cursor on an empty prompt
          <div className={styles.commandRow}>
            <Prompt
              username={username}
              hostname={hostname}
              workingDirectory={workingDirectory}
              theme={theme}
              showPrompt={showPrompt}
            />
            <Cursor color={theme.cursorColor} blink={cursorBlink} />
          </div>
        ) : (
          entries.map((entry, index) => (
            <TypewriterCommand
              key={index}
              entry={entry}
              isLast={index === entries.length - 1}
              username={username}
              hostname={hostname}
              workingDirectory={workingDirectory}
              theme={theme}
              showPrompt={showPrompt}
              cursorBlink={cursorBlink}
              typewriterEffect={typewriterEffect}
              typewriterSpeed={typewriterSpeed}
            />
          ))
        )}
      </div>
    </div>
  );
}
