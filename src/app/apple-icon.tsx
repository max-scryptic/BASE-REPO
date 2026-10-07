import { ImageResponse } from "next/og";
import { BrandImage } from "@/components/seo/brand-image";

/** Home screen icon for iOS and iPadOS. iOS rounds the corners itself. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<BrandImage size={size.width} />, size);
}
