import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RefreshCw, CreditCard, Heart, Phone, Mail, MapPin, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t-4 border-amber-600">
      
      {/* Trust Guarantee Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 border-b border-slate-800 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center p-4 bg-slate-800/40 rounded-xl border border-slate-800">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">100% Quality Assurance</h4>
            <p className="text-xs text-slate-400 mt-1">Handcrafted with pure devotion</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-slate-800/40 rounded-xl border border-slate-800">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Fast Courier Delivery</h4>
            <p className="text-xs text-slate-400 mt-1">Safe dispatch with live tracking</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-slate-800/40 rounded-xl border border-slate-800">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <CreditCard className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Safe UPI & Online Payments</h4>
            <p className="text-xs text-slate-400 mt-1">Google Pay, PhonePe & Paytm</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-slate-800/40 rounded-xl border border-slate-800">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Easy Size Exchange</h4>
            <p className="text-xs text-slate-400 mt-1">Hassle-free size replacement</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-lg">
              🪔
            </div>
            <span className="text-2xl font-bold text-white font-serif tracking-tight">ISHKA</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Ishka is dedicated to handcrafted Laddu Gopal Poshak, Kundan Shringar, Mukut, and premium Festival Decoration items delivered right to your doorstep across India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/?category=kanha-poshak" className="hover:text-amber-300">Kanha Ji Poshak (0-6 No.)</Link></li>
            <li><Link href="/?category=kanha-shringar" className="hover:text-amber-300">Mor Pankh Mukut & Shringar</Link></li>
            <li><Link href="/?category=festival-decor" className="hover:text-amber-300">Festival Toran & Garlands</Link></li>
            <li><Link href="/?category=puja-essentials" className="hover:text-amber-300">Brass Akhand Diya & Samagri</Link></li>
          </ul>
        </div>

        {/* Legal Policy Pages */}
        <div>
          <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-4">Store Policies</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/policy/about-us" className="hover:text-amber-300">About Us</Link></li>
            <li><Link href="/policy/contact-us" className="hover:text-amber-300">Contact Us</Link></li>
            <li><Link href="/policy/refund-shipping" className="hover:text-amber-300">Refund & Shipping Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-xs">
          <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-4">Customer Support</h4>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <a href="https://wa.me/919045124626" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 font-bold">
              +91 90451 24626 (WhatsApp Support)
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-500 shrink-0" />
            <span>support@ishka.com</span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright with discreet Admin Login */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} ISHKA Crafts Store. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Devotees across India
          </p>
          <Link href="/admin" className="text-slate-600 hover:text-slate-400 flex items-center gap-1 text-[11px]" title="Store Admin Login">
            <Lock className="w-3 h-3" /> Admin
          </Link>
        </div>
      </div>

    </footer>
  );
};
