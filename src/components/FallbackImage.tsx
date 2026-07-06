"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

const DEFAULT_FALLBACK = "/images/whey-protein.png";
const DEFAULT_QUALITY = 85;

/** Hostnames allowed by next.config.ts `images.remotePatterns`. */
const ALLOWED_REMOTE_HOSTS = new Set([
  "images.unsplash.com",
  "kodecloud-bucket-2025.s3.ap-south-1.amazonaws.com",
]);

function resolveSafeSrc(src: string, fallbackSrc: string): string {
  if (!src) return fallbackSrc;

  if (src.startsWith("/") || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }

  try {
    const url = new URL(src);
    if (url.protocol === "https:" && ALLOWED_REMOTE_HOSTS.has(url.hostname)) {
      return src;
    }
  } catch {
    // invalid URL
  }

  return fallbackSrc;
}

type FallbackImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  fallbackSrc?: string;
};

export default function FallbackImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  quality = DEFAULT_QUALITY,
  ...props
}: FallbackImageProps) {
  const [currentSrc, setCurrentSrc] = useState(() =>
    resolveSafeSrc(src, fallbackSrc)
  );

  useEffect(() => {
    setCurrentSrc(resolveSafeSrc(src, fallbackSrc));
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      quality={quality}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
