import { getResponsiveImage, type ResponsiveImageAsset } from "@/lib/responsive-images";

type ResponsivePictureProps = {
  asset?: ResponsiveImageAsset;
  src?: string;
  alt: string;
  sizes: string;
  width: number;
  height: number;
  className?: string;
  pictureClassName?: string;
  loading?: "eager" | "lazy";
  decoding?: "sync" | "async" | "auto";
  fetchPriority?: "high" | "low" | "auto";
};

export function ResponsivePicture({
  asset,
  src,
  alt,
  sizes,
  width,
  height,
  className,
  pictureClassName,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
}: ResponsivePictureProps) {
  const resolved = asset ?? (src ? getResponsiveImage(src) : undefined);

  if (!resolved) {
    return (
      <img
        src={src ?? ""}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        {...(fetchPriority ? { fetchPriority } : {})}
        className={className}
      />
    );
  }

  return (
    <picture {...(pictureClassName ? { className: pictureClassName } : {})}>
      <source type="image/avif" srcSet={resolved.avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={resolved.webpSrcSet} sizes={sizes} />
      <img
        src={resolved.src}
        srcSet={resolved.jpgSrcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        {...(fetchPriority ? { fetchPriority } : {})}
        className={className}
      />
    </picture>
  );
}
