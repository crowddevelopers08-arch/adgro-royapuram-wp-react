"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  id: string;
  name: string;
  avatarType: "letter";
  avatarLetter: string;
  avatarBg: string;
  rating: number;
  text: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill={i < rating ? "#fcb716" : "#d1d1d1"}
          />
        </svg>
      ))}
    </div>
  );
}

function GoogleGIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Google">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.3 1.54 7.74 2.82l5.28-5.28C33.78 4.04 29.28 2 24 2 14.73 2 6.95 7.3 3.69 14.92l6.45 5.01C11.77 13.74 17.43 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46 24.5c0-1.6-.14-2.78-.44-4H24v7.6h12.76c-.26 2-.66 3.16-1.86 4.36l6.06 4.7C44.3 34.02 46 29.74 46 24.5z"
      />
      <path
        fill="#FBBC05"
        d="M10.14 28.93A14.7 14.7 0 0 1 9.5 24c0-1.72.3-3.38.64-4.93l-6.45-5.01A22 22 0 0 0 2 24c0 3.52.84 6.86 2.33 9.8l5.81-4.87z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.28 0 9.72-1.74 12.96-4.72l-6.06-4.7c-1.62 1.1-3.8 1.86-6.9 1.86-6.57 0-12.23-4.24-13.86-10.07l-5.81 4.87C6.95 40.7 14.73 46 24 46z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
}

