import { useEffect } from "react";
import { X } from "lucide-react";
import { legalContent } from "../legal/legalContent";

interface LegalModalProps {
  slug: string | null;
  onClose: () => void;
}

export function LegalModal({ slug, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [slug, onClose]);

  if (!slug) return null;
  const doc = legalContent[slug];
  if (!doc) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
    >
      <div
        className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col rounded-t-2xl bg-base shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-navy/10 px-6 py-4">
          <h2 id="legal-title" className="text-lg font-extrabold text-navy">
            {doc.title}
          </h2>
          <button
            type="button"
            aria-label="סגירת החלון"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-navy transition-colors hover:bg-navy/5"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <p className="text-xs text-ink/50">{doc.updated}</p>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
            {doc.disclaimer}
          </div>

          <div className="mt-5 space-y-5">
            {doc.sections.map((s, i) => (
              <div key={i}>
                {s.heading && (
                  <h3 className="mb-1.5 text-sm font-bold text-navy">
                    {s.heading}
                  </h3>
                )}
                {s.body.map((p, j) => (
                  <p key={j} className="mb-2 text-sm leading-relaxed text-ink/70">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
