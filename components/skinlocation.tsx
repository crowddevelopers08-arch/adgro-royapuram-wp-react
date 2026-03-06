"use client";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Navigation, Mail, MessageCircle } from "lucide-react";

const SkinLocationSection = () => {
  // Color variables from your palette
  const colors = {
    dark: "#1f1f1f",
    medium: "#343434",
    primary: "#fcb716",
    accent: "#c3a238",
  };

  return (
    <section id="location" className="py-10 md:py-10 max-[470px]:py-6 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: colors.dark }}
          >
            Contact Us
          </h2>
          <p 
            className="text-lg"
            style={{ color: colors.medium }}
          >
            Get in touch with MAX Hair Clinic for expert hair care solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map Container */}
          <div className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full">
            <div className="rounded-2xl overflow-hidden shadow-xl h-full w-full border-2" style={{ borderColor: colors.primary }}>
             <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7236.537905422592!2d78.408753!3d17.430149!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91486b672467%3A0x89c58da0c02ec56d!2sMax%20Hair%20Clinic%20-%20Best%20Hair%20Transplant%20%26%20PRP%20Hyderabad!5e1!3m2!1sen!2sin!4v1766065552789!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MAX Hair Clinic Location - Jubilee Hills, Hyderabad"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Contact Info Cards */}
          <div>
            <div className="flex flex-col space-y-4 md:space-y-6">
              {/* Address Card */}
              <div 
                className="rounded-xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border"
                style={{ 
                  backgroundColor: '#f8f9fa',
                  borderColor: colors.primary
                }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: colors.primary,
                    }}
                  >
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="font-heading text-base md:text-lg lg:text-xl font-semibold mb-1 md:mb-2"
                      style={{ color: colors.dark }}
                    >
                      Visit Us at,
                    </h3>
                    <p 
                      className="text-sm md:text-base leading-relaxed"
                      style={{ color: colors.medium }}
                    >
                      Police Station, 1130/A, Road No. 36,<br />
                      opposite Jubilee Hills,<br />
                      Jubilee Hills, Hyderabad,<br />
                      Telangana 500034
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div 
                className="rounded-xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border"
                style={{ 
                  backgroundColor: '#f8f9fa',
                  borderColor: colors.accent
                }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: colors.accent,
                    }}
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="font-heading text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3"
                      style={{ color: colors.dark }}
                    >
                      Contact Information
                    </h3>
                    <div className="space-y-3 md:space-y-4">
                      {/* Phone */}
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${colors.primary}20` }}
                        >
                          <Phone className="w-3 h-3 md:w-4 md:h-4" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Call Us on,</p>
                          <p 
                            className="text-sm md:text-base font-medium"
                            style={{ color: colors.dark }}
                          >
                            +91 90325 10000
                          </p>
                        </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${colors.accent}20` }}
                        >
                          <MessageCircle className="w-3 h-3 md:w-4 md:h-4" style={{ color: colors.accent }} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">WhatsApp,</p>
                          <p 
                            className="text-sm md:text-base font-medium"
                            style={{ color: colors.dark }}
                          >
                            +91 90325 10000
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${colors.primary}20` }}
                        >
                          <Mail className="w-3 h-3 md:w-4 md:h-4" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email Us on,</p>
                          <p 
                            className="text-sm md:text-base font-medium"
                            style={{ color: colors.dark }}
                          >
                            info@mymaxhair.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {/* Call Now Button */}
                  <Button 
                    className="px-3 md:px-4 py-2 md:py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base h-auto hover:scale-[1.02] active:scale-[0.98]"
                    style={{ 
                      backgroundColor: colors.primary,
                      color: colors.dark
                    }}
                    onClick={() => window.open('tel:+919032510000', '_self')}
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Call Now</span>
                  </Button>

                  {/* Get Directions Button */}
                  <Button 
                    className="px-3 md:px-4 py-2 md:py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base h-auto hover:scale-[1.02] active:scale-[0.98]"
                    style={{ 
                      backgroundColor: colors.dark,
                      color: 'white'
                    }}
                    onClick={() => window.open('https://maps.app.goo.gl/KkisC2WPyiNucRdt8', '_blank')}
                  >
                    <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Get Directions</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkinLocationSection;