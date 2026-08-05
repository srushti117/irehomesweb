import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * TEMPORARY — internal preview only, for comparing Ivory (light) vs
 * Noir (dark) before a final direction is picked. Delete this file and
 * its one usage in App.tsx once a decision is made; also revert the
 * `switchable`/`defaultTheme` props on ThemeProvider in App.tsx.
 */
export default function ThemePreviewToggle() {
  if (!import.meta.env.DEV) return null;

  const { theme, toggleTheme } = useTheme();
  if (!toggleTheme) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "Ivory" : "Noir"} preview`}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.6rem 1rem",
        borderRadius: "999px",
        border: "1px solid rgba(196,163,90,0.45)",
        background: isDark ? "rgba(26,28,27,0.92)" : "rgba(255,255,255,0.92)",
        color: isDark ? "#D7D0C7" : "#221F1A",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      {isDark ? "Noir" : "Ivory"}
    </button>
  );
}
