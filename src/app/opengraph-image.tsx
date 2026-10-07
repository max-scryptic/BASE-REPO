import { ImageResponse } from "next/og";
import { BrandImage } from "@/components/seo/brand-image";
import { defaultSocialImage } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/site";

/**
 * The default social preview for every route. Link previews in chat apps,
 * social networks, and AI answer citations show this image.
 *
 * To give a page its own preview, add an `opengraph-image.tsx` in its route
 * segment. X falls back to Open Graph images, so no `twitter-image` is needed.
 */
export const alt = defaultSocialImage.alt;
export const size = {
  width: defaultSocialImage.width,
  height: defaultSocialImage.height,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  const { colors } = siteConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: colors.light.background,
          color: colors.light.foreground,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <BrandImage size={72} />
          </div>
          <div style={{ fontSize: 36, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 960,
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: colors.mutedForeground,
              maxWidth: 960,
            }}
          >
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
