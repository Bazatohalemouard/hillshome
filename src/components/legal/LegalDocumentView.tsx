import type { LegalDocument } from "@/lib/legal/documents";

/**
 * Renders a legal document (Privacy Policy, Terms & Conditions).
 * Server-safe: no client hooks, so it works in the modal and on pages.
 */
export function LegalDocumentView({
  doc,
  titleAs: Title = "h1",
  showHeader = true,
}: {
  doc: LegalDocument;
  titleAs?: "h1" | "h2" | "h3";
  showHeader?: boolean;
}) {
  return (
    <article className="text-[15px] leading-relaxed text-ink/80">
      {showHeader && (
        <header className="mb-6">
          <p className="text-xs uppercase tracking-widest text-gold-600">{doc.company}</p>
          <Title className="mt-1 font-display text-2xl font-semibold text-navy-950 sm:text-3xl">{doc.title}</Title>
          <p className="mt-1 text-sm text-ink/60">Effective Date: {doc.effectiveDate}</p>
        </header>
      )}

      {doc.sections.map((s) => (
        <section key={s.heading} className="mt-7 first:mt-0">
          <h3 className="font-semibold text-navy-950">{s.heading}</h3>
          {s.blocks.map((b, i) => {
            if (b.kind === "p") return <p key={i} className="mt-2">{b.text}</p>;
            if (b.kind === "ul")
              return (
                <ul key={i} className="mt-2 list-disc space-y-1 pl-5">
                  {b.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              );
            return (
              <ol key={i} className="mt-2 list-decimal space-y-1 pl-5">
                {b.items.map((it, j) => <li key={j}>{it}</li>)}
              </ol>
            );
          })}
        </section>
      ))}

      <footer className="mt-8 border-t border-navy-900/10 pt-5">
        {doc.closing.map((line, i) => (
          <p key={i} className={i === doc.closing.length - 1 && doc.closing.length > 1 ? "mt-2 font-display text-lg text-navy-950" : "mt-2"}>{line}</p>
        ))}
      </footer>
    </article>
  );
}
