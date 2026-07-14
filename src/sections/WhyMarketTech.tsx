import { SECTIONS } from "../config/siteConfig";
import { Reveal } from "../components/Reveal";
import { NodeNetwork } from "../components/NodeNetwork";

const REASONS: { title: string; desc: string }[] = [
  {
    title: "חשיבה עסקית",
    desc: "המערכות נבנות כדי לפתור בעיות אמיתיות ולסייע לעסקים ולאנשי מקצוע לצמוח.",
  },
  {
    title: "חוויית משתמש פשוטה",
    desc: "אנחנו הופכים תהליכים מורכבים לממשקים ברורים ונוחים.",
  },
  {
    title: "התאמה לשוק הישראלי",
    desc: "המוצרים מותאמים לשפה, לצרכים ולהרגלי השימוש של עסקים ולקוחות בישראל.",
  },
  {
    title: "פיתוח מתמשך",
    desc: "כל פלטפורמה מתפתחת בהתאם לצורכי המשתמשים ולשינויים בשוק.",
  },
];

export function WhyMarketTech() {
  return (
    <section
      id={SECTIONS.why}
      className="relative scroll-mt-24 overflow-hidden bg-navy py-20 sm:py-28"
    >
      <NodeNetwork className="pointer-events-none absolute inset-0 h-full w-full opacity-30" />
      <div className="container-mt relative">
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            מערכת אחת של חשיבה. מספר פתרונות דיגיטליים.
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-white/10">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 70}>
              <div className="flex flex-col gap-3 border-b border-white/10 py-8 sm:flex-row sm:items-baseline sm:gap-8">
                <span
                  className="text-4xl font-extrabold text-teal-light sm:w-24 sm:shrink-0"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    {r.title}
                  </h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-white/70">
                    {r.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
