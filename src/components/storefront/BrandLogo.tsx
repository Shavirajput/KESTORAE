import logo1xAvif from "@/assets/brand/kestorae-logo-1x.avif?no-inline";
import logo2xAvif from "@/assets/brand/kestorae-logo-2x.avif?no-inline";
import logo1xWebp from "@/assets/brand/kestorae-logo-1x.webp?no-inline";
import logo2xWebp from "@/assets/brand/kestorae-logo-2x.webp?no-inline";
import logo2xPng from "@/assets/brand/kestorae-logo-2x.png?no-inline";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <picture className="inline-block">
      <source type="image/avif" srcSet={`${logo1xAvif} 1x, ${logo2xAvif} 2x`} />
      <source type="image/webp" srcSet={`${logo1xWebp} 1x, ${logo2xWebp} 2x`} />
      <img
        src={logo2xPng}
        alt="Kestorae — Home & Lifestyle"
        width={210}
        height={70}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={
          className ??
          "h-11 w-auto object-contain brightness-[1.08] contrast-[1.1] mix-blend-multiply sm:h-12 lg:h-14"
        }
      />
    </picture>
  );
}
