import type { Thing, WithContext } from "schema-dts";

type JsonLdProps = {
  data: WithContext<Thing> | WithContext<Thing>[];
};

/**
 * Renders schema.org structured data as a `<script type="application/ld+json">`.
 *
 * Escapes `<` so a value containing `</script>` cannot break out of the tag.
 * Build `data` with the helpers in `src/lib/seo/json-ld.ts`.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
