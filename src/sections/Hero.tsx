import { ArrowUpLeft } from "lucide-react";
import { NodeNetwork } from "../components/NodeNetwork";
import { PlatformLogo } from "../components/PlatformLogo";
import { SECTIONS } from "../config/siteConfig";
import { platforms } from "../data/platforms";

export function Hero() {
  return (
    <section
      id={SECTIONS.hero}
      className="relative isolate overflow-hidden bg-navy"
    >
      {/* רקע Navy עם gradient עדין ומוטיב רשת צמתים */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B2545] via-[#0d2c56] to-[#0B2545]"
        aria-hidden="true"
      />
      <NodeNetwork className="absolute inset-0 -z-10 h-full w-full opacity-80" />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#0B2545] to-transparent"
        aria-hidden="true"
      />

      <div className="container-mt relative pb-12 pt-16 text-center sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-sm font-medium text-teal-light">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
          בית לפלטפורמות דיגיטליות
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
          בית לפלטפורמות, אפליקציות ופתרונות דיגיטליים
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          Market Tech מפתחת ומפעילה פלטפורמות דיגיטליות שמחברות בין אנשים, עסקים,
          קהילות ואנשי מקצוע — באמצעות טכנולוגיה פשוטה, חכמה ונגישה.
        </p>

        <div className="mt-9 flex justify-center">
          <a href={`#${SECTIONS.platforms}`} className="btn-primary text-base">
            הכירו את הפלטפורמות שלנו
            <ArrowUpLeft size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* רצועת לוגו מותגים — מונוכרום בהיר, ללא מסגרת/רקע, לחיץ */}
      <div className="container-mt relative pb-16">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-white/10 pt-9">
          {platforms.map((p) => {
            const isExternal = p.isLive && p.href.startsWith("http");
            const target = isExternal ? p.href : `#${SECTIONS.platforms}`;
            return (
              <a
                key={p.id}
                href={target}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group inline-flex items-center gap-1.5 transition-transform duration-300 hover:-translate-y-0.5"
                aria-label={`מעבר אל ${p.name}`}
              >
                <span className="flex h-6 items-center">
                  <PlatformLogo name={p.name} logoSrc={p.logoSrc} mono />
                </span>
                <ArrowUpLeft
                  size={13}
                  aria-hidden="true"
                  className="translate-y-0.5 text-teal-light opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                />
              </a>
            );
          })}
        </div>
        <p className="mt-5 text-center text-xs font-medium tracking-wide text-white/40">
          הפלטפורמות שאנחנו מפתחים ומפעילים
        </p>
      </div>
    </section>
  );
}
