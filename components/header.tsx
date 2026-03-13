// components/GrohairTopBar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Props = {
  logoSrc?: string; // put your logo in /public and pass like "/grohair-logo.png"
  phone?: string;   // "+91 7436856789"
  announcementBarId?: string; // ID of the announcement bar to track
  bookNowUrl?: string; // URL for booking appointment
};

export default function GrohairTopBar({
  logoSrc = "https://ik.imagekit.io/5xfdb3p6jv/public/public/royalogo.jpg",
  phone = "+91 7436856789",
  announcementBarId = "red-top-announcement",
  bookNowUrl = "/book-appointment", // default booking URL
}: Props) {
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const telHref = `tel:${phone.replace(/\s+/g, "")}`;

  useEffect(() => {
    const handleScroll = () => {
      const announcementBar = document.getElementById(announcementBarId);
      
      if (announcementBar) {
        // Get the exact height of the announcement bar
        const announcementBarHeight = announcementBar.offsetHeight;
        
        if (window.scrollY > announcementBarHeight) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      } else {
        // Fallback to approximate height
        const approximateHeight = window.innerWidth < 640 ? 45 : 55;
        if (window.scrollY > approximateHeight) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    // Also handle resize in case the announcement bar height changes
    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [announcementBarId]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      {/* Spacer div to prevent content jump when header becomes fixed */}
      {isFixed && (
        <div 
          className="h-[55px] sm:h-[68px]" 
          style={{ 
            height: headerRef.current?.offsetHeight || '55px' 
          }} 
        />
      )}
      
      <header 
        ref={headerRef}
        className={`w-full bg-white transition-all duration-300 ${
          isFixed 
            ? "fixed top-0 left-0 right-0 z-50 shadow-lg animate-slideDown" 
            : "relative"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6" style={{fontFamily: "'Outfit', sans-serif"}}>
          <div className="flex items-center py-3 sm:py-4">
            {/* Left: Logo - Force left alignment */}
            <div className="mr-auto">
              <div className="relative h-[50px] w-[120px] sm:h-[70px] sm:w-[240px] md:h-[75px] md:w-[260px]">
                <Image
                  src={logoSrc}
                  alt="Advanced Grohair"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right: Desktop buttons */}
            <div className="ml-auto flex items-center space-x-3 sm:space-x-4">
              {/* Book Now Button - Visible on medium screens and up */}
              <a
                href="#form"
                className="
                  hidden md:inline-flex
                  items-center justify-center
                  rounded-full
                  bg-[#e10b0b]
                  text-white
                  font-semibold
                  shadow-sm shadow-red-500/30
                  transition-all duration-200
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  px-5 py-2.5
                  text-[15px]
                  whitespace-nowrap
                "
                aria-label="Book Now Appointment"
              >
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center">
                  {/* Calendar icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 2v4m8-4v4m-11 3h14M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Book Consultation
              </a>

              {/* Call button */}
              <a
                href={telHref}
                className="
                  inline-flex items-center justify-center
                  rounded-full
                  bg-[#e10b0b]
                  text-white
                  font-semibold
                  shadow-sm
                  transition-transform duration-200
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  px-4 py-2
                  sm:px-6 sm:py-2.5
                  text-[13px] sm:text-[14px] md:text-[15px]
                  whitespace-nowrap
                "
                aria-label={`Call ${phone}`}
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/0">
                  {/* Phone icon (SVG) to match the screenshot style */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.9.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.4 22 2 13.6 2 3c0-.6.4-1 1-1h4.2c.6 0 1 .4 1 1 0 1.4.2 2.7.6 3.9.1.4 0 .8-.3 1.1L6.6 10.8Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                {phone}
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}