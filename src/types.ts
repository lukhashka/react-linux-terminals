// ─── Theme Types ───────────────────────────────────────────────────────────────

export type ThemeName = "ubuntu" | "arch" | "kali";

export interface TerminalTheme {
  /** Unique identifier used in the `theme` prop */
  name: ThemeName;

  // ── Colors ────────────────────────────────────────────────────────────
  background: string;
  foreground: string;
  /** Prompt username color */
  promptUser: string;
  /** Prompt host/machine color */
  promptHost: string;
  /** Prompt path color */
  promptPath: string;
  /** Prompt symbol (e.g. `$`, `#`, `➜`) color */
  promptSymbol: string;
  /** Cursor fill color */
  cursorColor: string;
  /** Terminal window title-bar background */
  titleBarBackground: string;
  /** Terminal window title-bar foreground */
  titleBarForeground: string;

  // ── Window chrome ─────────────────────────────────────────────────────
  /** Title shown in the title bar */
  windowTitle?: string;
  /** Shell label, e.g. "bash", "zsh" */
  shellLabel?: string;
}

// ─── Command Types ─────────────────────────────────────────────────────────────

export interface CommandEntry {
  /** The raw command string typed by the user */
  input: string;
  /** Lines of output produced by the command */
  output?: string[];
  /** If true, the output is rendered with a red/error color */
  isError?: boolean;
}

// ─── Component Props ───────────────────────────────────────────────────────────

export interface TerminalProps {
  /** Preset theme name or a full custom theme object */
  theme?: ThemeName | TerminalTheme;

  /**
   * List of commands to display.
   * Pass plain strings for read-only display, or `CommandEntry` objects for
   * commands with output lines.
   */
  commands?: Array<string | CommandEntry>;

  /** Show the shell prompt prefix (user@host:path$). Default: true */
  showPrompt?: boolean;

  /** Animate the cursor with a blinking effect. Default: true */
  cursorBlink?: boolean;

  /** Username shown in the prompt. Default: "user" */
  username?: string;

  /** Hostname shown in the prompt. Default: "localhost" */
  hostname?: string;

  /** Working directory shown in the prompt. Default: "~" */
  workingDirectory?: string;

  /** Enable the typewriter typing animation on mount. Default: false */
  typewriterEffect?: boolean;

  /** Typing speed in ms per character (used with typewriterEffect). Default: 40 */
  typewriterSpeed?: number;

  /**
   * Show the window header bar with traffic-light buttons (red / yellow / green).
   * Default: true
   */
  showWindowChrome?: boolean;

  /**
   * Alias for `showWindowChrome`. If provided, this value takes precedence.
   * Default: true
   */
  showHeader?: boolean;

  /** Additional CSS class applied to the root element */
  className?: string;

  /** Inline styles applied to the root element */
  style?: React.CSSProperties;
}

// ─── Hook Types ────────────────────────────────────────────────────────────────

export interface UseTypewriterOptions {
  /** Full text to type out */
  text: string;
  /** Milliseconds per character. Default: 40 */
  speed?: number;
  /** Start typing immediately. Default: true */
  autoStart?: boolean;
}

export interface UseTypewriterReturn {
  /** The currently visible portion of the text */
  displayedText: string;
  /** Whether typing is still in progress */
  isTyping: boolean;
  /** Restart the animation from the beginning */
  reset: () => void;
}
