import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SECTIONS, siteConfig } from "../config/siteConfig";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // סגירת התפריט ב-Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // צל עדין ל-Header לאחר גלילה
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-base/90 backdrop-blur transition-shadow ${
        scrolled ? "border-navy/10 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="container-mt flex h-[68px] items-center justify-between">
        {/* לוגו (צד התחלה — ימין ב-RTL) */}
        <a
          href={`#${SECTIONS.hero}`}
          className="flex flex-col leading-none"
          aria-label={`${siteConfig.brandName} — לראש העמוד`}
        >
          <span className="text-xl font-extrabold tracking-tight text-navy">
            Market Tech
          </span>
          <span className="mt-0.5 text-[11px] font-medium text-ink/50">
            פתרונות דיגיטליים
          </span>
        </a>

        {/* ניווט דסקטופ (צד סיום — שמאל ב-RTL) */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="ניווט ראשי"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-teal"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`#${SECTIONS.contact}`}
            className="btn-primary ms-2 !px-5 !py-2.5 text-sm"
          >
            בירור חיוב
          </a>
        </nav>

        {/* כפתור המבורגר (מובייל) */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy transition-colors hover:bg-navy/5 md:hidden"
          aria-label="פתיחת תפריט ניווט"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={24} aria-hidden="true" />
        </button>
      </div>

      {/* תפריט מובייל */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="תפריט ניווט">
          <div
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-menu"
            className="absolute inset-y-0 end-0 flex w-[82%] max-w-xs animate-rise flex-col bg-base p-5 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-extrabold text-navy">Market Tech</span>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy transition-colors hover:bg-navy/5"
                aria-label="סגירת תפריט"
                onClick={() => setOpen(false)}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="ניווט ראשי (מובייל)">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-teal/10 hover:text-teal"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`#${SECTIONS.contact}`}
                onClick={() => setOpen(false)}
                className="btn-primary mt-3"
              >
                בירור חיוב
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
