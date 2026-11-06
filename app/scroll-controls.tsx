"use client";

import { useEffect, useState } from "react";

export default function ScrollControls({ locale }: { locale: "ru" | "en" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    const startAtTop = () => {
      if (!window.location.hash || window.location.hash === "#top") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      updateVisibility();
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) startAtTop();
    };

    startAtTop();
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={() => {
        window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        });
        document.querySelector<HTMLAnchorElement>(".brand-link")?.focus({ preventScroll: true });
      }}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="m6 11 6-6 6 6M12 5v14" />
      </svg>
      {locale === "ru" ? "Наверх" : "Back to top"}
    </button>
  );
}
