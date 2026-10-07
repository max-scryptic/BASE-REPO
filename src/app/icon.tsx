import { ImageResponse } from "next/og";
import { BrandImage } from "@/components/seo/brand-image";

/**
 * PNG app icons at the sizes browsers, the web manifest, and structured data
 * ask for. Served at `/icon/192` and `/icon/512`; `favicon.ico` still covers
 * the browser tab.
 */
const sizes = [192, 512];

export function generateImageMetadata() {
  return sizes.map((size) => ({
    id: String(size),
    size: { width: size, height: size },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const size = Number(await id);

  return new ImageResponse(<BrandImage size={size} />, {
    width: size,
    height: size,
  });
}
