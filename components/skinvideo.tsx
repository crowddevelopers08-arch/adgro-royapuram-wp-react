"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import ConsultationFormPopup from "./skinpopup";

type VideoItem = {
  id: string;
  videoSrc: string;
  title?: string;
  description?: string;
};

export default function VideoResultsCarousel() {
  const [isFormOpen, setIsFormOpen] = useState(false); // State for form popup
  
  const videos: VideoItem[] = useMemo(
    () => [
      {
        id: "1",
        videoSrc: "/videoone.mp4",
        title: "Patient Transformation 1",
        description: "Complete hair restoration results"
      },
      {
        id: "2",
        videoSrc: "/videoone.mp4",
        title: "Patient Transformation 2",
        description: "Natural hairline reconstruction"
      },
      {
        id: "3",
        videoSrc: "/videoone.mp4",
        title: "Patient Transformation 3",
        description: "Full coverage hair transplant"
      },
      {
        id: "4",
        videoSrc: "/videoone.mp4",
        title: "Patient Transformation 4",
        description: "Beard transplant success story"
      },
      {
        id: "5",
        videoSrc: "/videoone.mp4",
        title: "Patient Transformation 5",
        description: "Eyebrow restoration results"
      },
      {
        id: "6",
        videoSrc: "/videoone.mp4",
        title: "Patient Transformation 6",
        description: "Advanced FUE procedure results"
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

  // Determine number of visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1); // Mobile: 1 card
      } else if (width < 1024) {
        setVisibleCards(2); // Tablet: 2 cards
      } else {
        setVisibleCards(3); // Desktop: 3 cards
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Scroll to specific video
  const scrollToVideo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    
    const cardWidth = window.innerWidth < 640 ? 320 : 400;
    const gap = window.innerWidth < 640 ? 16 : 24;
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
      video.play();
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

  // Calculate padding for centering based on visible cards
  const getCenterPadding = () => {
    const cardWidth = window.innerWidth < 640 ? 320 : 400;
    const gap = window.innerWidth < 640 ? 16 : 24;
    const totalWidth = (cardWidth * visibleCards) + (gap * (visibleCards - 1));
    
    return `calc(50% - (${totalWidth}px / 2))`;
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <section className="w-full bg-white py-8 sm:py-10 max-[470px]:py-6 lg:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 max-[470px]:mb-6 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
              Real People. <span className="text-[#fcb716]">Real Results.</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Witness the transformative power of our hair restoration procedures through real patient videos.
            </p>
          </div>

          {/* Video Carousel */}
          <div className="relative">
            {/* Navigation Arrows - Show only when there are more cards */}
            {videos.length > visibleCards && (
              <>
                <button
                  onClick={() => scrollByOne('left')}
                  disabled={currentIndex === 0}
                  className="absolute left-0 sm:-left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-10
                             w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg
                             flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed
                             hover:bg-gray-50 transition-colors border border-gray-200"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
                </button>

                <button
                  onClick={() => scrollByOne('right')}
                  disabled={currentIndex === videos.length - 1}
                  className="absolute right-0 sm:-right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-10
                             w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg
                             flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed
                             hover:bg-gray-50 transition-colors border border-gray-200"
                  aria-label="Next video"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
                </button>
              </>
            )}

            {/* Video Scroller */}
            <div
              ref={scrollerRef}
              className="overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
              }}
            >
              {/* Inner container with all videos */}
              <div 
                className="flex gap-4 sm:gap-6"
                style={{
                  width: 'max-content',
                  margin: '0 auto',
                  paddingLeft: getCenterPadding(),
                  paddingRight: getCenterPadding(),
                }}
              >
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    data-index={index}
                    className={`video-card flex-shrink-0 snap-center transition-all duration-300 ${
                      currentIndex === index ? 'scale-100' : 'scale-95 opacity-90'
                    }`}
                    style={{
                      width: window.innerWidth < 640 ? 'calc(100vw - 48px)' : '400px',
                      maxWidth: '400px',
                    }}
                  >
                    <div className="bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl">
                      {/* Video Container - Increased height on all screens */}
                    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px]">
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
                        />
                        
                        {/* Play/Pause Overlay */}
                        <div className="absolute inset-0 bg-black/20 sm:bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePlayPause(index);
                            }}
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 
                                       rounded-full bg-[#fcb716]/90 flex items-center justify-center
                                       hover:bg-[#fcb716] hover:scale-110 transition-all duration-300"
                            aria-label={playingStates[index] ? "Pause video" : "Play video"}
                          >
                            {playingStates[index] ? (
                              <Pause className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" fill="white" />
                            ) : (
                              <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white ml-0.5 sm:ml-1" fill="white" />
                            )}
                          </button>
                        </div>

                        {/* Video Controls */}
                        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMute(index);
                            }}
                            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
                                       rounded-full bg-black/60 flex items-center justify-center
                                       hover:bg-black/80 transition-colors"
                            aria-label={mutedStates[index] ? "Unmute video" : "Mute video"}
                          >
                            {mutedStates[index] ? (
                              <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                            ) : (
                              <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Style to hide scrollbar */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="sm:hidden text-center mt-4">
            <p className="text-xs text-gray-500">Swipe to see more videos</p>
          </div>

          {/* CTA - Updated to trigger popup */}
          <div className="text-center mt-8 sm:mt-8 lg:8 max-[470px]:mt-4">
            <button 
              onClick={openForm}
              className="
                w-full rounded-lg sm:rounded-xl
                bg-[#fcb716]
                py-3 sm:py-3.5 md:py-4
                text-sm sm:text-base font-semibold text-gray-900
                hover:[#fcb716]
                active:scale-[0.98]
                transition-all duration-200
                flex items-center justify-center gap-2 sm:gap-3
                shadow-lg hover:shadow-xl
                max-w-md mx-auto
              "
            >
              Book Your Free Consultation
            </button>
            <p className="text-gray-600 mt-2 sm:mt-4 text-xs sm:text-sm">
              See your own transformation. Schedule a consultation today.
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Form Popup */}
      <ConsultationFormPopup 
        isOpen={isFormOpen} 
        onClose={closeForm} 
      />
    </>
  );
}