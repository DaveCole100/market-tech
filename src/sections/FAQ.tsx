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
    q: "אילו פלטפורמות מופעלות על ידי Market Tech?",
    a: "כיום גובז, א׳-בית (abait.ai), CardDBee, SHAMOOR ו-Planist. בעתיד עשויות להתווסף פלטפורמות נוספות.",
  },
  {
    q: "האם הטמעת AI מתאימה לעסקים וארגונים מכל תחום?",
    a: "אפשר לבחון שימוש ב-AI בתחומים ובארגונים שונים. ההתאמה תלויה במשימות, במידע הזמין ובדרישות הארגון. מתחילים בצורך עסקי ברור ובודקים היכן AI יכול לסייע באופן מעשי.",
  },
  {
    q: "איך מתחילים תהליך של הטמעת AI בארגון?",
    a: "מתחילים במיפוי הצרכים והתהליכים יחד עם בעלי התפקידים: מזהים משימות חוזרות, צווארי בקבוק ומקורות מידע, מגדירים יעד ובוחרים תהליך ממוקד להתנסות לפני הרחבה.",
  },
  {
    q: "האם אפשר לשלב AI במערכות ובתהליכים שכבר קיימים?",
    a: "בשלב האפיון בודקים את המערכות הקיימות, ממשקי החיבור, הרשאות הגישה ודרישות אבטחת המידע. בהתאם לממצאים מתכננים את השילוב בתהליכי העבודה ואת הפיתוח הנדרש.",
  },
  {
    q: "איך מסייעים לעובדים להשתמש בכלי AI?",
    a: "ההדרכה מותאמת לתפקידים ולמשימות של העובדים וכוללת תרגול על תרחישי עבודה, ניסוח בקשות, בדיקת התוצרים וכללים לשימוש במידע. הליווי מסייע לזהות קשיים ולשפר את השימוש בפועל.",
  },
  {
    q: "מה תפקיד הבקרה האנושית בתהליך?",
    a: "מגדירים מי בודק את התוצרים, אילו פעולות דורשות אישור ומתי מעבירים את הטיפול לאדם. כלי AI עלולים לטעות, ולכן מתאימים את רמת הבקרה לרגישות המידע ולהשפעת ההחלטה.",
  },
  {
    q: "איך מודדים את התוצאות של הטמעת AI?",
    a: "מגדירים מראש מדדים בהתאם למטרה, למשל זמן ביצוע, איכות התוצרים, שיעור טעויות ואימוץ בקרב העובדים. משווים למצב ההתחלתי ובוחנים את התוצאות לפני שמחליטים על התאמות או הרחבת השימוש.",
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
            תשובות על הטמעת AI בארגונים, על Market Tech ועל הפלטפורמות שלנו.
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
