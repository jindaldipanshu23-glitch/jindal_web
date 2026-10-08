import React from 'react';

export default function RefundShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-sm text-slate-700">
      <div className="border-b border-amber-200 pb-4">
        <h1 className="text-3xl font-bold font-serif text-slate-900">Refund, Exchange & Shipping Policy</h1>
        <p className="text-xs text-amber-800 font-semibold mt-1">Clear guidelines on courier delivery and returns</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 font-serif">1. Express Shipping via Shiprocket</h3>
        <p>
          All orders are dispatched within 24 hours of payment confirmation via our integrated logistics partner (Shiprocket / Delhivery / Express Logistics). Delivery typically takes 2 to 5 business days depending on customer pincode.
        </p>

        <h3 className="text-lg font-bold text-slate-900 font-serif">2. Free Shipping Threshold</h3>
        <p>
          We offer <strong>FREE Delivery</strong> on all orders above ₹499. For orders under ₹499, a flat shipping charge of ₹50 applies.
        </p>

        <h3 className="text-lg font-bold text-slate-900 font-serif">3. Size Exchange & Returns</h3>
        <p>
          If you order an incorrect poshak size for your Laddu Gopal Ji statue, we offer a hassle-free 7-day size replacement. Please contact us via WhatsApp or email with your Order ID to initiate an exchange.
        </p>
      </div>
    </div>
  );
};
