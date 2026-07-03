"use client";

import { GalleryImage } from "@/data/images";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";

type PortfolioLightboxProps = {
  images: GalleryImage[];
  open: boolean;
  index: number;
  onClose: () => void;
};

export default function PortfolioLightbox({
  images,
  open,
  index,
  onClose,
}: PortfolioLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(index);

  useEffect(() => {
    if (open) {
      setCurrentIndex(index);
    }
  }, [index, open]);

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={images.map((image) => ({
        src: image.src,
        alt: image.alt,
        width: image.width,
        height: image.height,
      }))}
      carousel={{ finite: false }}
      controller={{ closeOnBackdropClick: true }}
      on={{
        view: ({ index: viewedIndex }) => setCurrentIndex(viewedIndex),
      }}
      render={{
        controls: () => (
          <div className="pointer-events-none fixed inset-x-0 top-5 z-[9999] flex justify-center">
            <div className="rounded-full border border-porcelain/15 bg-charcoal/55 px-4 py-2 text-sm font-medium text-porcelain backdrop-blur-md">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        ),
      }}
      styles={{
        root: { "--yarl__color_backdrop": "rgba(18, 16, 15, 0.96)" },
      }}
    />
  );
}
