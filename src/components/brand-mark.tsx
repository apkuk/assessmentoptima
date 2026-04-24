/**
 * File: src/components/brand-mark.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Shared AssessmentOptima logo mark used across global brand surfaces.
 */
import Image from "next/image";

import { appConfig } from "@/config/app";

interface BrandMarkProps {
  className?: string;
  priority?: boolean;
}

export function BrandMark({ className, priority = false }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={className ? `brand-mark ${className}` : "brand-mark"}
    >
      <Image
        alt=""
        height={88}
        priority={priority}
        sizes="66px"
        src={appConfig.logoPath}
        width={88}
      />
    </span>
  );
}
