"use client"

import { useState } from "react"

const faqs = [
  {
    num: "/ 01",
    q: "Is Gluta IV treatment available in Royapuram?",
    a: "Yes. Gluta IV treatment in Royapuram is available at AdGlo for people looking for skin glow, dull skin care, and fresher-looking skin with doctor-guided consultation.",
  },
  {
    num: "/ 02",
    q: "Who can choose Chemical Peel treatment in Royapuram?",
    a: "Chemical Peel in Royapuram is suitable for people dealing with tanning, pigmentation, acne marks, uneven skin tone, or dull skin.",
  },
  {
    num: "/ 03",
    q: "What is Aqua Luxe Skin Therapy used for?",
    a: "Aqua Luxe Skin Therapy in Royapuram is used for deep cleansing, hydration, exfoliation, and instant skin freshness.",
  },
  {
    num: "/ 04",
    q: "Is Micro Needling good for acne scars?",
    a: "Yes. Micro Needling treatment in Royapuram can help improve acne scars, open pores, and uneven skin texture with proper clinical guidance.",
  },
  {
    num: "/ 05",
    q: "Which skin treatment is best for dull skin in Royapuram?",
    a: "For dull skin, treatments like Gluta IV, Aqua Luxe Skin Therapy, and Chemical Peels in Royapuram may be suggested after skin analysis.",
  },
  {
    num: "/ 06",
    q: "Can I take these skin treatments before an event?",
    a: "Yes. If you have an upcoming event, visit a skin clinic in Royapuram early so the doctor can plan the right treatment and session timing.",
  },
  {
    num: "/ 07",
    q: "Are these treatments done after skin analysis?",
    a: "Yes. At AdGlo Royapuram, treatments like Gluta IV, Chemical Peel, Aqua Luxe, and Micro Needling are planned after checking your skin type and concern.",
  },
  {
    num: "/ 08",
    q: "How do I book a skin consultation in Royapuram?",
    a: "You can book a consultation at AdGlo Skin Clinic Royapuram for skin glow, pigmentation, acne marks, dull skin, and texture concerns by calling us, clicking the WhatsApp button on this page, or filling the booking form above.",
  },
]

export default function SkinFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="faq-wrap">
          <div className="faq-left">
            <div className="sec-num" style={{ marginBottom: "20px" }}>
              06 · Frequently Asked
            </div>
            <h2>
              Questions, <span className="it">answered.</span>
            </h2>
            <p>
              Everything you need to know before booking your skin consultation
              at AdGlo Royapuram.
            </p>

            <div className="faq-help">
              <div className="faq-help-label">Still have questions?</div>
              <h4>Talk to our skin specialist directly</h4>
              <a href="tel:+910000000000" className="phone">
                +91 00000 00000
              </a>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--ink-3)",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                Mon–Sat · 10am–8pm
              </p>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item${openIdx === idx ? " open" : ""}`}
              >
                <button className="faq-q" onClick={() => toggle(idx)}>
                  <span className="q-num">{faq.num}</span>
                  <span className="q-text">{faq.q}</span>
                  <span className="q-toggle" />
                </button>
                <div className="faq-a">
                  <div>
                    <div className="faq-a-inner">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
