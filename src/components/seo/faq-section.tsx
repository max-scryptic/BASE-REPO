import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd, type FaqItem } from "@/lib/seo/json-ld";
import { cn } from "@/lib/utils";

type FaqSectionProps = {
  title?: string;
  description?: string;
  items: FaqItem[];
  className?: string;
};

/**
 * Visible questions and answers plus the matching FAQPage structured data.
 *
 * Answer engines lift direct question and answer pairs more readily than any
 * other shape of content, and structured data only counts when it matches
 * what the page shows, so the two are rendered from one array.
 *
 * Answers are always in the HTML rather than behind a collapsed accordion, so
 * crawlers that do not run JavaScript still read them. Lead each answer with
 * the direct answer in its first sentence, then add detail.
 */
export function FaqSection({
  title = "Frequently asked questions",
  description,
  items,
  className,
}: FaqSectionProps) {
  return (
    <section className={cn("flex flex-col gap-6", className)}>
      <JsonLd data={faqJsonLd(items)} />
      <header className="space-y-2">
        <h2 className="font-heading text-xl font-semibold tracking-normal">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="divide-y rounded-md border">
        {items.map((item) => (
          <div key={item.question} className="space-y-2 p-4">
            <h3 className="text-sm font-medium">{item.question}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
