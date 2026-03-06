"use client";

import React from "react";
import {
  BadgeCheck,
  FileText,
  Droplet,
  HeartHandshake,
  ClipboardCheck,
} from "lucide-react";

type Item = {
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const topRow: Item[] = [
  {
    title: "Proven Expertise",
    desc: "5+ years of experience in\nadvanced hair restoration.",
    Icon: BadgeCheck,
  },
  {
    title: "Personalized Plans",
    desc: "No generic treatments, only what works for you.",
    Icon: FileText,
  },
  {
    title: "Certified\nDermatologists",
    desc: "Trusted professionals\nleading every treatment.",
    Icon: Droplet,
  },
];

const bottomRow: Item[] = [
  {
    title: "2,00,000+ Happy\nPatients",
    desc: "Real results, real confidence.",
    Icon: HeartHandshake,
  },
  {
    title: "FDA-Approved\nTechnology",
    desc: "Safe, effective, and backed by\nscience.",
    Icon: ClipboardCheck,
  },
];

function FeatureCard({ item }: { item: Item }) {
  const { Icon, title, desc } = item;

  return (
    <div className="bg-white rounded-[34px] px-4 sm:px-5 md:px-6 py-5 sm:py-6 md:py-7 flex gap-3 sm:gap-4 md:gap-5 items-start shadow-lg">
      {/* Icon */}
      <div className="shrink-0 pt-0.5 sm:pt-1">
        <Icon className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 text-black" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-[1.05] font-extrabold text-black whitespace-pre-line">
          {title}
        </h3>
        <p className="mt-2 sm:mt-2.5 md:mt-3 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-[1.35] text-black/90 whitespace-pre-line">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseAdvancedGrohair() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <section className="w-full bg-white px-3 sm:px-4 md:px-6 py-6 sm:py-7 md:py-8"style={{fontFamily: "'Outfit', sans-serif"}}>
      {/* Pink rounded container */}
      <div className="mx-auto max-w-6xl rounded-[18px] sm:rounded-[20px] md:rounded-[22px] bg-[#eecad3] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Heading */}
        <h2 className="text-center text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[34px] 2xl:text-[40px] font-extrabold text-[#444] leading-tight">
          Why Choose Advanced GroHair?
        </h2>

        {/* Cards layout */}
        <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-10 space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8">
          {/* Top row: 3 cards - Stacks on mobile, becomes grid on tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            {topRow.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>

          {/* Bottom row: 2 cards centered - Stacks on mobile, becomes grid on tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-7 lg:max-w-4xl lg:mx-auto">
            {bottomRow.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>

          {/* CTA pill */}
          <a href="#form">
          <div className="flex justify-center pt-3 sm:pt-4">
            <button
              type="button"
              className="
                relative
                rounded-full
                cursor-pointer
                bg-[#e00000]
                text-white
                font-extrabold
                text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]
                px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-14
                py-2 sm:py-2.5 md:py-3 lg:py-4
                shadow-none
                outline-none
                whitespace-nowrap
                transition-transform active:scale-95
              "
              style={{
                boxShadow:
                  "0 0 0 2px #ffffff, 0 0 0 6px #e00000", // inner white ring + outer red ring (double border look)
              }}
            >
              Your Hair Deserves the Best – Take Action Today!
            </button>
          </div>
          </a>
        </div>
      </div>
    </section>
    </>
  );
}