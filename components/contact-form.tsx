"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle phone call click with conversion tracking
  const handlePhoneClick = (e: React.MouseEvent) => {
    // Track conversion when phone number is clicked
    if (typeof gtag_report_conversion !== 'undefined') {
      e.preventDefault();
      gtag_report_conversion('tel:+917436856789');
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <section ref={sectionRef} className="py-6 md:py-6 lg:py-6 max-[470px]:py-3 relative" style={{ backgroundColor: '#101828',fontFamily: "'Outfit', sans-serif" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-4xl lg:max-w-6xl mx-auto">
            {/* Left Column - Contact Information */}
            <div className="contact-card bg-white p-4 sm:p-6 rounded-xl shadow-premium">
              {/* Logo */}
              <div className="flex justify-center mb-4 max-[470px]:mb-2">
                <div className="w-32 h-32 max-[470px]:h-21 sm:w-40 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="/adgrologo.png"
                    alt="Advanced Grohair Logo"
                    width={160}
                    height={160}
                    className="w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center hidden">
                    <span className="text-gray-500 text-xs text-center">Your Logo Here</span>
                  </div>
                </div>
              </div>

              {/* Main Description */}
              <div className="mb-4">
                <p className="text-gray-700 text-base leading-relaxed">
                  Our experienced professionals and experts recommend you the best treatment that matches your needs and assist you achieve the desired results that you have always longed for.
                </p>
              </div>

              {/* Contact Section */}
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: '#101828' }}>Contact</h3>
                
                <div className="space-y-3">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#d90f12' }}
                    >
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-base">
                        First Floor, No.187, MS Koil St, above Time emporium,<br />
                         Somu Nagar, Royapuram,<br />
                         Chennai, Tamil Nadu 600013
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#d90f12' }}
                    >
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <a 
                      href="tel:+917436856789" 
                      onClick={handlePhoneClick}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-700 text-base">7436856789</p>
                        <p className="text-xs text-gray-500 mt-1">Click to call us directly</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Links - Centered with more visibility */}
              <div className="pt-4 border-t-2 border-gray-300">
                <div className="flex justify-center gap-8">
                  <a 
                    href="/privacy-policy" 
                    className="text-gray-700 hover:text-[#d90f12] transition-colors text-base font-semibold py-2 px-4 rounded-lg hover:bg-gray-50"
                  >
                    Privacy Policy
                  </a>
                  <a 
                    href="/about-us" 
                    className="text-gray-700 hover:text-[#d90f12] transition-colors text-base font-semibold py-2 px-4 rounded-lg hover:bg-gray-50"
                  >
                    About Us
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Map Section */}
            <div className="contact-card bg-white rounded-xl shadow-premium overflow-hidden">
              <div className="w-full h-full bg-gray-200">
               <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7371.442529121182!2d79.420743!3d13.6224!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b8c6db9625b%3A0x29f680bb049dbf31!2sAdvanced%20GroHair%20%26%20Gloskin%20-%20Tirupati!5e1!3m2!1sen!2sus!4v1761568923871!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '350px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Advanced Grohair Location in Chennai - Satellite View"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;