export default function ClientsTestimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Color variables from your palette
  const colors = {
    dark: "#1f1f1f",
    medium: "#343434",
    primary: "#fcb716",
    accent: "#c3a238",
  };

  const reviews: Review[] = useMemo(
    () => [
      {
        id: "1",
        name: "Richa Ann",
        avatarType: "letter",
        avatarLetter: "R",
        avatarBg: colors.primary,
        rating: 5,
        text: "I recently visited max hair clinic,they provide high standard treatment,the hospitality was excellent..doctors are very skilled and staff were friendly.I strongly recommend max hair clinic.",
      },
      {
        id: "2",
        name: "Palani Kumar",
        avatarType: "letter",
        avatarLetter: "P",
        avatarBg: colors.accent,
        rating: 5,
        text: "I completed 4 Hair Regrowth sessions over the past few months and i have already noticed less hair falls. Patience is key with Hair Regrowth, but it's totally paying off. The clinic has been very supportive throughout the journey...",
      },
      {
        id: "3",
        name: "Selva Eagle",
        avatarType: "letter",
        avatarLetter: "S",
        avatarBg: colors.primary,
        rating: 5,
        text: "I got my cosmetic hair system done here and it was a game-changer! It looks so natural and has boosted my confidence tremendously. The team helped me choose the right look and fit – nobody can tell it's a system!",
      },
      {
        id: "4",
        name: "Anjali Sharma",
        avatarType: "letter",
        avatarLetter: "A",
        avatarBg: colors.accent,
        rating: 5,
        text: "After struggling with hair loss for years, the transplant procedure here changed my life. The results look completely natural and the recovery was smoother than I expected. Highly professional team!",
      },
      {
        id: "5",
        name: "Vikram Singh",
        avatarType: "letter",
        avatarLetter: "V",
        avatarBg: colors.primary,
        rating: 5,
        text: "Excellent service from consultation to post-treatment care. My hair density has improved significantly in just 6 months. The staff is knowledgeable and always available to answer questions.",
      },
      {
        id: "6",
        name: "Priya Patel",
        avatarType: "letter",
        avatarLetter: "P",
        avatarBg: colors.accent,
        rating: 5,
        text: "The laser therapy sessions worked wonders for my thinning hair. I can see new growth already and my hair feels stronger. Worth every penny for the confidence boost!",
      },
    ],
    []
  );

  // Duplicate reviews for infinite loop effect - simplified for mobile
  const duplicatedReviews = [...reviews, ...reviews];

  // Responsive setup
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
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Auto-play for infinite loop
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % reviews.length;
      scrollToCard(nextIndex, true);
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying, reviews.length]);

  const scrollToCard = (index: number, smooth = true) => {
    const el = scrollerRef.current;
    if (!el) return;

    if (isMobile) {
      // For mobile: center align single card
      const cardWidth = window.innerWidth * 0.85; // 85% of screen width
      const gap = 16;
      const containerWidth = window.innerWidth;
      const scrollPosition = index * (cardWidth + gap) + ((containerWidth - cardWidth) / 2) - gap/2;
      
      el.scrollTo({ left: scrollPosition, behavior: smooth ? "smooth" : "auto" });
    } else {
      // For desktop/tablet: original behavior
      const cardWidth = 420;
      const gap = 24;
      const scrollPosition = index * (cardWidth + gap);
      
      el.scrollTo({ left: scrollPosition, behavior: smooth ? "smooth" : "auto" });
    }
    
    setCurrentIndex(index % reviews.length);
  };

  const scrollByCards = (dir: "left" | "right") => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    setIsAutoPlaying(false);

    const newIndex = dir === "left" 
      ? (currentIndex - 1 + reviews.length) % reviews.length
      : (currentIndex + 1) % reviews.length;
    
    scrollToCard(newIndex);
    
    // Restart autoplay after 5 seconds
    setTimeout(() => {
      if (!isAutoPlaying) {
        setIsAutoPlaying(true);
      }
    }, 5000);
  };

  // Mobile swipe handling
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !isMobile) return;

    let startX = 0;
    let scrollLeft = 0;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].pageX;
      scrollLeft = el.scrollLeft;
      isScrolling = true;
      setIsAutoPlaying(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) return;
      e.preventDefault();
      
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      if (!isScrolling) return;
      isScrolling = false;
      
      const cardWidth = window.innerWidth * 0.85;
      const gap = 16;
      const threshold = cardWidth / 3; // Lower threshold for better mobile experience
      
      const finalScrollLeft = el.scrollLeft;
      const scrollDiff = finalScrollLeft - scrollLeft;
      
      if (Math.abs(scrollDiff) > threshold) {
        if (scrollDiff > 0) {
          // Swiped left, go to previous
          scrollByCards("left");
        } else {
          // Swiped right, go to next
          scrollByCards("right");
        }
      } else {
        // Return to original position
        scrollToCard(currentIndex, true);
      }
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex, isMobile, scrollToCard, scrollByCards]);

  // Calculate current display index
  const getVisibleIndex = () => {
    return currentIndex % reviews.length;
  };

  // Center alignment for mobile
  const getMobileCardStyle = () => {
    if (!isMobile) return {};
    
    return {
      width: '85vw',
      maxWidth: '400px',
      minWidth: '85vw',
      margin: '0 auto',
    };
  };

  return (
    <section className="w-full bg-white py-8 sm:py-10 max-[470px]:py-6 lg:py-10 overflow-hidden">
      {/* Title */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="text-3xl sm:text-4xl md:text-[56px] leading-[1.05] font-extrabold tracking-tight"
          style={{ color: colors.dark }}
        >
          <span style={{ color: colors.medium }}>What</span>{" "}
          <span>Our Clients say About</span>
          <br />
          <span style={{ color: colors.medium }}>Us</span>
        </h2>

        <p 
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-[22px] max-w-3xl mx-auto"
          style={{ color: colors.medium }}
        >
          Every Client Story is a Statement for Our Expert Hair Care Clinic in India.
        </p>
      </div>

      {/* Slider Area */}
      <div className="relative mx-auto mt-8 sm:mt-10 max-w-[1400px] px-2 sm:px-4">
        {/* Navigation Arrows */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByCards("left")}
          className="absolute left-0 sm:-left-2 lg:-left-4 top-1/2 z-20 -translate-y-1/2 
                     w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg
                     flex items-center justify-center transition-all duration-300
                     border hover:scale-110 active:scale-95"
          style={{ 
            backgroundColor: colors.primary,
            borderColor: colors.accent,
          }}
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" style={{ color: colors.dark }} strokeWidth={2.5} />
        </button>

        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByCards("right")}
          className="absolute right-0 sm:-right-2 lg:-right-4 top-1/2 z-20 -translate-y-1/2 
                     w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg
                     flex items-center justify-center transition-all duration-300
                     border hover:scale-110 active:scale-95"
          style={{ 
            backgroundColor: colors.primary,
            borderColor: colors.accent,
          }}
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" style={{ color: colors.dark }} strokeWidth={2.5} />
        </button>

        {/* Cards track - Mobile optimized */}
        <div
          ref={scrollerRef}
          className="overflow-x-auto scroll-smooth pb-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            cursor: isMobile ? 'grab' : 'default',
            scrollSnapType: isMobile ? 'x mandatory' : 'none',
          }}
          onMouseDown={() => setIsAutoPlaying(false)}
        >
          <div 
            className={`flex ${isMobile ? 'gap-4' : 'gap-4 sm:gap-6 lg:gap-8'} py-4`}
            style={isMobile ? {
              paddingLeft: '7.5vw', // Center offset for mobile
              paddingRight: '7.5vw', // Center offset for mobile
            } : {}}
          >
            {duplicatedReviews.map((r, idx) => (
              <article
                key={`${r.id}-${idx}`}
                className={`
                  relative
                  flex-shrink-0
                  rounded-2xl
                  px-6 sm:px-8 lg:px-10
                  py-8 sm:py-10
                  transition-all duration-300
                  hover:shadow-xl hover:-translate-y-1
                  active:scale-[0.98] active:shadow-lg
                  ${isMobile ? 'scroll-snap-align-center mx-1' : ''}
                `}
                style={{
                  ...(isMobile ? getMobileCardStyle() : {
                    width: '420px',
                    maxWidth: '420px',
                    minWidth: '420px',
                  }),
                  ...(isMobile ? { scrollSnapAlign: 'center' } : {}),
                  backgroundColor: '#f8f9fa',
                  border: `2px solid ${colors.primary}30`,
                }}
              >
                {/* Header row */}
                <div className="flex items-start justify-between">
                  {/* Avatar + name + stars */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Avatar */}
                    <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-full">
                      <div
                        className="flex h-full w-full items-center justify-center text-white 
                                   text-lg sm:text-xl font-semibold"
                        style={{ backgroundColor: r.avatarBg }}
                      >
                        {r.avatarLetter}
                      </div>
                    </div>

                    {/* Name + Stars */}
                    <div className="pt-1">
                      <div 
                        className="text-base sm:text-lg font-semibold"
                        style={{ color: colors.dark }}
                      >
                        {r.name}
                      </div>
                      <div className="mt-1">
                        <Stars rating={r.rating} />
                      </div>
                    </div>
                  </div>

                  {/* Google icon */}
                  <GoogleGIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                </div>
                
                {/* Review text */}
                <p 
                  className="relative z-10 mt-6 sm:mt-8 text-sm sm:text-base lg:text-[20px] 
                            leading-relaxed sm:leading-[1.75]"
                  style={{ color: colors.medium }}
                >
                  {r.text}
                </p>

                {/* Decorative corner */}
                <div 
                  className="absolute bottom-4 right-4 w-6 h-6"
                  style={{ color: colors.primary }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile counter */}
        {isMobile && (
          <div className="text-center mt-4">
            <p 
              className="text-sm"
              style={{ color: colors.medium }}
            >
              <span className="font-medium" style={{ color: colors.dark }}>
                {getVisibleIndex() + 1}
              </span> of {reviews.length}
              <span className="ml-2" style={{ color: colors.accent }}>
                • Swipe or tap arrows
              </span>
            </p>
          </div>
        )}

        {/* Style to hide scrollbar */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
          .scroll-snap-align-center {
            scroll-snap-align: center;
          }
        `}</style>
      </div>
    </section>
  );
}