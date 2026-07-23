import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Mail,
  Clock,
  Building2,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import { SECTIONS, siteConfig } from "../config/siteConfig";
import { Reveal } from "../components/Reveal";

type Subject = "" | "platform" | "billing" | "partnership" | "other";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  subject: Subject;
  message: string;
  // שדות בירור חיוב
  amount: string;
  chargeDate: string;
  last4: string;
  system: string;
}

const EMPTY: FormData = {
  fullName: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
  amount: "",
  chargeDate: "",
  last4: "",
  system: "",
};

const SUBJECT_LABELS: Record<Exclude<Subject, "">, string> = {
  platform: "שאלה על פלטפורמה",
  billing: "בירור חיוב",
  partnership: "שיתוף פעולה",
  other: "אחר",
};

const SYSTEM_OPTIONS = [
  { value: "gobez", label: "גובז" },
  { value: "carddbee", label: "CardDBee" },
  { value: "shamoor", label: "SHAMOOR" },
  { value: "planist", label: "Planist" },
  { value: "unknown", label: "לא ידוע" },
];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * submitInquiry — כל לוגיקת השליחה במקום אחד (חיבור קל ל-API בעתיד).
 * שולח דרך Web3Forms אם הוגדר Access Key, אחרת נופל ל-mailto.
 */
async function submitInquiry(data: FormData): Promise<{ ok: boolean }> {
  const subjectLabel = data.subject ? SUBJECT_LABELS[data.subject] : "פנייה";
  const emailSubject = `פנייה חדשה מהאתר — ${subjectLabel}`;

  const lines = [
    `נושא: ${subjectLabel}`,
    `שם מלא: ${data.fullName}`,
    `טלפון: ${data.phone}`,
    `אימייל: ${data.email}`,
    "",
    `תוכן הפנייה:`,
    data.message,
  ];

  if (data.subject === "billing") {
    const sysLabel =
      SYSTEM_OPTIONS.find((s) => s.value === data.system)?.label || "—";
    lines.push(
      "",
      "פרטי בירור חיוב:",
      `סכום החיוב: ${data.amount || "—"}`,
      `תאריך החיוב: ${data.chargeDate || "—"}`,
      `4 ספרות אחרונות: ${data.last4 || "—"}`,
      `מערכת: ${sysLabel}`
    );
  }

  // אפשרות 1 — שירות טפסים ללא שרת (Web3Forms)
  if (siteConfig.formsAccessKey) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: siteConfig.formsAccessKey,
          subject: emailSubject,
          from_name: data.fullName,
          replyto: data.email,
          message: lines.join("\n"),
        }),
      });
      return { ok: res.ok };
    } catch {
      return { ok: false };
    }
  }

  // אפשרות 2 (fallback) — פתיחת תוכנת המייל של המשתמש
  const mailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
  window.location.href = mailto;
  return { ok: true };
}

