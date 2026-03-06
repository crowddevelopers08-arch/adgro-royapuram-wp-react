"use client";

import Image from "next/image";
import { useMemo } from "react";

type CardItem = {
  title: string;
  desc: string;
  img: string;
};

export default function HairTreatmentsGrid() {
  const items = useMemo<CardItem[]>(
    () => [
      {
        title: "Hair Transplant",
        desc: "Dealing with hair loss or thinning? Our expert hair transplant solutions provide natural, permanent restoration for a fuller, thicker look.",
        img: "/treatment1.jpg",
      },
      {
        title: "Baldness Treatment",
        desc: "Regain lost hair and rebuild confidence with expert-backed restoration solutions that work. Whether it's partial or complete baldness, we've got a treatment for you.",
        img: "/treatment2.jpg",
      },
      {
        title: "Hair Thinning Treatment",
        desc: "Thicker, fuller hair is possible! Our specialized therapies strengthen your hair from the roots, reducing thinning and improving volume.",
        img: "/treatment3.jpg",
      },
      {
        title: "Alopecia & Patchy Hair Loss",
        desc: "Tired of dealing with sudden bald patches? Our advanced treatments target alopecia, reactivating dormant follicles for visible regrowth.",
        img: "/treatment4.jpg",
      },
      {
        title: "Receding Hairline Solutions",
        desc: "Stop your hairline from moving backward! Our customized approach helps strengthen existing hair and stimulate new growth for a more youthful look.",
        img: "/treatment5.jpg",
      },
      {
        title: "Genetic Hair Loss Treatment",
        desc: "Inherited hair loss doesn't have to define your look. Our personalized treatments tackle hereditary patterns, giving you the best chance at long-term regrowth.",
        img: "/treatment6.jpg",
      },
    ],
    []
  );

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <section className="w-full bg-white"style={{fontFamily: "'Outfit', sans-serif"}}>
      {/* Top Title */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-10 max-[470px]:pt-8">
        <h2 className="text-center font-semibold text-[#ff0000] text-2xl sm:text-3xl lg:text-4xl">
          Regain Confidence with Personalised Hair Treatments
        </h2>

        {/* Cards Grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-xl bg-white shadow-[0_8px_22px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Image block */}
              <div className="px-6 pt-6">
                <div className="relative w-full h-[230px] sm:h-[230px] md:h-[250px] rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={it.img}
                    alt={it.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
              </div>

              {/* Content with fixed height container */}
              <div className="px-6 pb-6 pt-5 text-center flex flex-col min-h-[180px]">
                <h3 className="text-[17px] sm:text-lg md:text-xl font-bold text-black">
                  {it.title}
                </h3>

                <p className="mt-3 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-[#333] line-clamp-3">
                  {it.desc}
                </p>

                {/* Button at consistent position */}
                <a href="#form">
                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    className="rounded-full cursor-pointer bg-[#e60000] px-5 py-2.5 shadow-[0_3px_0_rgba(0,0,0,0.08)] hover:bg-[#ff0000] transition-colors duration-300"
                  >
                    <span className="block rounded-full border-2 border-white px-12 sm:px-14 py-1.5 text-white text-[15px] sm:text-[16px] font-semibold hover:bg-white hover:text-[#e60000] transition-colors duration-300">
                      Fix It
                    </span>
                  </button>
                </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}