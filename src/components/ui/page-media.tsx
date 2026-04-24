/**
 * File: src/components/ui/page-media.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Shared responsive image primitive for public page hero and editorial media.
 */
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

type PageImageAspect = "landscape" | "portrait" | "wide";

function mergeClassName(...values: Array<string | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export function PageImage({
  alt,
  aspect = "landscape",
  children,
  className,
  objectPosition,
  priority = false,
  sizes = "(max-width: 64rem) 100vw, 42vw",
  src,
}: {
  alt: string;
  aspect?: PageImageAspect | undefined;
  children?: ReactNode | undefined;
  className?: string | undefined;
  objectPosition?: string | undefined;
  priority?: boolean | undefined;
  sizes?: string | undefined;
  src: string;
}) {
  const style = {
    position: "relative",
    ...(objectPosition ? { "--page-image-position": objectPosition } : {}),
  } as CSSProperties;

  return (
    <figure
      className={mergeClassName("page-image-card", className)}
      data-aspect={aspect}
      style={style}
    >
      <Image alt={alt} fill priority={priority} sizes={sizes} src={src} />
      {children ? (
        <figcaption className="page-image-overlay">{children}</figcaption>
      ) : null}
    </figure>
  );
}
