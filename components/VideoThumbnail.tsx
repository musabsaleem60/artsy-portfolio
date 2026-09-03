"use client";

import { useState } from "react";
import { Play, Image as ImageIcon } from "lucide-react";

type VideoThumbnailProps = {
  videoId: string;
  title: string;
  onClick: () => void;
};

export default function VideoThumbnail({ videoId, title, onClick }: VideoThumbnailProps) {
  const [thumbState, setThumbState] = useState<"maxres" | "hq" | "mq" | "error">("maxres");

  const getThumbnailSrc = () => {
    switch (thumbState) {
      case "maxres":
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      case "hq":
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      case "mq":
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      default:
        return null; // Fallback state
    }
  };

  const handleImageError = () => {
    if (thumbState === "maxres") setThumbState("hq");
    else if (thumbState === "hq") setThumbState("mq");
    else setThumbState("error");
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // YouTube returns a 120x90 grey image with status 200 if maxres is missing sometimes.
    if (e.currentTarget.naturalWidth === 120) {
      handleImageError();
    }
  };

  const src = getThumbnailSrc();

  return (
    <div
      className="group cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-porcelain/10 bg-graphite flex items-center justify-center">
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={title}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-porcelain/40">
            <ImageIcon size={48} className="mb-2" />
            <span className="text-xs tracking-widest uppercase">Video Available</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-porcelain/20 backdrop-blur-md flex items-center justify-center group-hover:bg-gold/90 group-hover:scale-110 transition-all duration-300">
            <Play size={24} className="text-porcelain group-hover:text-ink ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
      <h3 className="text-sm tracking-widest uppercase text-porcelain/90 group-hover:text-gold transition-colors text-center px-2">
        {title}
      </h3>
    </div>
  );
}
