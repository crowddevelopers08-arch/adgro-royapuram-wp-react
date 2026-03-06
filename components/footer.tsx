"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, ChevronRight, X } from "lucide-react";

type Props = {
  logoSrc?: string; // optional: pass your logo path (e.g. "/images/grohair-logo.png")
};

export default function ContactFooterReplica({ logoSrc = "/adgrojpg.jpg" }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <footer className="w-full"style={{fontFamily: "'Outfit', sans-serif"}}>
        {/* Dark section */}
        <section className="bg-[#3f3f3f] text-white">
          <div className="mx-auto max-w-7xl px-6 md:px-10 py-8 md:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              {/* Left: Logo + copy */}
              <div className="max-w-xl">
                <div className="mb-5">
                  <div className="relative h-[80px] w-[250px]">
                    <Image
                      src={logoSrc}
                      alt="Advanced Grohair"
                      fill
                      className="object-contain object-left"
                      priority
                    />
                  </div>
                </div>

                <p className="text-[15px] leading-6 text-white/90 max-w-[520px]">
                  Our experienced professionals and experts recommend you the best
                  treatment that matches your needs and assist you achieve the desired
                  results that you have always longed for.
                </p>
              </div>

              {/* Middle: Contact */}
              <div className="lg:pt-1">
                <h3 className="text-left text-[22px] font-semibold mb-5">
                  Contact
                </h3>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="pt-1">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-[15px] leading-6 text-white/90 max-w-[420px]">
                      
First Floor, No.187, MS Koil St, above Time emporium, Somu Nagar, Royapuram, Chennai, Tamil Nadu 600013
                    </p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <Phone className="h-5 w-5 text-white" />
                    <span className="text-[15px] text-white/90">7436856789</span>
                  </div>

                  <div className="flex gap-3 items-center">
                    <ChevronRight className="h-5 w-5 text-white" />
                    <a
                      href="/privacy-policy"
                      className="text-[15px] text-white/90 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Map - Reduced Height */}
              <div className="w-full">
                <div className="w-full overflow-hidden rounded-[2px] bg-white">
                  <div className="relative w-full h-[200px] sm:h-[220px] md:h-[260px] lg:h-[280px]">
                    <iframe
                      title="Advanced GroHair - Royapuram"
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d15546.07212338405!2d80.1540219!3d13.06632165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a526f680ad0db8d%3A0x4dcffb1d5d78d0c!2sAdvanced%20GroHair%20%26%20GloSkin%20-%20Royapuram%2C%20First%20Floor%2C%20No.187%2C%20MS%20Koil%20St%2C%20above%20Time%20emporium%2C%20Somu%20Nagar%2C%20Royapuram%2C%20Chennai%2C%20Tamil%20Nadu%20600013!3m2!1d13.113897999999999!2d80.2922894!5e0!3m2!1sen!2sin!4v1772803542739!5m2!1sen!2sin"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom copyright bar */}
        <div className="bg-white max-[470px]:mb-10">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="text-center text-[14px] text-black/90">
              Copyright © 2025 AdGro Hair Royapuram
            </p>
          </div>
        </div>

        {/* Fixed Mobile Buttons - Only visible on mobile */}
  <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
  <div className="flex h-14">
    {/* Call Button (Left) */}
    <a
      href="tel:+917436856789"
      className="flex-1 flex items-center justify-center gap-2 bg-[#e10b0b] text-white active:bg-[#c90909] transition-colors"
      aria-label="Call 7436856789"
    >
      <div className="flex flex-col items-center justify-center">
        <Phone className="w-5 h-5 mb-0.5" />
        <span className="font-semibold text-xs">Call Now</span>
      </div>
    </a>

    {/* Book Now Button (Right) */}
    <a 
      href="#form1" 
      className="flex-1 flex items-center justify-center gap-2 bg-[#3f3f3f] text-white active:bg-[#2a2a2a] transition-colors"
    >
      <div className="flex flex-col items-center justify-center">
        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span className="font-semibold text-xs">Book Now</span>
      </div>
    </a>
  </div>
</div>
      </footer>
    </>
  );
}