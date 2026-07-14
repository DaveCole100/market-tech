import { Lightbulb, Sparkles, MapPin, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SECTIONS } from "../config/siteConfig";
import { Reveal } from "../components/Reveal";

const HIGHLIGHTS: { icon: LucideIcon; label: string }[] = [
  { icon: Lightbulb, label: "פתרונות שנולדו מצורך אמיתי" },
  { icon: Sparkles, label: "מערכות פשוטות ונוחות" },
  { icon: MapPin, label: "מותאם לשוק הישראלי" },
  { icon: Compass, label: "חשיבה לטווח ארוך" },
];

export function About() {
  return (
    <section id={SECTIONS.about} className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-mt">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            טכנולוגיה שנבנית מתוך צורך אמיתי
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/70">
            Market Tech היא בית לפיתוח ולהפעלת מוצרים ופלטפורמות דיגיטליות
            המיועדות לעסקים, לקהילות ולאנשי מקצוע. אנחנו יוצרים פתרונות שמפשטים
            תהליכים, מחברים בין אנשים ומאפשרים לעסקים לנהל, לשווק ולפתח את הפעילות
            שלהם בצורה חכמה ונגישה יותר. הפעילות שלנו משלבת טכנולוגיה, קהילה,
            שיווק, ניהול וחוויית משתמש — מתוך מטרה להפוך כלים דיגיטליים מתקדמים
            לפשוטים ושימושיים עבור כל אחד.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
            <div className="flex flex-col divide-y divide-navy/10 md:flex-row md:divide-x md:divide-x-reverse md:divide-y-0">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-1 items-center gap-3 p-6"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold leading-snug text-navy">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
