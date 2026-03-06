// components/RedTopAnnouncementBar.tsx
"use client";

export default function RedTopAnnouncementBar() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <div
      className="
        w-full
        bg-[#ff1a1a]
        text-white
        text-center
        font-semibold
        tracking-wide
        px-3
        py-2
        sm:py-2.5
      "
      style={{
        fontSize: "clamp(14px, 2.2vw, 28px)", // responsive like your screenshot
        lineHeight: "1.15",
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      #1 Hair Treatment Clinic in Royapuram at Affordable Cost
    </div>
    </>
  );
}
