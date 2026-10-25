import type { Metadata } from "next";
import { TERMS_DOC } from "@/lib/legal/documents";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="container-x max-w-3xl py-16">
      <LegalDocumentView doc={TERMS_DOC} />
    </div>
  );
}
