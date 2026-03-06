// components/GrohairTopBar.tsx
"use client";

import Image from "next/image";

type Props = {
  logoSrc?: string; // put your logo in /public and pass like "/grohair-logo.png"
  phone?: string;   // "+91 7436856789"
};

export default function ThankTopBar({
  logoSrc = "/adgrojpg.jpg",
  phone = "+91 7436856789",
}: Props) {
  const telHref = `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <header className="w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <div className="flex items-center py-3 sm:py-4">
          {/* Left: Logo - Force left alignment */}
          <div className="mr-auto">
            <div className="relative h-[55px] w-[120px] sm:h-[75px] sm:w-[240px] md:h-[70px] md:w-[260px]">
              <Image
                src={logoSrc}
                alt="Advanced Grohair"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Right: Call button */}
          <div className="ml-auto">
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
  );
}