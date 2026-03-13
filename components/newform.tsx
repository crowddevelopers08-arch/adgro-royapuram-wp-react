"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
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

const HAIR_LOSS_STAGES = [
  { id: "stage1", label: "Stage 1 - Minimal hair loss", image: "https://ik.imagekit.io/5xfdb3p6jv/public/public/st1.jpeg" },
  { id: "stage2", label: "Stage 2 - Mild receding", image: "https://ik.imagekit.io/5xfdb3p6jv/public/public/st2.jpeg" },
  { id: "stage3", label: "Stage 3 - Moderate thinning", image: "https://ik.imagekit.io/5xfdb3p6jv/public/public/st3.jpeg" },
  { id: "stage4", label: "Stage 4 - Significant loss", image: "https://ik.imagekit.io/5xfdb3p6jv/public/public/st4.jpeg" },
  { id: "stage5", label: "Stage 5 - Advanced balding", image: "https://ik.imagekit.io/5xfdb3p6jv/public/public/st5.jpeg" },
];

// Move InputStyled outside of the main component
const InputStyled = React.memo(({ 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  inputMode 
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      inputMode={inputMode}
      className="w-full outline-none focus:border-[#e10b0b] focus:ring-1 focus:ring-red-100 transition-colors"
      style={{
        borderRadius: "8px",
        border: "1.5px solid #d1d5db",
        padding: "10px 14px",
        fontSize: "14px",
        color: "#3f3f3f",
        backgroundColor: "#ffffff",
        WebkitAppearance: "none",
      }}
    />
  );
});

InputStyled.displayName = 'InputStyled';

// Move SelectStyled outside of the main component
const SelectStyled = React.memo(({ 
  value, 
  onChange, 
  options 
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={handleChange}
        className="w-full appearance-none outline-none bg-white focus:border-[#e10b0b] focus:ring-1 focus:ring-red-100 transition-colors"
        style={{
          borderRadius: "8px",
          border: "1.5px solid #d1d5db",
          padding: "10px 32px 10px 14px",
          fontSize: "14px",
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

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: "#e10b0b" }}>
        ▼
      </div>
    </div>
  );
});

SelectStyled.displayName = 'SelectStyled';

