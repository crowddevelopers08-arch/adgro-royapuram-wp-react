"use client"

import Image from "next/image"
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function LearningCard({ 
  image, 
  title, 
  desc, 
  index 
}: { 
  image: string; 
  title: string; 
  desc: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.2
        }
      )

      // Image parallax effect on hover
      const image = imageRef.current
      if (image) {
        cardRef.current?.addEventListener('mousemove', (e) => {
          const rect = cardRef.current?.getBoundingClientRect()
          if (rect) {
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            
            const rotateX = (y - centerY) / 25
            const rotateY = (centerX - x) / 25
            
            gsap.to(cardRef.current, {
              rotationX: rotateX,
              rotationY: rotateY,
              transformPerspective: 1000,
              duration: 0.5,
              ease: "power2.out"
            })
            
            gsap.to(image, {
              scale: 1.1,
              duration: 0.5,
              ease: "power2.out"
            })
          }
        })

        cardRef.current?.addEventListener('mouseleave', () => {
          gsap.to(cardRef.current, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)"
          })
          
          gsap.to(image, {
            scale: 1,
            duration: 0.7,
            ease: "power2.out"
          })
        })
      }
    }, cardRef)

    return () => ctx.revert()
  }, [index])

  return (
    <div 
      ref={cardRef}
      className="overflow-hidden rounded-2xl border border-border/60 bg-[#16163f] cursor-pointer transform-gpu"
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      <div ref={imageRef} className="relative aspect-[16/10] overflow-hidden">
        <Image 
          src={image || "/placeholder.svg"} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700"
          data-parallax="y" 
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div ref={contentRef} className="p-6 relative z-10">
        <h3 className="text-lg text-white font-semibold mb-3 transform-gpu">{title}</h3>
        <p className="text-sm leading-relaxed text-[#b0b3c3] transform-gpu">{desc}</p>
        
        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#ff0279] to-[#febd01] transition-all duration-500 group-hover:w-full" />
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  )
}

export function LearningSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(headingRef.current,
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Animate grid container
      gsap.fromTo(gridRef.current,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Background elements animation
      gsap.fromTo(".learning-bg-element",
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 0.05,
          duration: 1.5,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none reverse",
          },
          stagger: 0.3
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const learningData = [
    {
      image: "/clasnew.jpeg",
      title: "Classroom Learning",
      desc: "Engage with interactive lectures and case discussions that make complex concepts easy to understand."
    },
    {
      image: "/practical.jpg",
      title: "Practical Training",
      desc: "Gain confidence through hands on sessions, lab practice, and real treatment demonstrations."
    },
    {
      image: "/gradd.jpeg",
      title: "Faculty Interaction",
      desc: "Learn directly from experienced mentors who guide you at every step and answer all your questions."
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      id="learning" 
      data-animate="section" 
      className="relative mx-auto max-w-7xl px-6 py-12 md:py-12 max-[470px]:py-6 overflow-hidden"style={{fontFamily: "'Outfit', sans-serif"}}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="learning-bg-element absolute -top-20 -left-20 w-64 h-64 bg-[#ff0279] rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="learning-bg-element absolute -bottom-20 -right-20 w-64 h-64 bg-[#febd01] rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="learning-bg-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#16163f] rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      {/* Animated Heading */}
      <div ref={headingRef} className="text-center mb-8 sm:mb-10 lg:mb-12 relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
          <span className="text-[#16163f] max-[470px]:text-[25px] px-4 sm:px-6 py-1 sm:py-2 rounded-2xl bg-gradient-to-r from-transparent via-[#ff0279]/10 to-transparent inline-block">
            Learning experience
          </span>
        </h1>
      </div>

      {/* Animated Grid */}
      <div ref={gridRef} className="grid gap-6 md:grid-cols-3 relative z-10">
        {learningData.map((item, index) => (
          <LearningCard
            key={index}
            image={item.image}
            title={item.title}
            desc={item.desc}
            index={index}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#ff0279] rounded-full opacity-30"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              animation: `float 3s ease-in-out ${i * 0.5}s infinite alternate`
            }}
          />
        ))}
      </div>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </section>
  )
}