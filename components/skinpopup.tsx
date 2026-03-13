"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CONCERNS = [
  "What Are Your Concerns",
  "Hair Fall",
  "Dandruff",
  "Thin Hair",
  "Bald Patches",
  "Receding Hairline",
  "Alopecia",
];

export default function HairConsultationCardExact({
  bottomImageSrc = "https://ik.imagekit.io/5xfdb3p6jv/public/public/formimage.png",
  bottomImageAlt = "Certified Trichologists | 10,000+ Happy Patients | Free Consultation",
  leftImageSrc = "https://ik.imagekit.io/5xfdb3p6jv/public/public/ilayanila.png",
  leftImageAlt = "Hair Consultation Expert",
  autoShowDelay = 2000, // Show after 2 seconds by default
  showOnLoad = true,
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [problem, setProblem] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  // Auto-show popup on page load
  useEffect(() => {
    if (showOnLoad && !hasShownPopup) {
      // Check if user has seen the popup before in this session
      const hasSeenPopup = sessionStorage.getItem("hasSeenHairConsultPopup");
      
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          setHasShownPopup(true);
          // Mark that user has seen the popup for this session
          sessionStorage.setItem("hasSeenHairConsultPopup", "true");
        }, autoShowDelay);

        return () => clearTimeout(timer);
      }
    }
  }, [showOnLoad, autoShowDelay, hasShownPopup]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const canSubmit = useMemo(() => {
    const phoneOk = /^\d{10}$/.test(phone);
    const pinOk = /^\d{6}$/.test(pincode);
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return (
      fullName.trim().length > 1 &&
      phoneOk &&
      emailOk &&
      concern !== CONCERNS[0] &&
      problem.trim().length > 2 &&
      pinOk
    );
  }, [fullName, phone, email, concern, problem, pincode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setLoading(true);
      setSuccess(false);

      const res = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          mobile: phone,
          email,
          concern,
          treatment: concern,
          message: `${problem} | Pincode: ${pincode}`,
          source: "hair-consult-popup",
          formName: "hair-consult-popup",
          hairLossStage: "",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.error || "Submission failed. Please try again.");
        return;
      }

      setSuccess(true);

      setFullName("");
      setPhone("");
      setEmail("");
      setConcern(CONCERNS[0]);
      setProblem("");
      setPincode("");

      setTimeout(() => {
        setIsOpen(false);
        router.push("/thank-you");
      }, 1500);

    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  // Function to manually open popup (can be called from anywhere)
  const openPopup = () => {
    setIsOpen(true);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        /* Mobile-specific styles */
        @media only screen and (max-width: 767px) {
          .popup-content {
            max-height: 90vh !important;
            overflow-y: auto !important;
          }
          
          .popup-form-section {
            padding: 1.25rem !important;
          }
          
          .popup-title {
            font-size: 1.25rem !important;
          }
          
          .popup-subtitle {
            font-size: 0.75rem !important;
          }
          
          .popup-input {
            padding: 10px 12px !important;
            font-size: 14px !important;
          }
          
          .popup-select {
            padding: 10px 32px 10px 12px !important;
            font-size: 14px !important;
          }
          
          .popup-button {
            padding: 12px 16px !important;
            font-size: 15px !important;
          }
          
          .popup-bottom-image {
            height: 50px !important;
          }
          
          .popup-close-btn {
            top: 0.5rem !important;
            right: 0.5rem !important;
            background-color: rgba(0, 0, 0, 0.5) !important;
            border-radius: 50% !important;
            padding: 0.25rem !important;
          }
        }

        /* Animation keyframes */
        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .popup-slide-in {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>

      {/* Popup Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          style={{ 
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(5px)",
            fontFamily: "'Outfit', sans-serif"
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopup();
            }
          }}
        >
          {/* Close Button - Mobile optimized */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-200 transition-colors z-10 popup-close-btn"
            aria-label="Close popup"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Popup Content */}
          <div 
            className="w-full max-w-[1000px] popup-slide-in popup-content"
            style={{
              maxHeight: 'calc(100vh - 2rem)',
              overflowY: 'auto'
            }}
          >
            <div
              className="w-full bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden"
              style={{ border: "12px solid #e10b0b" }}
            >
              {/* Left Image Section - Hidden on mobile */}
              <div className="hidden md:block md:w-2/5 relative min-h-[550px] bg-gray-100">
                <Image
                  src={leftImageSrc}
                  alt={leftImageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="40vw"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <span className="text-[#e10b0b] font-bold text-xs sm:text-sm">Limited Time Offer</span>
                </div>
              </div>

              {/* Form Section - Full width on mobile */}
              <div className="w-full md:w-3/5 px-6 pb-6 pt-7 sm:px-7 sm:pb-7 sm:pt-8 popup-form-section">
                <div className="text-center mb-5">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 popup-title" style={{ color: "#3f3f3f" }}>
                    Book <span style={{ color: "#e10b0b" }}>Free Hair Consultation</span>
                  </h2>
                  <p className="text-sm text-gray-500 popup-subtitle">with Certified Trichologist</p>
                </div>

                {success && (
                  <div className="mb-4 p-3 rounded-lg text-sm bg-green-100 text-green-700 border border-green-300">
                    Thank you! Redirecting to thank you page...
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <InputStyled 
                      placeholder="Full Name" 
                      value={fullName} 
                      onChange={setFullName} 
                      className="popup-input"
                    />

                    <InputStyled
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(v) => setPhone(v.replace(/\D/g, "").slice(0, 10))}
                      inputMode="numeric"
                      className="popup-input"
                    />

                    <InputStyled
                      placeholder="Email Address"
                      value={email}
                      onChange={setEmail}
                      type="email"
                      className="popup-input"
                    />

                    <SelectStyled 
                      value={concern} 
                      onChange={setConcern} 
                      options={CONCERNS} 
                      className="popup-select"
                    />

                    <div className="sm:col-span-2">
                      <InputStyled
                        placeholder="Hair Problem Description"
                        value={problem}
                        onChange={setProblem}
                        className="popup-input"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <InputStyled
                        placeholder="6-Digit Pincode"
                        value={pincode}
                        onChange={(v) => setPincode(v.replace(/\D/g, "").slice(0, 6))}
                        inputMode="numeric"
                        className="popup-input"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={!canSubmit || loading}
                      className="w-full cursor-pointer transition disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] font-bold shadow-lg popup-button"
                      style={{
                        background: "#e10b0b",
                        borderRadius: "12px",
                        padding: "14px 18px",
                        fontSize: "16px",
                        color: "#ffffff",
                        boxShadow: "0 5px 15px rgba(225, 11, 11, 0.3)",
                      }}
                    >
                      {loading ? "Submitting..." : "Book Your Appointment Now"}
                    </button>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-200">
                    <div className="relative mx-auto w-full max-w-[500px] popup-bottom-image" style={{ height: '70px' }}>
                      <Image
                        src={bottomImageSrc}
                        alt={bottomImageAlt}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  <div className="text-center mt-3">
                    <button
                      type="button"
                      onClick={closePopup}
                      className="text-sm text-gray-400 hover:text-gray-600 underline transition-colors"
                    >
                      Maybe later
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden trigger button - only shown if popup is closed and hasn't been shown */}
      {!isOpen && !hasShownPopup && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 animate-bounce">
          <button
            onClick={openPopup}
            className="bg-[#e10b0b] text-white px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="sm:w-5 sm:h-5"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="hidden xs:inline">Free Consultation</span>
            <span className="xs:hidden">Consult</span>
          </button>
        </div>
      )}
    </>
  );
}

/* ---------- UI Helpers ---------- */

function InputStyled({ value, onChange, placeholder, type = "text", inputMode, className = "" }: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
  className?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      inputMode={inputMode}
      className={`w-full outline-none focus:border-[#e10b0b] focus:ring-2 focus:ring-red-100 transition-colors ${className}`}
      style={{
        borderRadius: "10px",
        border: "2px solid #d1d5db",
        padding: "12px 16px",
        fontSize: "15px",
        color: "#3f3f3f",
        backgroundColor: "#ffffff",
      }}
    />
  );
}

function SelectStyled({ value, onChange, options, className = "" }: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none outline-none bg-white focus:border-[#e10b0b] focus:ring-2 focus:ring-red-100 transition-colors ${className}`}
        style={{
          borderRadius: "10px",
          border: "2px solid #d1d5db",
          padding: "12px 40px 12px 16px",
          fontSize: "15px",
          color: value === options[0] ? "#9ca3af" : "#3f3f3f",
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#e10b0b" }}>
        ▼
      </div>
    </div>
  );
}