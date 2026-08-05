import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home",      href: "/" },
  { label: "Projects",  href: "/#projects" },
  { label: "Services",  href: "/#amenities" },
  { label: "About",     href: "/#about" },
  { label: "Contact",   href: "/contact" },
];

const METRIK = "'Space Grotesk', 'Metrik', sans-serif";
const GINGER  = "'Cormorant Garamond', 'Ginger', serif";
const GOLD    = "#C4A35A";
const TIMBER  = "#D7D0C7";

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled
    ? "rgba(26, 28, 27, 0.90)"
    : "rgba(45, 48, 47, 0.22)";

  const navBorder = scrolled
    ? `1px solid rgba(196, 163, 90, 0.20)`
    : `1px solid rgba(196, 163, 90, 0.10)`;

  const navShadow = scrolled
    ? "0 8px 48px rgba(0,0,0,0.50), 0 1px 0 rgba(196,163,90,0.08)"
    : "none";

  return (
    <motion.nav
      initial={{ y: -96, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: navBg,
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        borderBottom: navBorder,
        boxShadow: navShadow,
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6 lg:px-12 h-[78px] flex items-center justify-between gap-8"
      >
        {/* ── Logo ── */}
        <a href="/" className="flex items-end gap-3 group shrink-0" aria-label="IRE Homes">
          <span
            className="select-none"
            style={{
              fontFamily: GINGER,
              fontWeight: 700,
              fontSize: "30px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: GOLD,
              textShadow: "0 2px 16px rgba(196,163,90,0.22)",
            }}
          >
            IRE Homes
          </span>
        </a>

        {/* ── Desktop Links ── */}
        <nav className="hidden md:flex items-center gap-9 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 group"
              style={{
                fontFamily: METRIK,
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: GOLD,
                transition: "color 0.40s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = TIMBER)}
              onMouseLeave={(e) => (e.currentTarget.style.color = GOLD)}
            >
              {link.label}
              <span
                className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${GOLD}, rgba(196,163,90,0.25))`,
                  transition: "width 0.50s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </a>
          ))}
        </nav>

        {/* ── CTA + Hamburger ── */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-flex items-center transition-all duration-500"
            style={{
              fontFamily: METRIK,
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              padding: "10px 26px",
              borderRadius: "999px",
              border: `1px solid rgba(196, 163, 90, 0.42)`,
              color: GOLD,
              background: "rgba(196, 163, 90, 0.06)",
              boxShadow: "0 2px 20px rgba(0,0,0,0.25)",
              transition: "all 0.45s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = GOLD;
              el.style.color = "#1e211f";
              el.style.boxShadow = `0 6px 28px rgba(196,163,90,0.28)`;
              el.style.borderColor = GOLD;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(196, 163, 90, 0.06)";
              el.style.color = GOLD;
              el.style.boxShadow = "0 2px 20px rgba(0,0,0,0.25)";
              el.style.borderColor = "rgba(196, 163, 90, 0.42)";
            }}
          >
            Schedule Visit
          </motion.a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              background: "rgba(61, 65, 64, 0.50)",
              border: "1px solid rgba(196, 163, 90, 0.22)",
              color: "rgba(215, 208, 199, 0.85)",
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="x"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <X size={17} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Menu size={17} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(26, 28, 27, 0.96)",
              backdropFilter: "blur(32px)",
              borderTop: "1px solid rgba(196, 163, 90, 0.15)",
            }}
          >
            <div className="px-8 pt-6 pb-8 flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  className="py-4 transition-colors duration-350"
                  style={{
                    fontFamily: METRIK,
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: GOLD,
                    borderBottom: "1px solid rgba(61, 65, 64, 0.60)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = TIMBER)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = GOLD)}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="/#contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.04 }}
                className="mt-7 py-3.5 text-center rounded-full transition-all duration-400"
                style={{
                  fontFamily: METRIK,
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  background: GOLD,
                  color: "#1e211f",
                  boxShadow: "0 4px 24px rgba(196,163,90,0.22)",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Schedule Visit
              </motion.a>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.07 + 0.20 }}
                className="mt-6 text-center"
                style={{
                  fontFamily: GINGER,
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: "rgba(122, 120, 117, 0.75)",
                }}
              >
                India's Premier Mandate Firm
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
