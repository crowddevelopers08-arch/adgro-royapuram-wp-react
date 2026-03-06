"use client";

import GrohairTopBar from "@/components/header";
import ThankTopBar from "@/components/thanknavbar";
import React from "react";

export default function SimplePrivacyPolicyPage() {
  return (
    <>
     <ThankTopBar />
    <section className="w-full bg-white py-8 sm:py-8 max-[470px]:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <div className="h-1 w-16 bg-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informations We Collect</h2>
            <div className="ml-4 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1.1 Personal Information</h3>
                <p className="text-gray-600 mb-2">We may collect the following personal details:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Name, contact information (phone number, email address, etc.)</li>
                  <li>Any information shared during inquiries, appointments, or service requests</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1.2 Non-Personal Information</h3>
                <p className="text-gray-600 mb-2">We also collect general data, such as:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Browser type, IP address, and device information</li>
                  <li>Website usage data through cookies and similar technologies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-3">Your information is used to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide and improve the services you request</li>
              <li>Communicate with you about appointments, updates, or inquiries</li>
              <li>Process payments and manage billing</li>
              <li>Enhance website functionality and user experience</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Protect Your Data</h2>
            <p className="text-gray-600 mb-3">We prioritize the security of your personal data by implementing:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Encryption during data transmission and storage</li>
              <li>Restricted access to sensitive information</li>
              <li>Regular reviews and updates to our security measures</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sharing Your Information</h2>
            <p className="text-gray-600 mb-3">We may share your information in limited circumstances:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>With service providers assisting in delivering our services (e.g., IT support, payment processors)</li>
              <li>To comply with legal requirements, such as court orders or regulatory demands</li>
            </ul>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 font-semibold">We do not sell or rent your personal data to third parties.</p>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-600 mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Request access to your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your data, subject to legal or operational obligations</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Website Tracking</h2>
            <p className="text-gray-600">
              We use cookies to improve website performance and user experience. You can control or disable cookies in your browser settings, but this may impact website functionality.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
            <p className="text-gray-600">
              Our website may include links to third-party websites. We are not responsible for their content or privacy practices. Please review their policies before sharing your information.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to This Privacy Policy</h2>
            <p className="text-gray-600">
              We may update this policy from time to time. Any changes will be posted on this page with a revised "Effective Date."
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-2"><span className="font-medium">Phone:</span> +91 7436856789</p>
            </div>
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <p className="text-center text-gray-700">
                Thank you for trusting us. Your privacy and security are our top priorities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
     </>
  );
}