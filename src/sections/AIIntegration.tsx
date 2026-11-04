import { SECTIONS } from "../config/siteConfig";
import { Reveal } from "../components/Reveal";

const STEPS = [
  { title: "מיפוי צרכים", desc: "מזהים יחד את המשימות, מקורות המידע והיעדים שבהם AI יכול לסייע, ובוחרים נקודת התחלה ממוקדת." },
  { title: "פיתוח ושילוב", desc: "מתכננים פתרון בהתאם לצרכים ולמערכות הקיימות, תוך התייחסות להרשאות, לאבטחת מידע ולבקרה אנושית." },
  { title: "הדרכה וליווי", desc: "מתרגלים עם העובדים שימוש בתהליכי העבודה, בוחנים תוצאות מול יעדים ומעדכנים את התהליך בהתאם." },
];

export function AIIntegration() {
  return (
    <section id={SECTIONS.ai} className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-mt">
        <Reveal>
          <h2 className="text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            הטמעת AI בארגונים
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/70">
            מחברים בין צורכי הארגון ליכולות הבינה המלאכותית — ממיפוי התהליכים ועד שילוב מעשי בעבודה היומיומית, הדרכת הצוות ומדידת התוצאות.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 70}>
              <div className="border-t border-navy/10 pt-6">
                <span className="text-3xl font-extrabold text-teal" aria-hidden="true">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-extrabold text-navy">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/70">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <a href={`#${SECTIONS.contact}`} className="btn-primary">בואו נדבר על AI בארגון שלכם</a>
        </Reveal>
      </div>
    </section>
  );
}
