import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** השהיית כניסה במילישניות (לאפקט מדורג) */
  delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
