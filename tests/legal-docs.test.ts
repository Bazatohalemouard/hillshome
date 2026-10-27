import { describe, it, expect } from "vitest";
import { PRIVACY_DOC, TERMS_DOC, LEGAL_DOCS } from "@/lib/legal/documents";

const docs = [PRIVACY_DOC, TERMS_DOC];

describe("legal documents", () => {
  it("are both registered for the footer", () => {
    expect(Object.keys(LEGAL_DOCS).sort()).toEqual(["privacy", "terms"]);
    expect(LEGAL_DOCS.privacy).toBe(PRIVACY_DOC);
    expect(LEGAL_DOCS.terms).toBe(TERMS_DOC);
  });

  it.each([
    ["privacy", PRIVACY_DOC, 14],
    ["terms", TERMS_DOC, 20],
  ])("%s has all %i sections, numbered in order", (_slug, doc, count) => {
    expect(doc.sections).toHaveLength(count);
    expect(doc.company).toBe("Hillshome Tours Company LTD");
    expect(doc.effectiveDate).toBe("25 October 2026");
    expect(doc.closing.length).toBeGreaterThan(0);
    doc.sections.forEach((s, i) => expect(s.heading.startsWith(`${i + 1}. `)).toBe(true));
  });

  it("contains no empty paragraphs or list items", () => {
    for (const doc of docs) {
      for (const s of doc.sections) {
        expect(s.blocks.length).toBeGreaterThan(0);
        for (const b of s.blocks) {
          if (b.kind === "p") expect(b.text.trim().length).toBeGreaterThan(0);
          else b.items.forEach((it) => expect(it.trim().length).toBeGreaterThan(0));
        }
      }
    }
  });

  it("includes the published contact details", () => {
    const text = (doc: typeof PRIVACY_DOC) =>
      doc.sections
        .flatMap((s) => s.blocks.flatMap((b) => (b.kind === "p" ? [b.text] : b.items)))
        .join("\n");
    for (const doc of docs) {
      expect(text(doc)).toContain("+250 788 423 341");
      expect(text(doc)).toContain("hillshometoursltd@gmail.com");
      expect(text(doc)).toContain("Inyarurembo, Rwanda");
    }
  });

  it("privacy policy keeps its core rights and sharing sections", () => {
    const headings = PRIVACY_DOC.sections.map((s) => s.heading);
    expect(headings).toContain("5. Sharing of Information");
    expect(headings).toContain("10. Your Privacy Rights");
    expect(headings).toContain("14. Contact Us");
  });
});
