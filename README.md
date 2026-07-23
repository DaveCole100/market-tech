# Market Tech — מרקט-טק פתרונות דיגיטליים

אתר One-Page תדמיתי + עמוד זיהוי חיובים עבור **Market Tech**, בית לפלטפורמות, אפליקציות ופתרונות דיגיטליים (גובז · CardDBee · SHAMOOR · Planist).

בנוי ב-**React + TypeScript + Vite + Tailwind CSS**, ללא מסד נתונים וללא שרת. תמיכה מלאה בעברית ו-RTL, Mobile-First, נגישות ו-SEO בסיסי.

---

## התקנה והרצה

דרוש **Node.js 18+** ו-npm.

```bash
# התקנת תלויות
npm install

# הרצה מקומית (http://localhost:5173)
npm run dev

# בנייה לפרודקשן (פלט לתיקיית dist/)
npm run build

# תצוגה מקדימה של הבנייה
npm run preview
```

> הערה: הפרויקט נמסר כקוד מלא ומוכן לבנייה. יש להריץ `npm install` פעם אחת לפני `npm run dev`/`npm run build`.

---

## מבנה הפרויקט

```
market-tech/
├── index.html               # SEO, Open Graph, JSON-LD, טעינת פונט Heebo, RTL
├── public/
│   ├── favicon.svg          # פאביקון (מוטיב צמתים)
│   ├── og-image.svg         # תמונת שיתוף (מומלץ להמיר ל-PNG — ראו למטה)
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.tsx / App.tsx / index.css
    ├── config/siteConfig.ts # ⭐ מקור אמת יחיד: פרטי קשר, קישורים, מפתחות
    ├── data/platforms.ts     # נתוני 4 הפלטפורמות (כרטיסים ורצועת לוגו)
    ├── hooks/useReveal.ts    # אנימציית כניסה בגלילה (IntersectionObserver)
    ├── legal/legalContent.ts # טקסטים משפטיים בסיסיים (טיוטה)
    ├── components/           # Header, Footer, NodeNetwork, PlatformLogo, Reveal, LegalModal
    └── sections/             # Hero, About, Platforms, WhyMarketTech, FAQ, Contact
```

---

## עדכון תוכן ופרטים (ללא נגיעה בקוד הקומפוננטות)

### פרטי קשר, מפתחות וקישורים — `src/config/siteConfig.ts`
- `contactEmail` — אימייל ליצירת קשר.
- `businessHours` — שעות פעילות.
- `phone` / `legalAddress` — ריקים כברירת מחדל (לא מוצגים). הוסיפו רק ערכים אמיתיים.
- `formsAccessKey` — מפתח Web3Forms לשליחת הטופס למייל (ראו למטה). ריק → נפילה ל-`mailto`.
- `social` — קישורי רשתות (ריק = לא מוצג).

### הפלטפורמות — `src/data/platforms.ts`
כל פלטפורמה: שם, תגית, תיאור, קהל יעד, תשלומים, `href` (קישור), `cta`, `icon`, `logoSrc`, `isLive`.
- **קישורי CardDBee / SHAMOOR / Planist** הם כרגע Placeholder (`#contact`) עם `isLive: false`. כשיהיה URL אמיתי — עדכנו את `href` ל-`https://...` ואת `isLive` ל-`true`.

### החלפת לוגואים
1. שימו קובץ לוגו ב-`public/logos/` (למשל `public/logos/gobez.png`).
2. עדכנו `logoSrc` של אותה פלטפורמה ב-`platforms.ts` ל-`/logos/gobez.png`.
3. זהו — הרצועה ב-Hero תרנדר את התמונה במקום ה-wordmark הטקסטואלי. ברצועה הלוגו מוצג לבן מונוכרום אוטומטית (`filter`) ומתבהר לצבע מלא ב-hover. אם יש לכם גרסת לוגו לבנה מוכנה — ניתן להסיר את ה-filter הרלוונטי ב-`PlatformLogo.tsx`.

---

## טופס יצירת קשר (שליחה במייל בלבד)

כל לוגיקת השליחה מרוכזת בפונקציה אחת: `submitInquiry(data)` ב-`src/sections/Contact.tsx` (קל לחבר ל-API בעתיד).

- **מומלץ:** הירשמו חינם ב-[Web3Forms](https://web3forms.com), העתיקו את ה-**Access Key** והדביקו ב-`siteConfig.formsAccessKey`. הפניות ישלחו לאימייל שהגדרתם ב-Web3Forms.
- **ללא מפתח:** הטופס נופל אוטומטית ל-`mailto` (פותח את תוכנת המייל של המשתמש עם הפנייה מוכנה).

> אבטחה: הטופס **לעולם** אינו מבקש מספר כרטיס אשראי מלא — רק 4 ספרות אחרונות, עם הבהרת אבטחה.

---

## פריסה ל-Vercel

1. העלו את התיקייה ל-GitHub.
2. ב-[Vercel](https://vercel.com): **New Project → Import** את הריפו.
3. Vercel מזהה Vite אוטומטית (Build: `npm run build`, Output: `dist`). לחצו **Deploy**.
4. חברו את הדומיין `market-tech.co.il` תחת **Settings → Domains**.

חלופה (Netlify / שרת רגיל): הריצו `npm run build` והעלו את תוכן `dist/` לשרת סטטי.

---

## מה עדיין צריך להשלים לפני פרסום

- [ ] `contactEmail`, `businessHours` אמיתיים (`siteConfig.ts`).
- [ ] `formsAccessKey` של Web3Forms (או להישאר עם `mailto`).
- [x] קישורי CardDBee / SHAMOOR / Planist + `isLive: true` (`platforms.ts`).
- [ ] קובצי לוגו אמיתיים ב-`public/logos/` + `logoSrc`.
- [ ] **המרת `og-image.svg` ל-PNG** (`og-image.png`) ועדכון ה-meta ב-`index.html` — חלק מהרשתות אינן מציגות OG בפורמט SVG.
- [ ] **בדיקה ואישור משפטי** של הטקסטים ב-`legal/legalContent.ts` (פרטיות, תנאי שימוש, ביטולים, נגישות) — הנוסח הנוכחי הוא טיוטה בסיסית בלבד.
- [ ] עדכון `lastmod` ב-`sitemap.xml` בעת שינויים מהותיים.

---

© Market Tech — מרקט-טק פתרונות דיגיטליים.
