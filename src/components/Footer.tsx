import { useState } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { NAV_ITEMS, SECTIONS, siteConfig } from "../config/siteConfig";
import { platforms } from "../data/platforms";
import { LegalModal } from "./LegalModal";

export function Footer() {
  const [openDoc, setOpenDoc] = useState<string | null>(null);
  const year = new Date().getFullYear();

  const socials = [
    { key: "facebook", href: siteConfig.social.facebook, Icon: Facebook, label: "פייסבוק" },
    { key: "instagram", href: siteConfig.social.instagram, Icon: Instagram, label: "אינסטגרם" },
    { key: "linkedin", href: siteConfig.social.linkedin, Icon: Linkedin, label: "לינקדאין" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-navy text-white/80">
      <div className="container-mt py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* מותג */}
          <div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-extrabold text-white">Market Tech</span>
              <span className="mt-1 text-sm text-white/50">
                מרקט-טק פתרונות דיגיטליים
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              בית לפלטפורמות, אפליקציות ופתרונות דיגיטליים.
            </p>
            {socials.length > 0 && (
              <div className="mt-5 flex gap-2">
                {socials.map(({ key, href, Icon, label }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/80 transition-colors hover:bg-teal hover:text-white"
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* סקשנים */}
          <nav aria-label="ניווט בעמוד">
            <h2 className="text-sm font-bold text-white">ניווט</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.target}>
                  <a
                    href={`#${item.target}`}
                    className="text-white/60 transition-colors hover:text-teal-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* פלטפורמות */}
          <nav aria-label="פלטפורמות">
            <h2 className="text-sm font-bold text-white">הפלטפורמות שלנו</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {platforms.map((p) => {
                const isExternal = p.isLive && p.href.startsWith("http");
                return (
                  <li key={p.id}>
                    <a
                      href={isExternal ? p.href : `#${SECTIONS.platforms}`}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-white/60 transition-colors hover:text-teal-light"
                    >
                      {p.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* משפטי */}
          <nav aria-label="מידע משפטי">
            <h2 className="text-sm font-bold text-white">מידע משפטי</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.legal.docs.map((doc) => (
                <li key={doc.slug}>
                  <button
                    type="button"
                    onClick={() => setOpenDoc(doc.slug)}
                    className="text-white/60 transition-colors hover:text-teal-light"
                  >
                    {doc.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:flex-row sm:text-start">
          <p>
            © {year} Market Tech · מרקט-טק פתרונות דיגיטליים. כל הזכויות שמורות.
          </p>
          <p dir="ltr">{siteConfig.domain}</p>
        </div>
      </div>

      <LegalModal slug={openDoc} onClose={() => setOpenDoc(null)} />
    </footer>
  );
}
