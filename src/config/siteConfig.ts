/**
 * siteConfig — מקור אמת יחיד לכל הפרטים הניתנים להחלפה באתר.
 * ערכים המסומנים ב-PLACEHOLDER יש להשלים לפני עלייה לאוויר.
 */

export interface LegalDoc {
  slug: "privacy" | "terms" | "cancellation" | "accessibility";
  title: string;
}

export const siteConfig = {
  // ── זהות המותג ──────────────────────────────────────────────
  brandName: "Market Tech",
  brandNameHe: "מרקט-טק פתרונות דיגיטליים",
  clearingName: "מרקט-טק פתרונות דיגיטליים", // השם שמופיע בחיוב האשראי
  domain: "market-tech.co.il",
  siteUrl: "https://market-tech.co.il",
  tagline: "בית לפלטפורמות, אפליקציות ופתרונות דיגיטליים",

  // ── יצירת קשר (PLACEHOLDER — להשלים) ────────────────────────
  contactEmail: "info@market-tech.co.il", // PLACEHOLDER
  businessHours: "ימים א׳–ה׳, 09:00–17:00", // PLACEHOLDER
  // כתובת פיזית / מספר עוסק / טלפון — לא הומצאו בכוונה. הוסיפו כאן רק ערכים אמיתיים.
  legalAddress: "", // PLACEHOLDER (ריק = לא מוצג)
  phone: "", // PLACEHOLDER (ריק = לא מוצג)

  // ── שירות טפסים ללא שרת (PLACEHOLDER) ───────────────────────
  // Web3Forms: הירשמו ב-https://web3forms.com והדביקו כאן את ה-Access Key.
  // ריק => האתר יפול אוטומטית ל-mailto (פתיחת תוכנת המייל של המשתמש).
  formsAccessKey: "", // PLACEHOLDER

  // ── רשתות חברתיות (PLACEHOLDER, ריק = לא מוצג) ───────────────
  social: {
    facebook: "", // PLACEHOLDER
    instagram: "", // PLACEHOLDER
    linkedin: "", // PLACEHOLDER
  },

  // ── מידע משפטי בסיסי ────────────────────────────────────────
  legal: {
    docs: [
      { slug: "privacy", title: "מדיניות פרטיות" },
      { slug: "terms", title: "תנאי שימוש" },
      { slug: "cancellation", title: "מדיניות ביטולים" },
      { slug: "accessibility", title: "הצהרת נגישות" },
    ] as LegalDoc[],
  },
} as const;

// מזהי הסקשנים לניווט וגלילה חלקה
export const SECTIONS = {
  hero: "hero",
  about: "about",
  platforms: "platforms",
  why: "why",
  faq: "faq",
  contact: "contact",
} as const;

export const NAV_ITEMS: { label: string; target: string }[] = [
  { label: "אודות", target: SECTIONS.about },
  { label: "הפלטפורמות שלנו", target: SECTIONS.platforms },
  { label: "שאלות נפוצות", target: SECTIONS.faq },
  { label: "יצירת קשר", target: SECTIONS.contact },
];
