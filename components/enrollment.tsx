"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EnrollmentDetails = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const backgroundRefs = useRef<(HTMLDivElement | null)[]>([]);

  const enrollmentData = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: "Limited Batch Size",
      description: "We keep our batches small to ensure personal attention and meaningful hands on learning"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      title: "Flexible Schedules",
      description: "Choose what fits your lifestyle – weekday or weekend sessions designed for working professionals"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Course Duration",
      description: "Programs range from short specialized modules to one year postgraduate diplomas, so you can pick the path that suits your goals"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(headingRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Animate background elements
      backgroundRefs.current.forEach((bg, index) => {
        if (bg) {
          gsap.fromTo(bg,
            {
              scale: 0,
              opacity: 0,
              rotation: index % 2 === 0 ? -45 : 45
            },
            {
              scale: 1,
              opacity: 0.05,
              rotation: 0,
              duration: 2,
              ease: "elastic.out(1, 0.8)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.3
            }
          );
        }
      });

      // Animate cards with stagger
      gsap.fromTo(cardsRef.current,
        {
          y: 80,
          opacity: 0,
          rotationX: 15,
          transformPerspective: 1000
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 85%",
            end: "bottom top",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Animate CTA button
      gsap.fromTo(ctaRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            end: "bottom top",
            toggleActions: "play none none reverse",
          },
          delay: 0.5
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card hover animations
  const handleCardHover = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        y: -15,
        rotationY: 5,
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out"
      });

      // Animate the progress line
      const line = card.querySelector('.progress-line') as HTMLElement;
      if (line) {
        gsap.to(line, {
          width: '100%',
          duration: 0.6,
          ease: "power2.out"
        });
      }

      // Icon bounce effect
      const icon = card.querySelector('.icon-container');
      if (icon) {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 360,
          duration: 0.6,
          ease: "back.out(1.7)"
        });
      }
    }
  };

  const handleCardLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.8)"
      });

      // Reset progress line
      const line = card.querySelector('.progress-line') as HTMLElement;
      if (line) {
        gsap.to(line, {
          width: '0%',
          duration: 0.3,
          ease: "power2.in"
        });
      }

      // Reset icon
      const icon = card.querySelector('.icon-container');
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    }
  };

  // CTA button hover effects
  const handleCtaHover = () => {
    if (ctaRef.current) {
      gsap.to(ctaRef.current, {
        scale: 1.1,
        boxShadow: '0 20px 40px rgba(255, 2, 121, 0.4)',
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleCtaLeave = () => {
    if (ctaRef.current) {
      gsap.to(ctaRef.current, {
        scale: 1,
        boxShadow: '0 10px 25px rgba(255, 2, 121, 0.3)',
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="py-10 px-4 sm:px-6 lg:px-8 max-[470px]:py-6 relative overflow-hidden bg-white"style={{fontFamily: "'Outfit', sans-serif"}}
    >
      {/* Animated Background decorative elements */}
      <div 
        ref={el => backgroundRefs.current[0] = el}
        className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-0"
        style={{ backgroundColor: '#ff0279' }}
      ></div>
      <div 
        ref={el => backgroundRefs.current[1] = el}
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-0"
        style={{ backgroundColor: '#16163f' }}
      ></div>
      <div 
        ref={el => backgroundRefs.current[2] = el}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-0"
        style={{ backgroundColor: '#ff0279' }}
      ></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-30 animate-float"
            style={{
              backgroundColor: i % 2 === 0 ? '#ff0279' : '#16163f',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Heading */}
        <div ref={headingRef} className="text-center mb-8 sm:mb-10 lg:mb-12 relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
            <span className="text-[#16163f] px-4 sm:px-6 py-1 sm:py-2 rounded-2xl bg-gradient-to-r from-transparent via-[#ff0279]/10 to-transparent inline-block">
              Enrollment Details
            </span>
          </h1>
        </div>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-[470px]:mb-8 mb-16">
          {enrollmentData.map((item, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group bg-white rounded-2xl p-8 border border-gray-200 shadow-lg cursor-pointer relative overflow-hidden transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
            >
              {/* Background hover effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative z-10">
                {/* Animated Icon */}
                <div 
                  className="icon-container w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md transform-gpu"
                  style={{ backgroundColor: '#ff0279' }}
                >
                  <div className="text-white text-xl">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300 transform-gpu">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed transform-gpu">
                  {item.description}
                </p>

                {/* Animated progress line */}
                <div 
                  className="progress-line w-0 h-0.5 rounded-full mt-4 transition-colors duration-300"
                  style={{ backgroundColor: '#ff0279' }}
                ></div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ff0279] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ff0279] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-2xl" />
            </div>
          ))}
        </div>

        {/* Animated CTA Section */}
        <div className="text-center">
            <a href="#form">
          <button
            ref={ctaRef}
            className="px-12 cursor-pointer py-4 text-lg font-bold text-white rounded-full shadow-lg transition-all duration-300 relative overflow-hidden group transform-gpu"
            style={{ backgroundColor: '#ff0279' }}
            onMouseEnter={handleCtaHover}
            onMouseLeave={handleCtaLeave}
          >
            <span className="relative z-10">Secure Your Seat Now</span>
            
            {/* Shine effect */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div 
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" 
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
              />
            </div>

            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{ 
                   backgroundColor: '#ff0279', 
                   boxShadow: '0 0 0 0 rgba(255, 2, 121, 0.7)',
                   animation: 'ripple 2s infinite'
                 }}
            />
          </button>
          </a>
        </div>
      </div>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes ripple {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 2, 121, 0.7);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(255, 2, 121, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 2, 121, 0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EnrollmentDetails;