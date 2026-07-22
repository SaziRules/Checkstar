"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

interface Props extends Omit<ImageProps, "onError"> {
  fallback: string;
}

export function ImageWithFallback({ fallback, src, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallback)}
    />
  );
}
