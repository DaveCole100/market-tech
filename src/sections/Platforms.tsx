import { ArrowUpLeft } from "lucide-react";
import { SECTIONS } from "../config/siteConfig";
import { platforms } from "../data/platforms";
import { Reveal } from "../components/Reveal";

export function Platforms() {
  return (
    <section
      id={SECTIONS.platforms}
      className="scroll-mt-24 bg-white py-20 sm:py-28"
    >
      <div className="container-mt">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            הפלטפורמות של Market Tech
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            כל אחת מהפלטפורמות שלנו פותרת צורך שונה, אך כולן חולקות מטרה אחת:
            להפוך שירותים, ניהול וקשרים עסקיים לפשוטים, חכמים ונגישים יותר.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {platforms.map((p, i) => {
            const Icon = p.icon;
            const isExternal = p.isLive && p.href.startsWith("http");
            return (
              <Reveal key={p.id} delay={i * 80}>
                <article className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-base/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:bg-white hover:shadow-xl hover:shadow-navy/5">
                  {/* אזור לוגו + שם + תגית */}
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-teal-light">
                      <Icon size={26} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl font-extrabold text-navy">
                        {p.name}
                      </h3>
                      <span className="mt-1 inline-block rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal">
                        {p.tag}
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
                    {p.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-ink/40">
                      קהל יעד
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">
                      {p.audience}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-ink/40">
                      תשלומים
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.payments.map((pay) => (
                        <span
                          key={pay}
                          className="rounded-full bg-navy/5 px-2.5 py-1 text-xs font-medium text-ink/60"
                        >
                          {pay}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-7">
                    <a
                      href={p.href}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-teal transition-colors hover:text-navy"
                    >
                      {p.cta}
                      <ArrowUpLeft
                        size={16}
                        aria-hidden="true"
                        className="transition-transform group-hover:-translate-x-0.5"
                      />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
