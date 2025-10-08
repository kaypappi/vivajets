"use client";
import Header from "@/components/layouts/header";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header isMuted={false} toggleMute={() => {}} showMuteButton={false} />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6">VivaJets Privacy Policy</h1>
        <p className="text-white/70 mb-10">
          At VivaJets Limited (“VivaJets”, “we”, “our”, or “us”), your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you interact with our website, mobile platforms, and aviation services.
        </p>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <p className="mt-2 font-semibold">a. Personal Information:</p>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Name, contact details (email, phone, address)</li>
              <li>Identification documents (passport, national ID, etc.)</li>
              <li>Payment details for transactions</li>
              <li>Passenger and travel information (flight preferences, destinations, etc.)</li>
            </ul>
            <p className="mt-3 font-semibold">b. Technical Information:</p>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>IP address, browser type, operating system</li>
              <li>Cookies and analytics data from your interactions with our website</li>
            </ul>
            <p className="mt-3 font-semibold">c. Communication Data:</p>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Messages, emails, or calls exchanged with our representatives</li>
              <li>Feedback or survey responses related to our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p>We use your personal information to:</p>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Process bookings, payments, and service requests</li>
              <li>Manage flight operations, passenger lists, and regulatory documentation</li>
              <li>Communicate with you regarding flights, updates, and offers</li>
              <li>Improve our website and user experience</li>
              <li>Ensure compliance with aviation, safety, and data protection regulations</li>
            </ul>
            <p className="mt-3">We will only use your information for the purposes stated above and where there is a legal basis to do so.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">3. Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Operating partners and service providers (such as flight operators, ground handlers, and catering teams) strictly for operational purposes</li>
              <li>Regulatory and security authorities when required by law or for compliance checks</li>
              <li>Technology and payment processors that help us deliver secure and efficient services</li>
            </ul>
            <p className="mt-3">We do not sell or rent your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
            <p>
              We apply appropriate administrative, technical, and physical safeguards to protect your data from unauthorized access, loss, or misuse. However, please note that no online transmission is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Cookies and Analytics</h2>
            <p>
              Our website uses cookies to improve functionality and user experience. Cookies help us understand how visitors interact with our site and allow us to provide more personalized content. You may adjust your browser settings to disable cookies, though this may affect certain website features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Data Retention</h2>
            <p>
              We retain personal information only as long as necessary to fulfill the purposes described above or as required by law. When data is no longer needed, it is securely deleted or anonymized.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Your Rights</h2>
            <p>Depending on applicable laws, you may have the right to:</p>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request corrections or updates to inaccurate information</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Request deletion of your data, subject to legal and operational requirements</li>
            </ul>
            <p className="mt-3">To exercise these rights, please contact us at <a className="underline" href="mailto:info@falconaero.org">info@falconaero.org</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">8. International Data Transfers</h2>
            <p>
              Where necessary, your information may be transferred to and processed in countries outside your location, including the European Union and the United States. We ensure that such transfers comply with applicable data protection standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. VivaJets is not responsible for the privacy practices or content of such external sites. We encourage you to review their privacy policies before sharing any information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">10. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory changes. Updates will be posted on this page with a revised “Last Updated” date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">11. Contact Us</h2>
            <p>
              VivaJets Limited<br />
              Business Aviation | Charter | Management<br />
              Lagos, Nigeria<br />
              Email: <a className="underline" href="mailto:info@falconaero.org">info@falconaero.org</a><br />
              Website: <a className="underline" href="https://vivajets.com">vivajets.com</a>
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}


