"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion, useInView } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const primaryColor = "#e10b0b"; // Red color
  const lightColor = "#ffffff"; // White
  const cardBgColor = "#f9f9f9"; // Light gray background for cards
  const textColor = "#333333"; // Dark gray text
  const lightTextColor = "#666666"; // Medium gray text

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: 'What is the best hair regrowth treatment available at your hair treatment clinic in Chennai?',
      answer: 'At our Advanced GroHair Clinic, we offer a range of hair regrowth treatments, including Oxygen Laser Therapy, Mesotherapy, and Cosmetic Hair Transplant. Each treatment is tailored to address specific hair loss issues and provide effective results.',
    },
    {
      question: 'How does the hair transplant procedure work at your hair transplant center in Chennai?',
      answer: 'Our hair transplant center uses advanced techniques to ensure minimal scarring and quick recovery. We employ the latest methods, including minimally invasive techniques, to achieve a 97%+ success rate in our hair transplantation procedures.',
    },
    {
      question: 'What makes Advanced Grohair a leading hair restoration clinic?',
      answer: 'Advanced GroHair is renowned for its exceptional results in hair restoration. Our clinic features board-certified specialists, FDA-approved equipment, and a commitment to 24/7 support. We pride ourselves on our ability to deliver personalized care and effective solutions.',
    },
    {
      question: 'Are there any hair loss treatment clinics near me that offer no-cost EMI options?',
      answer: 'Yes, our Advanced GroHair Clinic provides hair loss treatments with flexible no-cost EMI options. This makes accessing top-quality care both convenient and affordable.',
    },
    {
      question: 'How effective is the Cosmetic Hair System at your hair restoration center?',
      answer: 'The Cosmetic Hair System at our hair restoration center offers a natural appearance and is lightweight and breathable. It\'s a non-invasive solution with no recovery time, making it ideal for those seeking a versatile and effective option.',
    },
    {
      question: 'What can I expect during a consultation at your hair treatment clinic?',
      answer: 'During your consultation at our hair treatment clinic, we will assess your specific needs and discuss various hair regrowth treatments and hair transplant options available. Our experts will guide you through the best solutions tailored to your condition.',
    },
    {
      question: 'How long is the recovery period after a hair transplant at your clinic?',
      answer: 'Recovery time after a hair transplant at our clinic is minimal. Our advanced techniques ensure quick healing, with most patients returning to normal activities within a short period. We provide comprehensive post-treatment care to ensure optimal results.',
    },
    {
      question: 'Can you tell me more about the hair restoration options available at your hair restoration clinic?',
      answer: 'Our hair restoration clinic offers a variety of solutions, including Oxygen Laser Therapy, Mesotherapy, and Cosmetic Hair Transplants. Each option is designed to address different aspects of hair loss and restoration, ensuring comprehensive care for every need.',
    },
  ];

  // Split FAQs into two columns
  const midIndex = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midIndex);
  const rightFaqs = faqs.slice(midIndex);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <section 
        ref={sectionRef} 
        className="py-10 md:py-10 max-[470px]:py-6" 
        style={{
          backgroundColor: lightColor,
          fontFamily: "'Outfit', sans-serif"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div 
              className="text-center"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={titleVariants}
            >
              <div className="relative inline-block mb-6 max-[470px]:mb-0">
                     <div className="text-center mb-8 sm:mb-8 max-[470px]:mb-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#ff0000]">
          Frequently Asked Questions!
        </h2>
        {/* <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
          Witness the transformation with our proven hair treatments
        </p> */}
      </div>
              </div>
            </motion.div>

            <div className="faq-content">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Left Column */}
                <div className="space-y-4 md:space-y-6">
                  <Accordion type="single" collapsible className="space-y-4 md:space-y-6">
                    {leftFaqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`left-item-${index}`}
                        className="rounded-xl transition-all duration-300 px-5 md:px-6"
                        style={{
                          backgroundColor: cardBgColor,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          border: `1px solid rgba(225, 11, 11, 0.1)`
                        }}
                      >
                        <AccordionTrigger 
                          className="text-base md:text-lg font-semibold text-left py-4 md:py-5 hover:no-underline group hover:text-[#e10b0b] transition-colors"
                          style={{ color: textColor }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: primaryColor }}>
                              <span className="text-xs font-bold" style={{ color: lightColor }}>Q</span>
                            </div>
                            <span className="flex-1 text-left">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm md:text-base leading-relaxed pb-4 md:pb-5">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#ffebee' }}>
                              <span className="text-xs font-bold" style={{ color: primaryColor }}>A</span>
                            </div>
                            <p style={{ color: lightTextColor }}>{faq.answer}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Right Column */}
                <div className="space-y-4 md:space-y-6">
                  <Accordion type="single" collapsible className="space-y-4 md:space-y-6">
                    {rightFaqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`right-item-${index}`}
                        className="rounded-xl transition-all duration-300 px-5 md:px-6"
                        style={{
                          backgroundColor: cardBgColor,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          border: `1px solid rgba(225, 11, 11, 0.1)`
                        }}
                      >
                        <AccordionTrigger 
                          className="text-base md:text-lg font-semibold text-left py-4 md:py-5 hover:no-underline group hover:text-[#e10b0b] transition-colors"
                          style={{ color: textColor }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: primaryColor }}>
                              <span className="text-xs font-bold" style={{ color: lightColor }}>Q</span>
                            </div>
                            <span className="flex-1 text-left">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm md:text-base leading-relaxed pb-4 md:pb-5">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#ffebee' }}>
                              <span className="text-xs font-bold" style={{ color: primaryColor }}>A</span>
                            </div>
                            <p style={{ color: lightTextColor }}>{faq.answer}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;