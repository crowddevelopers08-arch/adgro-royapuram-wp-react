"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const desktopImages = [
  {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-10-3.jpg",
    alt: "Desktop Image 1"
  },
  {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-92-new.jpg",
    alt: "Desktop Image 2"
  },
  {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-91-3.jpg",
    alt: "Desktop Image 3"
  },
  {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-10-3.jpg",
    alt: "Desktop Image 1"
  },
  {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-92-new.jpg",
    alt: "Desktop Image 2"
  },
  {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-91-3.jpg",
    alt: "Desktop Image 3"
  },
];

const mobileImages = [
  {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-81.webp",
    alt: "Mobile Image 1"
  },
  {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-82.webp",
    alt: "Mobile Image 2"
  },
  {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-83.webp",
    alt: "Mobile Image 3"
  },
 {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-81.webp",
    alt: "Mobile Image 1"
  },
  {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-82.webp",
    alt: "Mobile Image 2"
  },
 {
    src: "https://ik.imagekit.io/5xfdb3p6jv/public/public/Creative-83.webp",
    alt: "Mobile Image 3"
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    const images = isMobile ? mobileImages : desktopImages;
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    const images = isMobile ? mobileImages : desktopImages;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Don't render until screen size is known to prevent flash of wrong banner
  if (isMobile === undefined) {
    return (
      <div className="py-10 max-[470px]:py-6 bg-[#3f3f3f]">
        <div className="relative w-full max-w-7xl mx-auto h-[450px] sm:h-[350px] md:h-[450px] rounded-xl bg-[#4a4a4a]" />
      </div>
    );
  }

  // Get current images based on screen size
  const currentImages = isMobile ? mobileImages : desktopImages;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div className="py-10 max-[470px]:py-6 bg-[#3f3f3f]" style={{fontFamily: "'Outfit', sans-serif"}}>
        <section 
          id="hero"
          className="relative w-full max-w-7xl mx-auto h-[450px] sm:h-[350px] md:h-[450px] overflow-hidden"
        >
          {/* Image Container */}
          <div className="relative w-full h-full">
            {currentImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-xl w-full h-full"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full shadow-lg transition-colors z-10 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full shadow-lg transition-colors z-10 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {currentImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-white" 
                    : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter - Simplified */}
          <div className="absolute bottom-2 right-2 bg-black/40 text-white px-2 py-1 rounded text-xs font-medium z-10">
            {currentIndex + 1}/{currentImages.length}
          </div>
        </section>
      </div>
    </>
  );
};

export default ImageCarousel;