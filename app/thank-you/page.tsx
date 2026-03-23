"use client";

import ThankTopBar from "@/components/thanknavbar";
import Script from "next/script";
import React from "react";

export default function SimpleThankYouPage() {
  return (
    <>
      {/* Google Ads Conversion Tracking Script */}
      <Script
        id="google-ads-conversion-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion', {
              'send_to': 'AW-17773805096/9GGBCJms-NwbEKj8mptC',
              'value': 1.0,
              'currency': 'INR'
            });
          `,
        }}
      />
      <Script
        id="google-ads-conversion-tracking-2"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `gtag('event', 'conversion', {'send_to': 'AW-17571736679/_TvwCKCM6I0cEOfY7bpB'});`,
        }}
      />
      
      <ThankTopBar />
      <section className="w-full min-h-[80vh] flex items-center justify-center bg-white py-8 max-[470px]:py-6">
        <div className="max-w-md mx-auto px-4 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">✓</span>
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          
          <p className="text-gray-600 text-lg mb-8">
            Your request has been submitted successfully. We'll contact you soon.
          </p>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-gray-700 mb-2">
              Need help immediately?
            </p>
            <a 
              href="tel:+917436856789" 
              className="text-xl font-bold text-red-600 hover:text-red-700"
            >
              Call: +91 7436856789
            </a>
          </div>

          {/* Back Home Button */}
          <a
            href="/"
            className="inline-block bg-red-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Home
          </a>

          {/* Thank You Message */}
          <p className="mt-8 text-gray-500">
            — Advanced Grohair Team
          </p>
        </div>
      </section>
    </>
  );
}