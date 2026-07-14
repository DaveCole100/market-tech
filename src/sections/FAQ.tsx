import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SECTIONS } from "../config/siteConfig";
import { Reveal } from "../components/Reveal";

const FAQS: { q: string; a: string }[] = [
  {
    q: "מהי Market Tech?",
    a: "Market Tech היא בית לפלטפורמות, אפליקציות ופתרונות דיגיטליים, המפתחת ומפעילה מספר מערכות ושירותים לעסקים, אנשי מקצוע וקהילות.",
  },
  {
    q: "מדוע מופיע חיוב בשם מרקט-טק פתרונות דיגיטליים?",
    a: "מרקט-טק היא הגוף המפעיל והסולק עבור המוצרים והשירותים של גובז, CardDBee, BE TOR ו-Planist. לכן שם זה עשוי להופיע בפירוט כרטיס האשראי.",
  },
  {
    q: "כיצד ניתן לזהות עבור איזה שירות חויבתי?",
    a: "ניתן לבדוק את הודעת אישור העסקה, החשבונית או האימייל שקיבלתם. ניתן גם לפנות אלינו באמצעות טופס בירור החיוב באתר.",
  },
  {
    q: "האם אפשר לבטל מנוי?",
    a: "תנאי הביטול משתנים בהתאם למוצר, למסלול ולמועד ההצטרפות. ניתן לפנות לשירות הלקוחות לבדיקת המנוי והאפשרויות.",
  },
  {
    q: "האם Market Tech שומרת את פרטי כרטיס האשראי?",
    a: "התשלומים מעובדים באמצעות ספק סליקה חיצוני ומאובטח בהתאם לתנאי ספק הסליקה.",
  },
  {
    q: "אילו פלטפורמות מופעלות על ידי Market Tech?",
    a: "כיום גובז, CardDBee, BE TOR ו-Planist. בעתיד עשויות להתווסף פלטפורמות נוספות.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={SECTIONS.faq} className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-mt max-w-3xl">
        <Reveal>
          <h2 className="text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            שאלות נפוצות
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            כל מה שחשוב לדעת על Market Tech, על הפלטפורמות שלנו ועל בירור חיוב.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {FAQS.map((f, i) => {
              const open = openIndex === i;
              const btnId = `faq-btn-${i}`;
              const panelId = `faq-panel-${i}`;
              return (
                <div key={i}>
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={btnId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-start"
                    >
                      <span className="text-base font-bold text-navy sm:text-lg">
                        {f.q}
                      </span>
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                        className={`shrink-0 text-teal transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    aria-hidden={!open}
                    className={`grid transition-all duration-300 ease-out ${
                      open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 leading-relaxed text-ink/70">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
