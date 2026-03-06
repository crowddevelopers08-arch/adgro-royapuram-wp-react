"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import ConsultationFormPopup from "./popupform"

export function Navbar() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleCallClick = (e: React.MouseEvent) => {
    // Track conversion when phone number is clicked
    if (typeof gtag_report_conversion !== 'undefined') {
      e.preventDefault()
      gtag_report_conversion('tel:+917436856789')
    }
  }

  const handleMobileCallClick = (e: React.MouseEvent) => {
    // Track conversion when phone number is clicked on mobile
    if (typeof gtag_report_conversion !== 'undefined') {
      e.preventDefault()
      gtag_report_conversion('tel:+917436856789')
    }
  }

  const handleBookNowClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFormOpen(true)
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur" style={{fontFamily: "'Outfit', sans-serif"}}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-52 h-12 max-[470px]:w-40 xs:w-48 xs:h-14 sm:w-52 sm:h-16 md:w-56 md:h-16 lg:w-64 lg:h-20">
              <Image
                src="/adgrologo.png"
                alt="SRM Aesthetic Institute Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              ["Why Us", "#why"],
              ["Success", "#success"],
              ["Testimonials", "#Testimonials"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <Link 
                key={label} 
                href={href} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              asChild 
              variant="outline" 
              className="border-[#d90f12] text-[#d90f12] hover:bg-[#d90f12] hover:text-white text-base px-6 py-2"
              onClick={handleCallClick}
            >
              <Link href="tel:+917436856789">+91 7436856789</Link>
            </Button>
            <Button 
              className="bg-[#d90f12] text-white hover:bg-[#b80d0f] text-base px-6 py-2"
              onClick={handleBookNowClick}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile - Only Call to Action Button */}
          <div className="md:hidden">
            <Button 
              asChild 
              className="bg-[#d90f12] text-white hover:bg-[#b80d0f] text-sm px-5 py-3 h-auto min-h-[44px]"
              onClick={handleMobileCallClick}
            >
              <Link href="tel:+917436856789" className="flex items-center justify-center">
                +91 7436856789
              </Link>
            </Button>
          </div>
        </div>

        {/* Consultation Form Popup */}
        <ConsultationFormPopup 
          isOpen={isFormOpen}
          onOpenChange={setIsFormOpen}
        />
      </header>
    </>
  )
}