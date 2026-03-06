"use client";
import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    y: 20 
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const backgroundVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.4, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const CareerOutcomes = () => {
  return (
    <>
        <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <div className="relative overflow-hidden bg-white py-8 max-[470px]:py-6 sm:py-10 lg:py-12"style={{fontFamily: "'Outfit', sans-serif"}}>
      {/* Background Decoration with Animation */}
      <div className="absolute inset-0 opacity-3">
        <motion.div
          className="absolute top-0 left-0 w-48 h-48 bg-[#ff0279] rounded-full mix-blend-multiply filter blur-xl"
          variants={backgroundVariants}
          animate="animate"
        ></motion.div>
        <motion.div
          className="absolute bottom-0 right-0 w-48 h-48 bg-[#ff0279] rounded-full mix-blend-multiply filter blur-xl"
          variants={backgroundVariants}
          animate="animate"
          initial={{ opacity: 0.3 }}
        ></motion.div>
      </div>

      <motion.div 
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8 lg:mb-10"
          variants={itemVariants}
        >
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 relative">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="text-[#16163f] px-4 sm:px-6 py-1 sm:py-2 rounded-2xl bg-gradient-to-r from-transparent via-[#ff0279]/10 to-transparent">
                Career Outcomes
              </span>
            </motion.h1>
          </div>
        </motion.div>

        {/* Career Roles Grid */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8 lg:mb-10"
          variants={containerVariants}
        >
          {/* Cosmetologist */}
          <motion.div
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 w-full sm:max-w-[calc(50%-8px)] lg:max-w-[calc(33.333%-10.666px)] cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center">
              <motion.div 
                className="w-8 h-8 bg-[#ff0279] rounded-md flex items-center justify-center mr-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">Cosmetologist</h3>
            </div>
          </motion.div>

          {/* Aesthetic Practitioner */}
          <motion.div
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 w-full sm:max-w-[calc(50%-8px)] lg:max-w-[calc(33.333%-10.666px)] cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center">
              <motion.div 
                className="w-8 h-8 bg-[#ff0279] rounded-md flex items-center justify-center mr-3"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">Aesthetic Practitioner</h3>
            </div>
          </motion.div>

          {/* Trichologist */}
          <motion.div
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 w-full sm:max-w-[calc(50%-8px)] lg:max-w-[calc(33.333%-10.666px)] cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center">
              <motion.div 
                className="w-8 h-8 bg-[#ff0279] rounded-md flex items-center justify-center mr-3"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.4 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">Trichologist</h3>
            </div>
          </motion.div>

          {/* Skin and Hair Consultant */}
          <motion.div
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 w-full sm:max-w-[calc(50%-8px)] lg:max-w-[calc(33.333%-10.666px)] cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center">
              <motion.div 
                className="w-8 h-8 bg-[#ff0279] rounded-md flex items-center justify-center mr-3"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">Skin and Hair Consultant</h3>
            </div>
          </motion.div>

          {/* Clinical Aesthetic Specialist */}
          <motion.div
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 w-full sm:max-w-[calc(50%-8px)] lg:max-w-[calc(33.333%-10.666px)] cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center">
              <motion.div 
                className="w-8 h-8 bg-[#ff0279] rounded-md flex items-center justify-center mr-3"
                whileHover={{ scale: 1.2, rotate: -180 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">Clinical Aesthetic Specialist</h3>
            </div>
          </motion.div>
        </motion.div>

        {/* Demand Section */}
        <motion.div
          className="bg-gradient-to-r from-[#f8f9fa] to-[#f1f3f4] rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
          variants={itemVariants}
        >
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h3 
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Growing Demand in Medical Aesthetics
            </motion.h3>
            <motion.p 
              className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The demand for skilled professionals in medical aesthetics is growing both in India and globally. Hospitals, clinics, wellness centres, and private practices are actively seeking certified experts who combine technical knowledge with hands on experience. With our training, you are equipped to step confidently into these opportunities and make a meaningful impact in patients' lives.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
};

export default CareerOutcomes;