export function Contact() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const isBilling = form.subject === "billing";

  const set = (key: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) e.fullName = "יש להזין שם מלא";
    if (form.phone.replace(/\D/g, "").length < 9)
      e.phone = "יש להזין מספר טלפון תקין";
    if (!emailRe.test(form.email.trim())) e.email = "יש להזין כתובת אימייל תקינה";
    if (!form.subject) e.subject = "יש לבחור נושא פנייה";
    if (!form.message.trim()) e.message = "יש להזין את תוכן הפנייה";
    if (isBilling && form.last4 && !/^\d{4}$/.test(form.last4))
      e.last4 = "יש להזין בדיוק 4 ספרות";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    const { ok } = await submitInquiry(form);
    setStatus(ok ? "success" : "error");
    if (ok) setForm(EMPTY);
  };

  const contactItems = useMemo(
    () =>
      [
        { icon: Mail, label: "אימייל", value: siteConfig.contactEmail },
        { icon: Clock, label: "שעות פעילות", value: siteConfig.businessHours },
        { icon: Building2, label: "שם העסק", value: siteConfig.clearingName },
        { icon: Globe, label: "כתובת האתר", value: siteConfig.domain },
      ].filter((i) => i.value),
    []
  );

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-teal";

  const errCls = (k: keyof FormData) =>
    errors[k] ? "border-red-400" : "border-navy/15";

  return (
    <section id={SECTIONS.contact} className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="container-mt">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* פרטי קשר */}
          <Reveal>
            <h2 className="text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
              אנחנו כאן לכל שאלה
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
              לשאלות על אחת מהפלטפורמות, בירור חיוב, שיתוף פעולה או מידע נוסף —
              מלאו את הטופס ונחזור אליכם בהקדם.
            </p>

            <dl className="mt-9 space-y-4">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-ink/40">
                      {label}
                    </dt>
                    <dd className="text-[15px] font-medium text-navy" dir="auto">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* טופס */}
          <Reveal delay={80}>
            <div className="rounded-2xl border border-navy/10 bg-base/50 p-6 sm:p-8">
              {status === "success" ? (
                <div
                  role="status"
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal/15 text-teal">
                    <CheckCircle2 size={30} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xl font-extrabold text-navy">
                      הפנייה נשלחה בהצלחה
                    </p>
                    <p className="mt-2 text-ink/60">
                      תודה שפניתם — נחזור אליכם בהקדם בדוא״ל.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-ghost mt-2"
                    onClick={() => setStatus("idle")}
                  >
                    שליחת פנייה נוספת
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="fullName"
                      label="שם מלא"
                      error={errors.fullName}
                    >
                      <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        value={form.fullName}
                        onChange={(e) => set("fullName", e.target.value)}
                        aria-invalid={!!errors.fullName}
                        className={`${inputBase} ${errCls("fullName")}`}
                        placeholder="ישראל ישראלי"
                      />
                    </Field>

                    <Field id="phone" label="טלפון" error={errors.phone}>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        dir="ltr"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        aria-invalid={!!errors.phone}
                        className={`${inputBase} text-right ${errCls("phone")}`}
                        placeholder="050-0000000"
                      />
                    </Field>
                  </div>

                  <Field id="email" label="אימייל" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      dir="ltr"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      className={`${inputBase} text-right ${errCls("email")}`}
                      placeholder="name@example.com"
                    />
                  </Field>

                  <Field id="subject" label="נושא הפנייה" error={errors.subject}>
                    <select
                      id="subject"
                      value={form.subject}
                      onChange={(e) => set("subject", e.target.value as Subject)}
                      aria-invalid={!!errors.subject}
                      className={`${inputBase} ${errCls("subject")}`}
                    >
                      <option value="">בחרו נושא</option>
                      <option value="platform">שאלה על פלטפורמה</option>
                      <option value="billing">בירור חיוב</option>
                      <option value="partnership">שיתוף פעולה</option>
                      <option value="other">אחר</option>
                    </select>
                  </Field>

                  {/* שדות בירור חיוב — נפתחים בעדינות */}
                  {isBilling && (
                    <div className="animate-rise space-y-5 rounded-xl border border-teal/25 bg-teal/5 p-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="amount" label="סכום החיוב">
                          <input
                            id="amount"
                            type="text"
                            inputMode="decimal"
                            value={form.amount}
                            onChange={(e) => set("amount", e.target.value)}
                            className={`${inputBase} border-navy/15`}
                            placeholder="₪0.00"
                          />
                        </Field>
                        <Field id="chargeDate" label="תאריך החיוב">
                          <input
                            id="chargeDate"
                            type="date"
                            value={form.chargeDate}
                            onChange={(e) => set("chargeDate", e.target.value)}
                            className={`${inputBase} border-navy/15`}
                          />
                        </Field>
                      </div>

                      <Field
                        id="last4"
                        label="4 ספרות אחרונות של אמצעי התשלום"
                        error={errors.last4}
                      >
                        <input
                          id="last4"
                          type="text"
                          inputMode="numeric"
                          maxLength={4}
                          dir="ltr"
                          value={form.last4}
                          onChange={(e) =>
                            set("last4", e.target.value.replace(/\D/g, ""))
                          }
                          aria-invalid={!!errors.last4}
                          aria-describedby="last4-note"
                          className={`${inputBase} text-right ${errCls("last4")}`}
                          placeholder="1234"
                        />
                        <p
                          id="last4-note"
                          className="mt-2 flex items-start gap-1.5 text-xs text-ink/55"
                        >
                          <ShieldCheck
                            size={14}
                            className="mt-0.5 shrink-0 text-teal"
                            aria-hidden="true"
                          />
                          מטעמי אבטחה, אין להזין מספר כרטיס אשראי מלא.
                        </p>
                      </Field>

                      <Field id="system" label="בחירת מערכת">
                        <select
                          id="system"
                          value={form.system}
                          onChange={(e) => set("system", e.target.value)}
                          className={`${inputBase} border-navy/15`}
                        >
                          <option value="">בחרו מערכת</option>
                          {SYSTEM_OPTIONS.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  )}

                  <Field id="message" label="תוכן הפנייה" error={errors.message}>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      aria-invalid={!!errors.message}
                      className={`${inputBase} resize-none ${errCls("message")}`}
                      placeholder="כתבו לנו כיצד נוכל לעזור…"
                    />
                  </Field>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                    >
                      אירעה שגיאה בשליחה. נסו שוב, או פנו אלינו ישירות בדוא״ל{" "}
                      {siteConfig.contactEmail}.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full text-base disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                          aria-hidden="true"
                        />
                        שולח…
                      </>
                    ) : (
                      <>
                        <Send size={18} aria-hidden="true" />
                        שליחת פנייה בדוא״ל
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* שדה טופס עם Label אמיתי והודעת שגיאה נגישה */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-bold text-navy"
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