// Move MainComponent outside and make it a proper component
const MainComponent = React.memo(({ 
  isPopup,
  formData,
  onFormDataChange,
  onSubmit,
  loading,
  success
}: { 
  isPopup?: boolean;
  formData: {
    fullName: string;
    phone: string;
    concern: string;
    pincode: string;
    hairLossStage: string;
  };
  onFormDataChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  success: boolean;
}) => {
  const bottomImageSrc = "https://ik.imagekit.io/5xfdb3p6jv/public/public/formimage.png";
  const bottomImageAlt = "Certified Trichologists | 10,000+ Happy Patients | Free Consultation";
  const leftImageSrc = "https://ik.imagekit.io/5xfdb3p6jv/public/public/ilayanilacp.png";
  const leftImageAlt = "Hair Consultation Expert";

  const handleFullNameChange = useCallback((value: string) => {
    onFormDataChange('fullName', value);
  }, [onFormDataChange]);

  const handlePhoneChange = useCallback((value: string) => {
    onFormDataChange('phone', value.replace(/\D/g, "").slice(0, 10));
  }, [onFormDataChange]);

  const handleConcernChange = useCallback((value: string) => {
    onFormDataChange('concern', value);
  }, [onFormDataChange]);

  const handlePincodeChange = useCallback((value: string) => {
    onFormDataChange('pincode', value.replace(/\D/g, "").slice(0, 6));
  }, [onFormDataChange]);

  const handleHairLossStageChange = useCallback((stageId: string) => {
    onFormDataChange('hairLossStage', stageId);
  }, [onFormDataChange]);

  return (
    <section
      id="form1"
      className="w-full"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div
        className="w-full bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden mobile-card-container"
        style={{ border: "8px solid #e10b0b" }}
      >
        {/* Left Image Section */}
        <div 
          className={`relative bg-gray-100 mobile-image-container ${
            isPopup 
              ? 'md:w-[35%] hidden md:block' 
              : 'md:w-1/3'
          }`}
          style={{ 
            minHeight: "250px",
            height: isPopup ? "500px" : "auto",
          }}
        >
          <Image
            src={leftImageSrc}
            alt={leftImageAlt}
            fill
            className="object-cover md:object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Form Section */}
        <div className={`${
            isPopup 
              ? 'md:w-[65%] w-full' 
              : 'md:w-2/3'
          } px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5 max-[470px]:pt-0 mobile-form-padding`}>
          <div className="text-center mb-3">
            <h2 
              className="text-lg sm:text-xl font-bold mb-1 mobile-title" 
              style={{ color: "#3f3f3f" }}
            >
              Book <span style={{ color: "#e10b0b" }}>Hair Consultation</span>
              <span className="block mt-0 md:inline md:mt-0 md:ml-1">With Trichologist</span>
            </h2>
          </div>

          {success && (
            <div className="mb-3 p-2 rounded-lg text-sm bg-green-100 text-green-700 border border-green-300">
              Thank you! Redirecting...
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mobile-grid">
              <InputStyled 
                placeholder="Full Name" 
                value={formData.fullName} 
                onChange={handleFullNameChange} 
              />

              <InputStyled
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handlePhoneChange}
                inputMode="numeric"
              />

              <SelectStyled 
                value={formData.concern} 
                onChange={handleConcernChange} 
                options={CONCERNS} 
              />

              <InputStyled
                placeholder="6-Digit Pincode"
                value={formData.pincode}
                onChange={handlePincodeChange}
                inputMode="numeric"
              />

              {/* Hair Loss Stages Section */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-1" style={{ color: "#3f3f3f" }}>
                  Select Your Hair Loss Stage <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-5 gap-1 sm:gap-2">
                  {HAIR_LOSS_STAGES.map((stage) => (
                    <div
                      key={stage.id}
                      onClick={() => handleHairLossStageChange(stage.id)}
                      className={`cursor-pointer rounded border-2 p-1 transition-all ${
                        formData.hairLossStage === stage.id
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                      }`}
                    >
                      <div className="relative w-full aspect-square mb-0.5">
                        <Image
                          src={stage.image}
                          alt={stage.label}
                          fill
                          className="object-contain p-0.5"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-center font-medium leading-tight" style={{ color: "#3f3f3f" }}>
                        {stage.label.replace('Stage ', 'S')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer transition disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] font-bold shadow-lg mobile-button"
                style={{
                  background: "#e10b0b",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "15px",
                  color: "#ffffff",
                  boxShadow: "0 4px 10px rgba(225, 11, 11, 0.3)",
                }}
              >
                {loading ? "Submitting..." : "Book Your Appointment Now"}
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="relative mx-auto h-[50px] sm:h-[60px] w-full max-w-[450px] mobile-bottom-image">
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
});

MainComponent.displayName = 'MainComponent';

export default function NewHairConsultationCardExact() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    concern: CONCERNS[0],
    pincode: "",
    hairLossStage: ""
  });

  const handleFormDataChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Show popup every 12 seconds
  useEffect(() => {
    // Show popup immediately on mount
    setShowPopup(true);

    // Set up interval to show popup every 12 seconds
    const timer = setInterval(() => {
      setShowPopup(true);
    }, 12000);

    // Cleanup on unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  const canSubmit = useMemo(() => {
    const phoneOk = /^\d{10}$/.test(formData.phone);
    const pinOk = /^\d{6}$/.test(formData.pincode);

    return (
      formData.fullName.trim().length > 1 &&
      phoneOk &&
      formData.concern !== CONCERNS[0] &&
      pinOk &&
      formData.hairLossStage !== ""
    );
  }, [formData]);

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
          name: formData.fullName,
          mobile: formData.phone,
          concern: formData.concern,
          treatment: formData.concern,
          message: `Pincode: ${formData.pincode} | Hair Loss Stage: ${formData.hairLossStage}`,
          source: "Website Leads",
          formName: "hair-consult-form",
          hairLossStage: formData.hairLossStage,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.error || "Submission failed. Please try again.");
        return;
      }

      setSuccess(true);

      // Clear form
      setFormData({
        fullName: "",
        phone: "",
        concern: CONCERNS[0],
        pincode: "",
        hairLossStage: ""
      });

      // Close popup after successful submission and redirect
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

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClosePopup();
    }
  }, [handleClosePopup]);

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
          padding: 12px;
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
          top: -12px;
          right: -12px;
          width: 30px;
          height: 30px;
          background: white;
          border: 2px solid #e10b0b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          color: #e10b0b;
          transition: all 0.2s ease;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .popup-close:hover {
          background: #e10b0b;
          color: white;
          transform: scale(1.1);
        }

        /* Mobile-specific styles */
        @media (max-width: 768px) {
          #form1 {
            padding-top: 5px !important;
            padding-bottom: 5px !important;
          }
          
          #form1 .mobile-image-container {
            height: 350px !important;
            min-height: 350px !important;
            max-height: 400px !important;
          }
          
          #form1 .mobile-image-container img {
            object-position: center center !important;
            object-fit: contain !important;
            background-color: #f5f5f5 !important;
          }
          
          #form1 .mobile-bottom-image {
            height: 45px !important;
            margin-top: 4px !important;
          }
          
          #form1 .mobile-form-padding {
            padding: 0px 12px 16px 12px !important;
          }
          
          #form1 .mobile-title {
            font-size: 1.2rem !important;
            line-height: 1.2 !important;
            margin-bottom: 12px !important;
          }
          
          #form1 .mobile-grid {
            gap: 8px !important;
          }
          
          #form1 .mobile-button {
            padding: 12px 14px !important;
            font-size: 14px !important;
            border-radius: 10px !important;
          }

          #form1 .mobile-card-container {
            border-width: 6px !important;
          }

          .popup-close {
            top: -8px;
            right: -8px;
            width: 28px;
            height: 28px;
            font-size: 16px;
          }

          /* MOBILE POPUP FIX */
          .popup-overlay {
            padding: 0 !important;
            align-items: flex-start !important;
            overflow-y: auto !important;
          }
          
          .popup-overlay > div {
            margin: 0 !important;
            max-width: 100% !important;
          }
          
          .popup-overlay .mobile-card-container {
            border-width: 0 !important;
            border-radius: 0 !important;
          }
          
          .popup-overlay .mobile-form-padding {
            padding: 16px 12px 30px 12px !important;
          }
          
          .popup-overlay .popup-close {
            top: 10px !important;
            right: 10px !important;
            width: 35px !important;
            height: 35px !important;
            font-size: 22px !important;
            background: #e10b0b !important;
            color: white !important;
            border: none !important;
            z-index: 100 !important;
          }
          
          /* Hide image in popup on mobile */
          .popup-overlay .mobile-image-container {
            display: none !important;
          }

          /* Stages on mobile - smaller */
          .popup-overlay .grid-cols-5 {
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 4px !important;
          }
          
          .popup-overlay .text-\\[10px\\] {
            font-size: 8px !important;
          }
        }

        /* Small mobile devices */
        @media (max-width: 480px) {
          #form1 .mobile-image-container {
            height: 300px !important;
            min-height: 300px !important;
          }
          
          .grid-cols-5 {
            gap: 2px !important;
          }
        }

        /* Main container styles */
        .main-container {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          margin: 0 auto !important;
          padding: 15px !important;
        }

        .main-container #form1 {
          max-width: 1100px !important;
          width: 100% !important;
          margin: 0 auto !important;
        }

        @media (min-width: 1400px) {
          .main-container #form1 {
            max-width: 1200px !important;
          }
        }

        body {
          overflow-x: hidden !important;
        }
      `}</style>

      {/* Always visible main component */}
      <div className="main-container">
        <MainComponent 
          isPopup={false}
          formData={formData}
          onFormDataChange={handleFormDataChange}
          onSubmit={handleSubmit}
          loading={loading}
          success={success}
        />
      </div>

      {/* Popup overlay */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleOverlayClick}>
          <div className="relative" style={{ maxWidth: "1100px", width: "100%" }}>
            <div className="popup-close" onClick={handleClosePopup}>
              ×
            </div>
            <MainComponent 
              isPopup={true}
              formData={formData}
              onFormDataChange={handleFormDataChange}
              onSubmit={handleSubmit}
              loading={loading}
              success={success}
            />
          </div>
        </div>
      )}
    </>
  );
}