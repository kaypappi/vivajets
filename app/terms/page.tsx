"use client";
import Header from "@/components/layouts/header";
import React from "react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header isMuted={false} toggleMute={() => {}} showMuteButton={false} />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6">VivaJets – Terms and Conditions</h1>
        <p className="text-white/70 mb-10">
          These Terms and Conditions (“Terms”) govern all charter, management, and ancillary aviation services provided by VivaJets Limited (“VivaJets”, “we”, “us”, or “our”) to the Client (“you” or “your”). By engaging VivaJets’ services, you agree to be bound by these Terms.
        </p>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>
              These Terms and Conditions (“Terms”) govern all charter, management, and ancillary aviation services provided by VivaJets Limited (“VivaJets”, “we”, “us”, or “our”) to the Client (“you” or “your”). By engaging VivaJets’ services, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">2. Services Provided</h2>
            <p>VivaJets provides business aviation services, including but not limited to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Private jet charter (on-demand and block-hour agreements)</li>
              <li>Aircraft management and acquisition support</li>
              <li>Flight coordination and operations services</li>
              <li>Ground handling, catering, and concierge services</li>
            </ul>
            <p className="mt-3">All services are provided subject to aircraft availability, regulatory compliance, and operational feasibility.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">3. Charter Bookings</h2>
            <p className="mb-2"><span className="font-semibold">3.1 Quotation &amp; Confirmation –</span> Quotations are valid for a limited period as indicated in the proposal. A booking is only confirmed upon written acceptance by the Client and receipt of full or partial payment, as agreed.</p>
            <p className="mb-2"><span className="font-semibold">3.2 Flight Schedule –</span> Final flight schedules are subject to slot approvals, air traffic control, and other operational conditions. VivaJets reserves the right to adjust departure times or routing for safety or regulatory reasons.</p>
            <p><span className="font-semibold">3.3 Passenger Information –</span> Clients must provide accurate passenger details, passport copies, and any special requirements at least 48 hours before departure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Payment Terms</h2>
            <p className="mb-2"><span className="font-semibold">4.1 Currency &amp; Method –</span> All payments shall be made in the currency stated in the invoice, via bank transfer or other approved payment methods.</p>
            <p className="mb-2"><span className="font-semibold">4.2 Deposit &amp; Balance –</span> A deposit or full prepayment is required to secure aircraft availability. Remaining balances (if applicable) must be settled before departure.</p>
            <p><span className="font-semibold">4.3 Late Payment –</span> Delayed payments may result in flight cancellation or additional administrative charges.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Cancellation and Refunds</h2>
            <p className="mb-2"><span className="font-semibold">5.1 Client Cancellations –</span> Cancellations must be made in writing. Charges may apply based on notice period:</p>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>More than 7 days before departure: up to 10% of charter fee</li>
              <li>3–7 days: up to 50%</li>
              <li>Less than 72 hours: up to 100%</li>
            </ul>
            <p className="mt-2"><span className="font-semibold">5.2 Operator Cancellations –</span> In the unlikely event that VivaJets must cancel a flight for safety or operational reasons, the Client will receive a full refund or credit, except where regulatory or force majeure conditions apply.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Force Majeure</h2>
            <p>
              VivaJets shall not be liable for any delay, cancellation, or non-performance caused by events beyond its reasonable control, including but not limited to weather conditions, technical failures, war, terrorism, regulatory restrictions, or strikes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Liability and Insurance</h2>
            <p className="mb-2"><span className="font-semibold">7.1</span> VivaJets and its operating partners maintain insurance coverage in accordance with international aviation standards.</p>
            <p className="mb-2"><span className="font-semibold">7.2</span> VivaJets shall not be liable for any indirect, consequential, or punitive damages arising from the use of its services, except where required by law.</p>
            <p><span className="font-semibold">7.3</span> Passenger baggage and personal effects are carried at the Client’s own risk unless otherwise insured.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">8. Conduct and Compliance</h2>
            <p>
              Clients and passengers must comply with all applicable aviation regulations, customs, immigration, and security procedures. The pilot-in-command retains full authority concerning flight safety and operational decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">9. Confidentiality and Data Protection</h2>
            <p>
              VivaJets respects client confidentiality and processes personal data in accordance with applicable data protection laws. Information will only be shared with regulatory authorities or service partners as necessary to fulfil the contract.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">10. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Lagos State.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">11. Amendments</h2>
            <p>
              VivaJets reserves the right to amend these Terms at any time. Updated Terms will be made available on our official website or upon request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">12. Acceptance</h2>
            <p>
              By confirming a booking or engaging our services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Contact</h2>
            <p>
              VivaJets Limited<br />
              Business Aviation | Charter | Management<br />
              Lagos, Nigeria<br />
              <a href="https://vivajets.com" className="underline">vivajets.com</a>
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}


