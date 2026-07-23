interface PlatformLogoProps {
  name: string;
  /** נתיב לוגו. ריק → נופל ל-wordmark טקסטואלי מעוצב. */
  logoSrc?: string;
  /** מונוכרום בהיר (לבן) המתבהר לצבע מלא ב-hover של ה-group ההורה. */
  mono?: boolean;
  className?: string;
}

/**
 * מרנדר לוגו תמונה אם הוגדר ב-config, אחרת wordmark טקסטואלי.
 * במצב mono הלוגו לבן מונוכרום (filter) ומתבהר לצבע מלא כשמרחפים על ה-group ההורה.
 * החלפת לוגו אמיתי = הוספת נתיב ל-logoSrc ב-config בלבד.
 */
export function PlatformLogo({
  name,
  logoSrc,
  mono = false,
  className = "",
}: PlatformLogoProps) {
  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={name}
        loading="lazy"
        className={[
          "h-4 w-auto object-contain",
          mono
            ? "opacity-70 [filter:brightness(0)_invert(1)] transition duration-300 group-hover:opacity-100 group-hover:[filter:none]"
            : "",
          className,
        ].join(" ")}
      />
    );
  }

  return (
    <span
      className={[
        "select-none whitespace-nowrap text-lg font-extrabold tracking-tight sm:text-xl",
        mono
          ? "text-white/70 transition duration-300 group-hover:text-teal-light"
          : "text-navy",
        className,
      ].join(" ")}
    >
      {name}
    </span>
  );
}
