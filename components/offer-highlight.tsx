"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

type VideoItem = {
  id: string;
  videoSrc: string;
  title?: string;
  description?: string;
};

export default function VideoResultsCarousel() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const videos: VideoItem[] = useMemo(
    () => [
      {
        id: "1",
        videoSrc: "/video1.mp4",
        title: "Hair Transplant Results",
        description: "Complete hair restoration in 6 months"
      },
      {
        id: "2",
        videoSrc: "/video1.mp4",
        title: "Beard Transplant",
        description: "Natural beard reconstruction results"
      },
      {
        id: "3",
        videoSrc: "/video2.mp4",
        title: "Eyebrow Restoration",
        description: "Before and after transformation"
      },
    ],
    []
  );

  const scrollerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingStates, setPlayingStates] = useState<boolean[]>(Array(videos.length).fill(false));
  const [mutedStates, setMutedStates] = useState<boolean[]>(Array(videos.length).fill(true));
  const [visibleCards, setVisibleCards] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Scroll to specific video
  const scrollToVideo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    
    const cardWidth = isMobile ? window.innerWidth * 0.85 : 400;
    const gap = isMobile ? 16 : 24;
    const scrollPosition = index * (cardWidth + gap);
    el.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  // Scroll by one card
  const scrollByOne = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(videos.length - 1, currentIndex + 1);
    
    scrollToVideo(newIndex);
  };

  // Toggle play/pause for specific video
  const togglePlayPause = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    
    if (video.paused) {
      // Pause all other videos
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index && !v.paused) {
          v.pause();
          setPlayingStates(prev => {
            const newStates = [...prev];
            newStates[i] = false;
            return newStates;
          });
        }
      });
      
      // Play the selected video
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Video play failed:", error);
          if (isMobile) {
            alert("Tap the video to play. Some mobile browsers require user interaction.");
          }
        });
      }
      
      setPlayingStates(prev => {
        const newStates = [...prev];
        newStates[index] = true;
        return newStates;
      });
    } else {
      video.pause();
      setPlayingStates(prev => {
        const newStates = [...prev];
        newStates[index] = false;
        return newStates;
      });
    }
  };

  // Toggle mute/unmute for specific video
  const toggleMute = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    
    video.muted = !video.muted;
    setMutedStates(prev => {
      const newStates = [...prev];
      newStates[index] = video.muted;
      return newStates;
    });
  };

  // Handle video ended
  const handleVideoEnded = (index: number) => {
    setPlayingStates(prev => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
    }
  };

  // Auto-pause videos when scrolling away
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          
          if (!entry.isIntersecting) {
            const video = videoRefs.current[index];
            if (video && !video.paused) {
              video.pause();
              setPlayingStates(prev => {
                const newStates = [...prev];
                newStates[index] = false;
                return newStates;
              });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => observer.observe(card));

    return () => {
      videoCards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
    
      <section className="w-full bg-[#e8e8e8] py-8 sm:py-10 lg:py-10"style={{fontFamily: "'Outfit', sans-serif"}}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          {/* <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-flex items-center justify-center mb-3">
              <div className="h-1 w-12 bg-gradient-to-r from-[#e10b0b] to-[#ff6b6b] rounded-full"></div>
              <h2 className="mx-4 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Watch <span className="text-[#e10b0b]">Real Transformations</span>
              </h2>
              <div className="h-1 w-12 bg-gradient-to-l from-[#e10b0b] to-[#ff6b6b] rounded-full"></div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              See the amazing results our patients have achieved with our advanced hair restoration procedures.
            </p>
          </div> */}

          {/* Video Carousel */}
          <div className="relative px-2 sm:px-0">
            {/* Navigation Arrows */}
            {videos.length > visibleCards && (
              <>
                <button
                  onClick={() => scrollByOne('left')}
                  disabled={currentIndex === 0}
                  className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10
                             w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg
                             flex items-center justify-center disabled:opacity-30
                             hover:bg-gray-50 transition-all duration-200 border border-gray-300
                             hover:border-[#e10b0b] hover:shadow-red-100"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>

                <button
                  onClick={() => scrollByOne('right')}
                  disabled={currentIndex === videos.length - 1}
                  className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10
                             w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg
                             flex items-center justify-center disabled:opacity-30
                             hover:bg-gray-50 transition-all duration-200 border border-gray-300
                             hover:border-[#e10b0b] hover:shadow-red-100"
                  aria-label="Next video"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>
              </>
            )}

            {/* Video Scroller */}
            <div
              ref={scrollerRef}
              className="overflow-x-auto scroll-smooth pb-4"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
              }}
            >
              {/* Inner container with all videos */}
              <div className="flex gap-4 sm:gap-6">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    data-index={index}
                    className={`video-card flex-shrink-0 ${
                      isMobile ? 'w-[85vw]' : 'w-[350px] sm:w-[370px]'
                    }`}
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                      {/* Video Container */}
                      <div className="relative h-[500px] sm:h-[520px] md:h-[540px]">
                        <video
                          ref={el => {
                            videoRefs.current[index] = el;
                          }}
                          src={video.videoSrc}
                          className="w-full h-full object-cover"
                          muted={mutedStates[index]}
                          loop
                          playsInline
                          preload="metadata"
                          onClick={() => togglePlayPause(index)}
                          onEnded={() => handleVideoEnded(index)}
                          playsInline={true}
                          webkit-playsinline="true"
                          x5-playsinline="true"
                          x5-video-player-type="h5-page"
                          x5-video-player-fullscreen="true"
                          x5-video-orientation="portrait"
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        
                        {/* Play/Pause Overlay */}
                        <div 
                          className="absolute inset-0 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlayPause(index);
                          }}
                        >
                          <button
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${
                              playingStates[index] 
                                ? 'bg-[#e10b0b]/80 hover:bg-[#e10b0b]' 
                                : 'bg-[#e10b0b] hover:bg-[#ff0000]'
                            } flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105`}
                            aria-label={playingStates[index] ? "Pause video" : "Play video"}
                          >
                            {playingStates[index] ? (
                              <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            ) : (
                              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1" />
                            )}
                          </button>
                        </div>

                        {/* Video Controls */}
                        <div className="absolute bottom-4 right-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMute(index);
                            }}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-all hover:scale-105"
                            aria-label={mutedStates[index] ? "Unmute video" : "Mute video"}
                          >
                            {mutedStates[index] ? (
                              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            ) : (
                              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            )}
                          </button>
                        </div>
                        {/* Index Badge */}
                        <div className="absolute top-4 left-4 bg-[#e10b0b] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                          #{index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hide scrollbar */}
              <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </div>
      </section>
    </>
  );
}