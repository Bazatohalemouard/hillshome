"use client";

import { useEffect, useRef } from "react";
import type { LegalDocument } from "@/lib/legal/documents";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";

/**
 * Near-full-screen dialog for the Privacy Policy / Terms & Conditions.
 * Closes on the X button, backdrop click, Escape, or the footer trigger toggle.
 */
export function LegalModal({ doc, onClose }: { doc: LegalDocument; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex p-2 sm:p-4" role="presentation">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        tabIndex={-1}
        className="relative z-10 m-auto flex h-[93vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl outline-none"
      >
        <header className="flex items-start justify-between gap-4 border-b border-navy-900/10 px-5 py-4 sm:px-8 sm:py-5">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-gold-600">{doc.company}</p>
            <h2 id="legal-modal-title" className="font-display text-xl font-semibold text-navy-950 sm:text-2xl">
              {doc.title}
            </h2>
            <p className="text-sm text-ink/60">Effective Date: {doc.effectiveDate}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-navy-900/15 text-navy-950 transition hover:bg-navy-900/5"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          <LegalDocumentView doc={doc} showHeader={false} titleAs="h3" />
          <p className="mt-8 text-center">
            <button
              type="button"
              onClick={onClose}
              className="btn-gold"
            >
              Close
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
