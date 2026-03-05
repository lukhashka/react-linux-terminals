import { useState, useEffect, useCallback, useRef } from "react";
import type { UseTypewriterOptions, UseTypewriterReturn } from "../types";

/**
 * `useTypewriter` — animates text character-by-character.
 *
 * @example
 * const { displayedText, isTyping } = useTypewriter({ text: "ls -la", speed: 50 });
 */
export function useTypewriter({
  text,
  speed = 40,
  autoStart = true,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTyping = useCallback(() => {
    indexRef.current = 0;
    setDisplayedText("");
    setIsTyping(true);
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    startTyping();
  }, [startTyping]);

  useEffect(() => {
    if (autoStart) startTyping();
  }, [autoStart, text, startTyping]);

  useEffect(() => {
    if (!isTyping) return;

    if (indexRef.current >= text.length) {
      setIsTyping(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      indexRef.current += 1;
      setDisplayedText(text.slice(0, indexRef.current));
    }, speed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTyping, displayedText, text, speed]);

  return { displayedText, isTyping, reset };
}
