"use client";

import React from "react";

type Props = {
  title?: string;
  youtubeUrl: string;
};

function getYouTubeId(input: string) {
  try {
    if (!input.includes("http")) return input;
    const url = new URL(input);
    
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "");
    }
    
    const v = url.searchParams.get("v");
    if (v) return v;
    
    const parts = url.pathname.split("/");
    const embedIndex = parts.findIndex((p) => p === "embed");
    if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1];
    
    return input;
  } catch {
    return input;
  }
}

export default function AdvanceHairVideoSection({
  title = "Advance Hair Regrowth Solutions",
  youtubeUrl = "https://www.youtube.com/embed/GB3LUQxDkcI",
}: Props) {
  const videoId = getYouTubeId(youtubeUrl);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <section className="w-full bg-[#e8e8e8] py-7 sm:py-10"style={{fontFamily: "'Outfit', sans-serif"}}>
      {/* Title */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-5">
        <h2 className="text-center font-bold text-[#ff0000] text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          {title}
        </h2>
      </div>

      {/* Video Container - Slightly larger */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6"> {/* Increased from max-w-4xl */}
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg sm:shadow-xl"> {/* Increased shadow and border radius */}
          {/* Increased height video */}
        <div className="relative w-full aspect-[16/12] sm:aspect-[16/7] md:aspect-[16/6.8] lg:aspect-[16/6.5]">
  <iframe
    className="absolute inset-0 w-full h-full"
    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
        </div>
      </div>
    </section>
    </>
  );
}