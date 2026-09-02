import { FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPage({
  title,
  description,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <article className="flex flex-col gap-6">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-normal sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">
          Last updated {lastUpdated}
        </p>
      </header>
      <Alert>
        <FileText className="size-4" />
        <AlertTitle>Placeholder policy</AlertTitle>
        <AlertDescription>
          This template ships structure, not legal advice. Replace every section
          below with copy reviewed for your product and jurisdiction.
        </AlertDescription>
      </Alert>
      <Card>
        <CardContent className="space-y-6 py-2">
          {sections.map((section) => (
            <section key={section.heading} className="space-y-2">
              <h2 className="text-base font-semibold">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </CardContent>
      </Card>
    </article>
  );
}
