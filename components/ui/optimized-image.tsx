import NextImage, { ImageProps } from "next/image";
import { getBlurData } from "@/lib/blur-data";

type OptimizedImageProps = ImageProps & {
  src: string;
};

/**
 * Wrapper around next/image that auto-applies blur placeholders
 * for local /gallery/ images and sets sensible quality defaults.
 */
export function OptimizedImage({ src, quality, ...props }: OptimizedImageProps) {
  const blurData = typeof src === "string" ? getBlurData(src) : undefined;

  return (
    <NextImage
      src={src}
      quality={quality ?? 75}
      placeholder={blurData ? "blur" : "empty"}
      blurDataURL={blurData}
      {...props}
    />
  );
}
