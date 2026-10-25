"use client";

import { useState } from "react";
import Link from "next/link";
import { LEGAL_DOCS, type LegalDocument } from "@/lib/legal/documents";
import { LegalModal } from "@/components/legal/LegalModal";

/** Footer links that open the Privacy Policy / Terms & Conditions in a near-full-screen modal. */
export function FooterLegal() {
  const [open, setOpen] = useState<LegalDocument | null>(null);

  const openDoc = (slug: LegalDocument["slug"]) => (e: React.MouseEvent) => {
    e.preventDefault(); // stay on the page and show the modal instead of navigating
    setOpen(LEGAL_DOCS[slug]);
  };

  return (
    <>
      <p className="space-x-4">
        <Link href="/privacy" onClick={openDoc("privacy")}>Privacy Policy</Link>
        <Link href="/terms" onClick={openDoc("terms")}>Terms &amp; Conditions</Link>
      </p>
      {open && <LegalModal doc={open} onClose={() => setOpen(null)} />}
    </>
  );
}
