"use client";
import React, { useState } from 'react';
import { Clock, Award, TrendingUp, ArrowRight, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const CoursesComponenttwo = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const courses = [
    {
      title: "Certificate Course In Facial Injectables",
      duration: "Duration 3 Days",
      highlights: "Certificate Course in Facial Injectables: Advanced training in Neuromodulator, threads, and facial rejuvenation for precise contouring and anatomy enhancement.",
      outcome: "MBBS, DDVL, MD, MS, MCH, MDS (Maxillofacial Surgeons)",
      color: "#16163f",
      featured: false
    },
    {
      title: "Certificate Course In Chemical Peels",
      duration: "Duration 3 Days",
      highlights: "This course teaches chemical peel techniques for skin rejuvenation, covering peel types, application, safety, and treating various skin conditions.",
      outcome: "MBBS, DDVL, MD, MS, MCH, MDS (Maxillofacial Surgeons), BDS, BHMS, BAMS, BUMS, BSMS, Paramedical",
      color: "#16163f",
      featured: false
    },
    {
      title: "Certificate Course In Laser",
      duration: "Duration 3 Days",
      highlights: "This laser course teaches principles, safety, and aesthetic treatments like hair removal and skin rejuvenation for clinical practice.",
      outcome: "MBBS, DDVL, MD, MS, MCH, MDS (Maxillofacial Surgeons), BDS, BHMS, BAMS, BUMS, BSMS, Paramedical",
      color: "#16163f",
      featured: false
    },
    {
      title: "Certificate Course in Vampire Facial",
      duration: "Duration 3 Days",
      highlights: "Master Vampire Facial for aesthetic and hair restoration. Gain scientific, procedural, and safety expertise for confident clinical integration.",
      outcome: "MBBS, DDVL, MD, MS, MCH, MDS (Maxillofacial Surgeons)",
      color: "#16163f",
      featured: false
    },
    {
      title: "Certificate Course In Semi-Permanent Makeup",
      duration: "Duration 3 Days",
      highlights: "This course teaches professional semi-permanent makeup techniques like microblading, with hands-on training in safety and application.",
      outcome: "MBBS, DDVL, MD, MS, MCH, MDS (Maxillofacial Surgeons), BDS, BHMS, BAMS, BUMS, BSMS, BYNS, BEMS, Paramedical",
      color: "#16163f",
      featured: false
    }
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  // Responsive animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
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

  const backgroundVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 0.03,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    rest: { 
      scale: 1, 
      rotate: 0 
    },
    hover: { 
      scale: 1.1, 
      rotate: 360,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    rest: { 
      scale: 1,
    },
    hover: { 
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <motion.div 
        className="w-full py-6 px-3 sm:py-8 sm:px-4 md:py-6 md:px-6 lg:py-6 lg:px-8 relative overflow-hidden" 
        style={{ backgroundColor: '#fafbfc', fontFamily: "'Outfit', sans-serif" }}
        ref={sectionRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Responsive Animated Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute rounded-full blur-3xl"
            style={{ 
              top: '5%',
              right: '5%',
              width: 'clamp(200px, 35vw, 400px)',
              height: 'clamp(200px, 35vw, 400px)',
              backgroundColor: '#ff0279',
            }}
            variants={backgroundVariants}
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
          ></motion.div>
          <motion.div 
            className="absolute rounded-full blur-3xl"
            style={{ 
              bottom: '10%',
              left: '5%',
              width: 'clamp(250px, 45vw, 500px)',
              height: 'clamp(250px, 45vw, 500px)',
              backgroundColor: '#16163f',
            }}
            variants={backgroundVariants}
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 1, delay: 0.2 }}
          ></motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Responsive Header */}
          <motion.div 
            className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2"
            variants={headerVariants}
          >
            <motion.h1 
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-[#16163f] px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-2xl bg-gradient-to-r from-transparent via-[#ff0279]/10 to-transparent inline-block">
                Certification Courses
              </span>
            </motion.h1>
          </motion.div>

          {/* First Row - 3 Cards */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-0 mb-6 sm:mb-8"
            variants={containerVariants}
          >
            {courses.slice(0, 3).map((course, index) => (
              <motion.div
                key={index}
                className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-xs sm:shadow-sm md:shadow-md overflow-hidden transition-all duration-300 cursor-pointer flex flex-col h-full w-full sm:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md"
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ 
                  scale: 0.98,
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onTouchStart={() => setHoveredCard(index)}
                onTouchEnd={() => setHoveredCard(null)}
                style={{
                  boxShadow: hoveredCard === index 
                    ? '0 8px 25px -8px rgba(255, 2, 121, 0.3)' 
                    : '0 1px 3px -1px rgba(0, 0, 0, 0.1)',
                  border: hoveredCard === index ? '1.5px solid #ff0279' : '1px solid rgba(0, 0, 0, 0.05)',
                  // Removed fixed height for mobile, only set for larger screens
                  height: 'auto',
                  minHeight: 'auto'
                }}
              >

                {/* Responsive Corner Accent */}
                <motion.div 
                  className="absolute top-0 right-0 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 transition-all duration-300 pointer-events-none"
                  style={{
                    backgroundColor: hoveredCard === index ? '#ff0279' : course.color,
                    opacity: hoveredCard === index ? 0.15 : 0.08,
                    clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                  }}
                  whileHover={{ 
                    opacity: 0.2,
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                ></motion.div>

                {/* Card Header - Responsive */}
                <motion.div 
                  className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 text-white relative overflow-hidden transition-all duration-300 flex flex-col justify-center items-center text-center"
                  style={{ 
                    backgroundColor: hoveredCard === index ? '#ff0279' : course.color,
                    // Responsive header height
                    minHeight: 'clamp(120px, 25vh, 140px)'
                  }}
                  whileHover={{ 
                    scale: 1.01,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Animated Pattern Overlay */}
                  <motion.div 
                    className="absolute inset-0 transition-opacity duration-300" 
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,.08) 8px, rgba(255,255,255,.08) 16px)',
                    }}
                    animate={{ 
                      opacity: hoveredCard === index ? 1 : 0.5 
                    }}
                    transition={{ duration: 0.2 }}
                  ></motion.div>
                  
                  {/* Floating Orbs */}
                  <motion.div 
                    className="absolute w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      top: '-10px',
                      right: '-10px',
                    }}
                    animate={{ 
                      scale: hoveredCard === index ? 1.3 : 1 
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  ></motion.div>
                  
                  <div className="relative z-10 w-full text-center space-y-2 xs:space-y-3">
                    <motion.h3 
                      className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold leading-tight px-1"
                      animate={{ 
                        x: hoveredCard === index ? 3 : 0 
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {course.title}
                    </motion.h3>
                    
                    <div className="flex justify-center">
                      <motion.div 
                        className="flex items-center px-2 xs:px-3 py-1 xs:py-1.5 sm:px-3 sm:py-2 rounded-full max-w-max bg-white/25 backdrop-blur-sm border border-white/20"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Clock className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 mr-1 xs:mr-1.5 sm:mr-2 flex-shrink-0" />
                        <span className="font-semibold text-xs xs:text-xs sm:text-sm whitespace-nowrap">
                          {course.duration}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Card Body - Responsive */}
                <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col flex-grow space-y-3 xs:space-y-4 sm:space-y-5">
                  {/* Content Wrapper */}
                  <div className="flex-grow space-y-3 xs:space-y-4 sm:space-y-5">
                    {/* Highlights Section */}
                    <div className="space-y-2 xs:space-y-3">
                      <div className="flex items-start">
                        <motion.div 
                          className="rounded-full p-1 xs:p-1.5 sm:p-2 mr-2 xs:mr-2.5 sm:mr-3 flex-shrink-0 mt-0.5" 
                          style={{ 
                            backgroundColor: hoveredCard === index ? '#ff027915' : `${course.color}15`,
                          }}
                          variants={iconVariants}
                          whileHover="hover"
                          initial="rest"
                          animate="rest"
                        >
                          <Award className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5" 
                            style={{ color: hoveredCard === index ? '#ff0279' : course.color }} 
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs xs:text-xs uppercase tracking-wider mb-1" style={{ color: '#16163f' }}>
                            Highlights
                          </h4>
                          <p className="text-gray-700 text-xs xs:text-sm sm:text-sm leading-relaxed">
                            {course.highlights}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Animated Divider */}
                    <motion.div 
                      className="relative w-full h-0.5 overflow-hidden"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredCard === index ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ 
                        backgroundColor: '#ff0279',
                        transformOrigin: 'left'
                      }}
                    ></motion.div>

                    {/* Eligibility Criteria Section */}
                    <div className="space-y-2 xs:space-y-3">
                      <div className="flex items-start">
                        <motion.div 
                          className="rounded-full p-1 xs:p-1.5 sm:p-2 mr-2 xs:mr-2.5 sm:mr-3 flex-shrink-0 mt-0.5" 
                          style={{ 
                            backgroundColor: hoveredCard === index ? '#ff027915' : `${course.color}15`,
                          }}
                          variants={iconVariants}
                          whileHover="hover"
                          initial="rest"
                          animate="rest"
                        >
                          <TrendingUp className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5" 
                            style={{ color: hoveredCard === index ? '#ff0279' : course.color }} 
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs xs:text-xs uppercase tracking-wider mb-1" style={{ color: '#16163f' }}>
                            Eligibility Criteria
                          </h4>
                          <p className="text-gray-700 text-xs xs:text-sm sm:text-sm leading-relaxed">
                            {course.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button - Responsive */}
                  <div className="mt-auto pt-2 xs:pt-3 sm:pt-4">
                    <a href="#form" className="block w-full">
                      <motion.button
                        className="w-full cursor-pointer py-2.5 xs:py-3 sm:py-3.5 md:py-4 px-3 xs:px-4 sm:px-5 rounded-lg font-bold text-white flex items-center justify-center relative overflow-hidden group border-0 focus:outline-none focus:ring-2 focus:ring-[#ff0279] focus:ring-opacity-50"
                        style={{ 
                          backgroundColor: hoveredCard === index ? '#ff0279' : '#16163f',
                        }}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap={{ 
                          scale: 0.95,
                        }}
                        onMouseEnter={() => setHoveredButton(index)}
                        onMouseLeave={() => setHoveredButton(null)}
                        onTouchStart={() => setHoveredButton(index)}
                        onTouchEnd={() => setHoveredButton(null)}
                      >
                        {/* Animated Background Shine */}
                        <motion.div 
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                          }}
                          animate={{ 
                            x: hoveredButton === index ? '100%' : '-100%' 
                          }}
                          transition={{ duration: 0.6 }}
                        ></motion.div>
                        
                        <span className="relative z-10 mr-1.5 xs:mr-2 text-xs xs:text-sm sm:text-base font-medium">
                          Know More
                        </span>
                        <motion.div
                          animate={{ 
                            x: hoveredButton === index ? 4 : 0 
                          }}
                          transition={{ duration: 0.15 }}
                        >
                          <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 relative z-10" />
                        </motion.div>
                      </motion.button>
                    </a>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <motion.div 
                  className="h-0.5 xs:h-1 w-full"
                  style={{ 
                    backgroundColor: '#ff0279',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                ></motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Second Row - 2 Cards Centered */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-0"
            variants={containerVariants}
          >
            {courses.slice(3, 5).map((course, index) => (
              <motion.div
                key={index + 3}
                className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-xs sm:shadow-sm md:shadow-md overflow-hidden transition-all duration-300 cursor-pointer flex flex-col h-full w-full sm:w-[calc(50%-1rem)] lg:w-[calc(50%-1.5rem)] max-w-md"
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ 
                  scale: 0.98,
                }}
                onMouseEnter={() => setHoveredCard(index + 3)}
                onMouseLeave={() => setHoveredCard(null)}
                onTouchStart={() => setHoveredCard(index + 3)}
                onTouchEnd={() => setHoveredCard(null)}
                style={{
                  boxShadow: hoveredCard === index + 3 
                    ? '0 8px 25px -8px rgba(255, 2, 121, 0.3)' 
                    : '0 1px 3px -1px rgba(0, 0, 0, 0.1)',
                  border: hoveredCard === index + 3 ? '1.5px solid #ff0279' : '1px solid rgba(0, 0, 0, 0.05)',
                  // Removed fixed height for mobile, only set for larger screens
                  height: 'auto',
                  minHeight: 'auto'
                }}
              >

                {/* Responsive Corner Accent */}
                <motion.div 
                  className="absolute top-0 right-0 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 transition-all duration-300 pointer-events-none"
                  style={{
                    backgroundColor: hoveredCard === index + 3 ? '#ff0279' : course.color,
                    opacity: hoveredCard === index + 3 ? 0.15 : 0.08,
                    clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                  }}
                  whileHover={{ 
                    opacity: 0.2,
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                ></motion.div>

                {/* Card Header - Responsive */}
                <motion.div 
                  className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 text-white relative overflow-hidden transition-all duration-300 flex flex-col justify-center items-center text-center"
                  style={{ 
                    backgroundColor: hoveredCard === index + 3 ? '#ff0279' : course.color,
                    // Responsive header height
                    minHeight: 'clamp(120px, 25vh, 140px)'
                  }}
                  whileHover={{ 
                    scale: 1.01,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Animated Pattern Overlay */}
                  <motion.div 
                    className="absolute inset-0 transition-opacity duration-300" 
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,.08) 8px, rgba(255,255,255,.08) 16px)',
                    }}
                    animate={{ 
                      opacity: hoveredCard === index + 3 ? 1 : 0.5 
                    }}
                    transition={{ duration: 0.2 }}
                  ></motion.div>
                  
                  {/* Floating Orbs */}
                  <motion.div 
                    className="absolute w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      top: '-10px',
                      right: '-10px',
                    }}
                    animate={{ 
                      scale: hoveredCard === index + 3 ? 1.3 : 1 
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  ></motion.div>
                  
                  <div className="relative z-10 w-full text-center space-y-2 xs:space-y-3">
                    <motion.h3 
                      className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold leading-tight px-1"
                      animate={{ 
                        x: hoveredCard === index + 3 ? 3 : 0 
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {course.title}
                    </motion.h3>
                    
                    <div className="flex justify-center">
                      <motion.div 
                        className="flex items-center px-2 xs:px-3 py-1 xs:py-1.5 sm:px-3 sm:py-2 rounded-full max-w-max bg-white/25 backdrop-blur-sm border border-white/20"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Clock className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 mr-1 xs:mr-1.5 sm:mr-2 flex-shrink-0" />
                        <span className="font-semibold text-xs xs:text-xs sm:text-sm whitespace-nowrap">
                          {course.duration}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Card Body - Responsive */}
                <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col flex-grow space-y-3 xs:space-y-4 sm:space-y-5">
                  {/* Content Wrapper */}
                  <div className="flex-grow space-y-3 xs:space-y-4 sm:space-y-5">
                    {/* Highlights Section */}
                    <div className="space-y-2 xs:space-y-3">
                      <div className="flex items-start">
                        <motion.div 
                          className="rounded-full p-1 xs:p-1.5 sm:p-2 mr-2 xs:mr-2.5 sm:mr-3 flex-shrink-0 mt-0.5" 
                          style={{ 
                            backgroundColor: hoveredCard === index + 3 ? '#ff027915' : `${course.color}15`,
                          }}
                          variants={iconVariants}
                          whileHover="hover"
                          initial="rest"
                          animate="rest"
                        >
                          <Award className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5" 
                            style={{ color: hoveredCard === index + 3 ? '#ff0279' : course.color }} 
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs xs:text-xs uppercase tracking-wider mb-1" style={{ color: '#16163f' }}>
                            Highlights
                          </h4>
                          <p className="text-gray-700 text-xs xs:text-sm sm:text-sm leading-relaxed">
                            {course.highlights}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Animated Divider */}
                    <motion.div 
                      className="relative w-full h-0.5 overflow-hidden"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredCard === index + 3 ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ 
                        backgroundColor: '#ff0279',
                        transformOrigin: 'left'
                      }}
                    ></motion.div>

                    {/* Eligibility Criteria Section */}
                    <div className="space-y-2 xs:space-y-3">
                      <div className="flex items-start">
                        <motion.div 
                          className="rounded-full p-1 xs:p-1.5 sm:p-2 mr-2 xs:mr-2.5 sm:mr-3 flex-shrink-0 mt-0.5" 
                          style={{ 
                            backgroundColor: hoveredCard === index + 3 ? '#ff027915' : `${course.color}15`,
                          }}
                          variants={iconVariants}
                          whileHover="hover"
                          initial="rest"
                          animate="rest"
                        >
                          <TrendingUp className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5" 
                            style={{ color: hoveredCard === index + 3 ? '#ff0279' : course.color }} 
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs xs:text-xs uppercase tracking-wider mb-1" style={{ color: '#16163f' }}>
                            Eligibility Criteria
                          </h4>
                          <p className="text-gray-700 text-xs xs:text-sm sm:text-sm leading-relaxed">
                            {course.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button - Responsive */}
                  <div className="mt-auto pt-2 xs:pt-3 sm:pt-4">
                    <a href="#form" className="block w-full">
                      <motion.button
                        className="w-full cursor-pointer py-2.5 xs:py-3 sm:py-3.5 md:py-4 px-3 xs:px-4 sm:px-5 rounded-lg font-bold text-white flex items-center justify-center relative overflow-hidden group border-0 focus:outline-none focus:ring-2 focus:ring-[#ff0279] focus:ring-opacity-50"
                        style={{ 
                          backgroundColor: hoveredCard === index + 3 ? '#ff0279' : '#16163f',
                        }}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap={{ 
                          scale: 0.95,
                        }}
                        onMouseEnter={() => setHoveredButton(index + 3)}
                        onMouseLeave={() => setHoveredButton(null)}
                        onTouchStart={() => setHoveredButton(index + 3)}
                        onTouchEnd={() => setHoveredButton(null)}
                      >
                        {/* Animated Background Shine */}
                        <motion.div 
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                          }}
                          animate={{ 
                            x: hoveredButton === index + 3 ? '100%' : '-100%' 
                          }}
                          transition={{ duration: 0.6 }}
                        ></motion.div>
                        
                        <span className="relative z-10 mr-1.5 xs:mr-2 text-xs xs:text-sm sm:text-base font-medium">
                          Know More
                        </span>
                        <motion.div
                          animate={{ 
                            x: hoveredButton === index + 3 ? 4 : 0 
                          }}
                          transition={{ duration: 0.15 }}
                        >
                          <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 relative z-10" />
                        </motion.div>
                      </motion.button>
                    </a>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <motion.div 
                  className="h-0.5 xs:h-1 w-full"
                  style={{ 
                    backgroundColor: '#ff0279',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === index + 3 ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                ></motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default CoursesComponenttwo;