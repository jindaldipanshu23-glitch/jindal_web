'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const whatsappNumber = '919045124626';
  const defaultMessage = encodeURIComponent('Jai Shri Krishna! I want to inquire about Laddu Gopal Poshak / Festival order on Ishka store.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 font-semibold text-xs transition-all hover:scale-110 border-2 border-white group"
      title="Need size help? Chat with us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white text-emerald-600 group-hover:rotate-12 transition-transform" />
      <span className="hidden sm:inline pr-1 font-bold">WhatsApp Order Help</span>
    </a>
  );
};
