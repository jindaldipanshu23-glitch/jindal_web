'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, HelpCircle, Truck, ShieldCheck, HeartHandshake, CheckCircle2, Plus } from 'lucide-react';
import { useOrders } from '@/context/OrderContext';
import { ProductCard } from '@/components/ProductCard';
import { CategoryType } from '@/types';

export default function HomePage() {
  const { products, isLoaded } = useOrders();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-600 border-t-transparent"></div>
      </div>
    );
  }

  // Filter products by category and size
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSize =
      selectedSizeFilter === 'all' ||
      (p.variants && p.variants.some((v) => v.size.includes(selectedSizeFilter)));
    return matchCategory && matchSize;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-900 text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/30 border border-amber-400/40 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" /> Handcrafted Divine Collection
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black font-serif leading-tight text-amber-100">
              Kanha Ji Ki Poshak & <br />
              <span className="text-yellow-400">Festive Shringar Store</span>
            </h1>
            
            <p className="text-sm sm:text-base text-amber-200/90 leading-relaxed">
              Express Courier Delivery across India. Premium Zardosi Poshaks (0 to 6 No.), Kundan Mukuts, and Festival Decor delivered straight to your home.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-amber-200">
              <span className="flex items-center gap-1 bg-amber-950/50 px-3 py-1.5 rounded-lg border border-amber-700/50">
                <Truck className="w-4 h-4 text-yellow-400" /> Fast Courier Tracking
              </span>
              <span className="flex items-center gap-1 bg-amber-950/50 px-3 py-1.5 rounded-lg border border-amber-700/50">
                <ShieldCheck className="w-4 h-4 text-yellow-400" /> 100% Devotional Quality
              </span>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/60 group">
              <img
                src="https://images.unsplash.com/photo-1609252925148-b0f1b515e111?w=800&auto=format&fit=crop&q=80"
                alt="Laddu Gopal Special Poshak"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="bg-yellow-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    Janmashtami & Daily Shringar
                  </span>
                  <p className="text-lg font-bold text-white font-serif mt-1">
                    Heavy Pearl Zardosi Laddu Gopal Poshak Set
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Selection Tabs & Size Guide Trigger */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200 pb-4">
          
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: '🔥 All Products' },
              { id: 'kanha-poshak', label: '🌸 Kanha Ji Poshak' },
              { id: 'kanha-shringar', label: '👑 Shringar & Mukut' },
              { id: 'festival-decor', label: '🪔 Festival Decor' },
              { id: 'puja-essentials', label: '🔔 Puja Essentials' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 border border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Laddu Gopal Size Guide Button */}
          <button
            onClick={() => setShowSizeGuide(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-yellow-100 hover:bg-yellow-200 px-3.5 py-2 rounded-full border border-yellow-300 transition-colors shadow-xs shrink-0"
          >
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>Laddu Gopal Size Guide (0-6 No.)</span>
          </button>
        </div>

        {/* Size Filter Pills (No. 0 to 6) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          <span className="font-bold text-amber-900 shrink-0">Filter Size:</span>
          {['all', '0 No.', '1 No.', '2 No.', '3 No.', '4 No.', '5 No.', '6 No.'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSizeFilter(size)}
              className={`px-3 py-1 rounded-md text-xs font-semibold shrink-0 border transition-all ${
                selectedSizeFilter === size
                  ? 'bg-amber-800 text-white border-amber-800'
                  : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
              }`}
            >
              {size === 'all' ? 'All Sizes' : size}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-amber-300 p-8 space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              🛍️
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-800">Dukan Me Abhi Naye Products List Ho Rahe Hain</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Aapne saare sample items hata diye hain. Admin panel me jakar apne Kanha Ji ke real products add karein!
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Admin Panel Se Product Daalein</span>
            </Link>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-amber-200 space-y-3">
            <p className="text-lg font-bold text-slate-700">Is category ya size me koi product nahi mila.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSizeFilter('all');
              }}
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>

      {/* Laddu Gopal Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border-2 border-amber-400">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                <span>🪔</span> Laddu Gopal Poshak Size Guide
              </h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Measure your Laddu Gopal Ji statue height or check this standard size chart before placing your order:
            </p>

            <div className="overflow-hidden border border-amber-200 rounded-xl text-xs">
              <table className="w-full text-left">
                <thead className="bg-amber-100 text-amber-950 font-bold">
                  <tr>
                    <th className="p-2.5">Size No.</th>
                    <th className="p-2.5">Statue Height</th>
                    <th className="p-2.5">Poshak Diameter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 text-slate-700 font-medium">
                  <tr>
                    <td className="p-2.5 font-bold text-amber-800">0 Number</td>
                    <td className="p-2.5">1.5 to 2 Inches</td>
                    <td className="p-2.5">4 Inches</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-800">1 Number</td>
                    <td className="p-2.5">2.5 Inches</td>
                    <td className="p-2.5">5 Inches</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-800">2 Number</td>
                    <td className="p-2.5">3 Inches</td>
                    <td className="p-2.5">6 Inches</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-800">3 Number</td>
                    <td className="p-2.5">3.5 Inches</td>
                    <td className="p-2.5">7 Inches</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-800">4 Number</td>
                    <td className="p-2.5">4 Inches</td>
                    <td className="p-2.5">8 Inches</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-800">5 Number</td>
                    <td className="p-2.5">4.5 to 5 Inches</td>
                    <td className="p-2.5">9 to 10 Inches</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-800">6 Number</td>
                    <td className="p-2.5">5.5 to 6 Inches</td>
                    <td className="p-2.5">11 to 12 Inches</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Got It, Thank You!
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
