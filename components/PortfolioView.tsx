"use client";

import { useState } from "react";
import { PortfolioCategory } from "@/data/portfolio";
import MasonryGallery from "@/components/MasonryGallery";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VideoThumbnail from "@/components/VideoThumbnail";

type PortfolioViewProps = {
  category: PortfolioCategory;
};

export default function PortfolioView({ category }: PortfolioViewProps) {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Disable Videos tab if no videos available
  const hasVideos = category.videos && category.videos.length > 0;

  return (
    <div className="min-h-screen bg-ink text-porcelain pt-24">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-10 mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-porcelain/60 hover:text-gold transition-colors text-sm uppercase tracking-widest mb-12">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] uppercase text-center mb-12">
          {category.title}
        </h1>

        <div className="flex justify-center mb-12">
          <div className="flex border border-porcelain/20 rounded-full p-1 bg-ink/50 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${
                activeTab === "photos"
                  ? "bg-porcelain text-ink"
                  : "text-porcelain/60 hover:text-porcelain hover:bg-porcelain/10"
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => hasVideos && setActiveTab("videos")}
              disabled={!hasVideos}
              className={`px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${
                !hasVideos 
                  ? "opacity-30 cursor-not-allowed" 
                  : activeTab === "videos"
                    ? "bg-porcelain text-ink"
                    : "text-porcelain/60 hover:text-porcelain hover:bg-porcelain/10"
              }`}
            >
              Videos {(!hasVideos) && "(Coming Soon)"}
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-[50vh]">
        <AnimatePresence mode="wait">
          {activeTab === "photos" ? (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {category.images.length > 0 ? (
                <MasonryGallery images={category.images} />
              ) : (
                <div className="flex justify-center items-center h-64 text-porcelain/50 tracking-widest uppercase">
                  No photos available yet.
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-10 pb-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.videos.map((video) => {
                  const videoId = video.youtubeUrl.split("v=")[1]?.split("&")[0] || video.youtubeUrl.split("/").pop() || "";
                  return (
                    <VideoThumbnail 
                      key={video.id} 
                      videoId={videoId} 
                      title={video.title} 
                      onClick={() => setSelectedVideo(videoId)} 
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 text-porcelain/60 hover:text-white"
              onClick={() => setSelectedVideo(null)}
            >
              Close (ESC)
            </button>
            <div 
              className="w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
