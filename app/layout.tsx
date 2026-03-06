import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "AdGro Hair Royapuram",
  description:
    "AdGro Hair Royapuram. Our experienced professionals and experts recommend you the best treatment that matches your needs and assist you achieve the desired results that you have always longed for.",
  generator: 'Nextjs15',
  icons: {
    icon: [
      {
        url: "/royafav.jpg",
        sizes: "any",
      },
      {
        url: "/royafav.jpg",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/royafav.jpg",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/royafav.jpg",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/royafav.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/royafav.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17773805096"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17773805096');
          `}
        </Script>
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}