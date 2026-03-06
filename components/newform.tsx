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

export default function NewHairConsultationCardExact({
  bottomImageSrc = "/formimage.png",
  bottomImageAlt = "Certified Trichologists | 10,000+ Happy Patients | Free Consultation",
  leftImageSrc = "/ilayanilacp.png",
  leftImageAlt = "Hair Consultation Expert",
}) {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [problem, setProblem] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Check if popup has been shown in this session
  useEffect(() => {
    const hasPopupBeenShown = sessionStorage.getItem("popupShown");
    
    if (!hasPopupBeenShown) {
      // Show popup after a small delay (1 second)
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("popupShown", "true");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

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
          source: "hair-consult-form",
          formName: "hair-consult-form",
          hairLossStage: "", // not used in this form
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.error || "Submission failed. Please try again.");
        return;
      }

      setSuccess(true);

      // Clear form
      setFullName("");
      setPhone("");
      setEmail("");
      setConcern(CONCERNS[0]);
      setProblem("");
      setPincode("");

      // Close popup if open and redirect
      setTimeout(() => {
        setShowPopup(false);
        setSuccess(false);
        router.push("/thank-you");
      }, 1500);

    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Handle click outside to close popup
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClosePopup();
    }
  };

  // Main component (always visible)
  const MainComponent = (
    <section
      id="form1"
      className="w-full"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div
        className="w-full bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden mobile-card-container"
        style={{ border: "12px solid #e10b0b" }}
      >
        {/* Left Image Section */}
        <div 
          className="md:w-2/5 relative min-h-[300px] md:min-h-[600px] bg-gray-100 mobile-image-container"
        >
          <Image
            src={leftImageSrc}
            alt={leftImageAlt}
            fill
            className="object-cover md:object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-3/5 px-6 pb-6 pt-7 sm:px-7 sm:pb-7 sm:pt-8 max-[470px]:pt-0 mobile-form-padding">
          <div className="text-center mb-5">
            <h2 
              className="text-xl sm:text-2xl font-bold mb-2 mobile-title" 
              style={{ color: "#3f3f3f" }}
            >
              Book <span style={{ color: "#e10b0b" }}>Hair Consultation</span>
              <span className="block mt-1 md:inline md:mt-0 md:ml-1">With Trichologist</span>
            </h2>
          </div>

          {success && (
            <div className="mb-4 p-3 rounded-lg text-sm bg-green-100 text-green-700 border border-green-300">
              Thank you! Redirecting to thank you page...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mobile-grid">
              <InputStyled placeholder="Full Name" value={fullName} onChange={setFullName} />

              <InputStyled
                placeholder="Phone Number"
                value={phone}
                onChange={(v) => setPhone(v.replace(/\D/g, "").slice(0, 10))}
                inputMode="numeric"
              />

              <InputStyled
                placeholder="Email Address"
                value={email}
                onChange={setEmail}
                type="email"
              />

              <SelectStyled value={concern} onChange={setConcern} options={CONCERNS} />

              <div className="sm:col-span-2">
                <InputStyled
                  placeholder="Hair Problem Description"
                  value={problem}
                  onChange={setProblem}
                />
              </div>

              <div className="sm:col-span-2">
                <InputStyled
                  placeholder="6-Digit Pincode"
                  value={pincode}
                  onChange={(v) => setPincode(v.replace(/\D/g, "").slice(0, 6))}
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="w-full cursor-pointer transition disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] font-bold shadow-lg mobile-button"
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
              <div className="relative mx-auto h-[70px] sm:h-[80px] w-full max-w-[550px] mobile-bottom-image">
                <Image
                  src={bottomImageSrc}
                  alt={bottomImageAlt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        
        /* Popup Overlay Styles */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Close Button */
        .popup-close {
          position: absolute;
          top: -15px;
          right: -15px;
          width: 35px;
          height: 35px;
          background: white;
          border: 3px solid #e10b0b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 20px;
          font-weight: bold;
          color: #e10b0b;
          transition: all 0.2s ease;
          z-index: 10;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .popup-close:hover {
          background: #e10b0b;
          color: white;
          transform: scale(1.1);
        }

        /* Mobile-specific styles */
        @media (max-width: 768px) {
          #form1 {
            padding-top: 10px !important;
            padding-bottom: 10px !important;
          }
          
          #form1 .mobile-image-container {
            height: 500px !important;
            min-height: 500px !important;
            max-height: 600px !important;
            position: relative !important;
            overflow: hidden !important;
          }
          
          #form1 .mobile-image-container img {
            object-position: center center !important;
            object-fit: contain !important;
            background-color: #f5f5f5 !important;
          }
          
          #form1 .mobile-bottom-image {
            height: 60px !important;
            margin-top: 8px !important;
          }
          
          #form1 .mobile-form-padding {
            padding: 0px 16px 24px 16px !important;
          }
          
          #form1 .mobile-title {
            font-size: 1.35rem !important;
            line-height: 1.3 !important;
            margin-bottom: 20px !important;
          }
          
          #form1 .mobile-grid {
            gap: 12px !important;
          }
          
          #form1 .mobile-button {
            padding: 16px 18px !important;
            font-size: 16px !important;
            border-radius: 14px !important;
          }

          #form1 .mobile-card-container {
            max-height: none !important;
            height: auto !important;
            border-width: 8px !important;
          }

          .popup-close {
            top: -10px;
            right: -10px;
            width: 30px;
            height: 30px;
            font-size: 18px;
          }
        }

        /* Small mobile devices */
        @media (max-width: 480px) {
          #form1 .mobile-image-container {
            height: 450px !important;
            min-height: 450px !important;
          }
        }

        /* Main container styles - FIXED CENTERING */
        .main-container {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          margin: 0 auto !important;
          padding: 20px !important;
        }

        /* Card width constraints */
        .main-container #form1 {
          max-width: 1000px !important;
          width: 100% !important;
          margin: 0 auto !important;
        }

        /* Large screen styles - increased width */
        @media (min-width: 1400px) {
          .main-container #form1 {
            max-width: 1200px !important;
          }
        }

        @media (min-width: 1600px) {
          .main-container #form1 {
            max-width: 1300px !important;
          }
        }

        @media (min-width: 1800px) {
          .main-container #form1 {
            max-width: 1400px !important;
          }
        }

        /* Remove any leftover padding/margin that could cause imbalance */
        body {
          overflow-x: hidden !important;
        }
      `}</style>

      {/* Always visible main component - PERFECTLY CENTERED */}
      <div className="main-container">
        {MainComponent}
      </div>

      {/* Popup overlay - only shows when showPopup is true */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleOverlayClick}>
          <div className="relative" style={{ maxWidth: "1000px", width: "100%" }}>
            {/* Close Button */}
            <div className="popup-close" onClick={handleClosePopup}>
              ×
            </div>
            {MainComponent}
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- UI Helpers ---------- */

function InputStyled({ value, onChange, placeholder, type = "text", inputMode }: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      inputMode={inputMode}
      className="w-full outline-none focus:border-[#e10b0b] focus:ring-2 focus:ring-red-100 transition-colors"
      style={{
        borderRadius: "10px",
        border: "2px solid #d1d5db",
        padding: "12px 16px",
        fontSize: "15px",
        color: "#3f3f3f",
        backgroundColor: "#ffffff",
        WebkitAppearance: "none",
      }}
    />
  );
}

function SelectStyled({ value, onChange, options }: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none outline-none bg-white focus:border-[#e10b0b] focus:ring-2 focus:ring-red-100 transition-colors"
        style={{
          borderRadius: "10px",
          border: "2px solid #d1d5db",
          padding: "12px 40px 12px 16px",
          fontSize: "15px",
          color: value === options[0] ? "#9ca3af" : "#3f3f3f",
          WebkitAppearance: "none",
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