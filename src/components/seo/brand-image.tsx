import { siteConfig } from "@/lib/seo/site";

/**
 * The brand mark as an `ImageResponse` element, shared by the generated icons.
 *
 * `ImageResponse` renders outside the browser and cannot read CSS variables or
 * Tailwind classes, so it uses inline styles and `siteConfig.colors`. The glyph
 * is lucide's `GalleryVerticalEnd` drawn as raw SVG, because lucide-react
 * components are client components and cannot render here. Keep it in step
 * with `BrandMark` in `src/components/app-branding.tsx`.
 *
 * The mark fills the whole canvas and the glyph sits inside the central 80%
 * safe zone, so the same image works as a maskable icon.
 */
export function BrandImage({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: siteConfig.colors.primary,
      }}
    >
      <svg
        width={Math.round(size * 0.5)}
        height={Math.round(size * 0.5)}
        viewBox="0 0 24 24"
        fill="none"
        stroke={siteConfig.colors.primaryForeground}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 2h10" />
        <path d="M5 6h14" />
        <rect width="18" height="12" x="3" y="10" rx="2" />
      </svg>
    </div>
  );
}
