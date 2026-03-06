"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type SubmitStatus = "idle" | "success" | "error";

interface ConsultationFormProps {
  onClose?: () => void;
}

export default function ConsultationForm({ onClose }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    procedure: "",
    familyConsultation: "",
    source: "https://www.aloradentalwellnessbangalore.in/",
    formName: "Dental Consultation Form",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const closeButtonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.9,
    },
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Prepare lead data for TeleCRM + Prisma API
      const leadData = {
        name: formData.name,
        phone: formData.phone,
        procedure: formData.procedure,
        familyConsultation: formData.familyConsultation,
        source: formData.source,
        formName: formData.formName,
        consent: true,
        treatment: formData.procedure,
        concerns: formData.procedure,
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");

        // Reset form
        setFormData({
          name: "",
          phone: "",
          procedure: "",
          familyConsultation: "",
          source: "https://www.aloradentalwellnessbangalore.in/",
          formName: "Dental Consultation Form",
        });

        // Redirect to thank you page after a brief delay
        setTimeout(() => {
          router.push("/thank-you");
        }, 1500);
      } else {
        setSubmitStatus("error");
        console.error("Submission failed:", result);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[600px] mx-auto bg-[#e8f0ec] rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Close Button */}
      <motion.button
        type="button"
        onClick={handleClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-200 transition-colors duration-200 z-10"
        variants={closeButtonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label="Close form"
      >
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </motion.button>

      {/* Title */}
      <motion.h2
        className="text-2xl sm:text-[28px] font-bold text-[#0b274a] mb-4 sm:mb-6 text-center pr-8 sm:pr-10"
        variants={itemVariants}
      >
        Book Your Consultation Today
      </motion.h2>

      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-center"
        >
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Thank you! Your consultation has been booked successfully.
          </div>
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center"
        >
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Sorry, there was an error submitting your form. Please try again.
          </div>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Row 1 */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          variants={containerVariants}
        >
          <motion.div className="flex flex-col" variants={itemVariants}>
            <label
              htmlFor="name"
              className="text-sm sm:text-[15px] font-semibold text-[#0b274a] mb-1 sm:mb-2"
            >
              Patient Name <span className="text-red-500">*</span>
            </label>
            <motion.input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e37761] transition-all duration-300 text-sm sm:text-base"
              whileFocus={{
                scale: 1.02,
                borderColor: "#e37761",
                transition: { duration: 0.2 },
              }}
            />
          </motion.div>

          <motion.div className="flex flex-col" variants={itemVariants}>
            <label
              htmlFor="phone"
              className="text-sm sm:text-[15px] font-semibold text-[#0b274a] mb-1 sm:mb-2"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <motion.input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e37761] transition-all duration-300 text-sm sm:text-base"
              whileFocus={{
                scale: 1.02,
                borderColor: "#e37761",
                transition: { duration: 0.2 },
              }}
            />
          </motion.div>
        </motion.div>

        {/* Row 2 - Choose Service */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label
            htmlFor="procedure"
            className="text-sm sm:text-[15px] font-semibold text-[#0b274a] mb-1 sm:mb-2"
          >
            Choose Service
          </label>
          <motion.select
            id="procedure"
            name="procedure"
            value={formData.procedure}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-[#e37761] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e37761] transition-all duration-300 text-sm sm:text-base"
            whileFocus={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <option value="">Choose services</option>
            <option value="Root Canal & Gum Treatment">Root Canal & Gum Treatment</option>
            <option value="Teeth Filling & Restoration">Teeth Filling & Restoration</option>
            <option value="Scaling & Whitening">Scaling & Whitening</option>
            <option value="Tooth Extraction">Tooth Extraction</option>
            <option value="Dental Implants">Dental Implants</option>
            <option value="Clear Aligners">Clear Aligners</option>
            <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
            <option value="Teeth Braces">Teeth Braces</option>
            <option value="Full Mouth Rehabilitation">Full Mouth Rehabilitation</option>
          </motion.select>
        </motion.div>

        {/* Row 3 - Family Dental Consultation */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label className="text-sm sm:text-[15px] font-semibold text-[#0b274a] mb-1 sm:mb-2">
            Looking for Family Dental Consultation?
          </label>
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="familyConsultation"
                value="yes"
                checked={formData.familyConsultation === "yes"}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${
                  formData.familyConsultation === "yes"
                    ? "border-[#e37761] bg-[#e37761]"
                    : "border-gray-400"
                }`}
              >
                {formData.familyConsultation === "yes" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="text-sm sm:text-base text-gray-800">Yes</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="familyConsultation"
                value="no"
                checked={formData.familyConsultation === "no"}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${
                  formData.familyConsultation === "no"
                    ? "border-[#e37761] bg-[#e37761]"
                    : "border-gray-400"
                }`}
              >
                {formData.familyConsultation === "no" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="text-sm sm:text-base text-gray-800">No</span>
            </label>
          </motion.div>
        </motion.div>

        {/* Hidden fields for TeleCRM / backend */}
        <input
          type="hidden"
          name="source"
          value="https://www.aloradentalwellnessbangalore.in/"
        />
        <input type="hidden" name="formName" value="Dental Consultation Form" />

        {/* Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 px-6 sm:px-8 py-3 bg-[#e37761] text-white font-semibold rounded-full hover:bg-[#d66c58] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          variants={buttonVariants}
          whileHover={!isSubmitting ? "hover" : undefined}
          whileTap={!isSubmitting ? "tap" : undefined}
        >
          {isSubmitting ? "Submitting..." : "Book Your Consultation"}
        </motion.button>
      </form>

      {/* Additional Info */}
      <motion.p
        className="text-xs sm:text-sm text-gray-600 text-center mt-4 sm:mt-6"
        variants={itemVariants}
        transition={{ delay: 0.5 }}
      >
        * Our team will contact you within 24 hours to confirm your appointment
      </motion.p>
    </motion.div>
  );
}
