"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const DEFAULT_FALLBACK = "/images/whey-protein.png";

type FallbackImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  fallbackSrc?: string;
};

export default function FallbackImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  ...props
}: FallbackImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
