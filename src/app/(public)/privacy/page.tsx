import type { Metadata } from "next";
import { PRIVACY_DOC } from "@/lib/legal/documents";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-x max-w-3xl py-16">
      <LegalDocumentView doc={PRIVACY_DOC} />
    </div>
  );
}
