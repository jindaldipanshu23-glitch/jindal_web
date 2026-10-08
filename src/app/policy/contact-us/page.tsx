import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="border-b border-amber-200 pb-4">
        <h1 className="text-3xl font-bold font-serif text-slate-900">Contact Us</h1>
        <p className="text-xs text-amber-800 font-semibold mt-1">We are here to assist you with your orders and size queries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        <div className="bg-white p-6 rounded-2xl border border-amber-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-base font-serif">Customer Care Details</h3>

          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="block text-slate-800">WhatsApp Helpline</strong>
              <a href="https://wa.me/919045124626" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold text-xs hover:underline">
                +91 90451 24626
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong className="block text-slate-800">Email Support</strong>
              <span className="text-slate-600 text-xs">support@ishka.com</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong className="block text-slate-800">Support Hours</strong>
              <span className="text-slate-600 text-xs">Monday to Saturday (10:00 AM - 8:00 PM IST)</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-base font-serif">Instant WhatsApp Assistance</h3>
          <p className="text-xs text-slate-600">
            For fastest response regarding Laddu Gopal Poshak size confirmation or custom festival orders, please message us directly on WhatsApp.
          </p>
          <a
            href="https://wa.me/919045124626?text=Hello%20Ishka%20Store%2C%20I%20have%20a%20query"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp (+91 90451 24626)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
