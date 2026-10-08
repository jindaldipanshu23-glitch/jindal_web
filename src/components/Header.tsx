'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Sparkles, Truck, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Header: React.FC = () => {
  const { cart, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-amber-200/60 shadow-xs">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 text-white text-xs md:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1 bg-amber-900/40 px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" /> Festival Special
        </span>
        <span>✨ Free Express Shipping on orders above ₹499 | Use Code <strong>KANHA10</strong> for 10% OFF</span>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-amber-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                🪔
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-amber-950 font-serif leading-none">
                  ISHKA
                </span>
                <span className="text-[10px] font-medium tracking-widest text-amber-700 uppercase">
                  Kanha Ji & Festive Crafts
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              placeholder="Search Laddu Gopal Poshak, Mukut, Puja Items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-amber-50/50 border border-amber-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-3" />
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-4">
            
            {/* Express Delivery Badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>All India Express Delivery</span>
            </div>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-full transition-colors flex items-center justify-center border border-amber-200"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Categories Navigation Bar */}
        <nav className="hidden md:flex items-center justify-center gap-8 py-2.5 border-t border-amber-100 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-amber-700 transition-colors font-bold">
            🔥 All Products
          </Link>
          <Link href="/?category=kanha-poshak" className="hover:text-amber-700 transition-colors flex items-center gap-1">
            🌸 Kanha Ji Poshak
          </Link>
          <Link href="/?category=kanha-shringar" className="hover:text-amber-700 transition-colors flex items-center gap-1">
            👑 Shringar & Mukut
          </Link>
          <Link href="/?category=festival-decor" className="hover:text-amber-700 transition-colors flex items-center gap-1">
            🪔 Festival Decor
          </Link>
          <Link href="/?category=puja-essentials" className="hover:text-amber-700 transition-colors flex items-center gap-1">
            🔔 Puja Samagri
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-amber-200 px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm"
            />
            <Search className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
          </div>
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">
              🏠 Home
            </Link>
            <Link href="/?category=kanha-poshak" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">
              🌸 Kanha Ji Poshak
            </Link>
            <Link href="/?category=kanha-shringar" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">
              👑 Shringar & Mukut
            </Link>
            <Link href="/?category=festival-decor" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">
              🪔 Festival Decor
            </Link>
            <Link href="/?category=puja-essentials" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">
              🔔 Puja Essentials
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
