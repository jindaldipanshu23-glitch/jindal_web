import React from 'react';

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="border-b border-amber-200 pb-4">
        <h1 className="text-3xl font-bold font-serif text-slate-900">About Ishka Crafts & Spiritual Store</h1>
        <p className="text-xs text-amber-800 font-semibold mt-1">Devotional Crafts & Festival Essentials</p>
      </div>

      <div className="prose prose-amber text-slate-700 text-sm leading-relaxed space-y-4">
        <p>
          Welcome to <strong>ISHKA</strong>, your premier online store dedicated to handcrafted Laddu Gopal Poshaks, Kundan Shringar, Mukuts, and authentic Indian Festival Decor items.
        </p>

        <h3 className="text-lg font-bold text-slate-900 font-serif">Our Mission</h3>
        <p>
          We aim to deliver pure devotional products with unmatched craftsmanship and love to homes across India. Through our seamless online portal and express courier partnerships (Shiprocket & Delhivery), we ensure that your festive and daily puja requirements reach you safely and on time.
        </p>

        <h3 className="text-lg font-bold text-slate-900 font-serif">Quality Promise</h3>
        <p>
          Every poshak, mukut, and festival garland is carefully inspected for quality, fabric durability, and size perfection (from 0 Number to 6+ Number statues).
        </p>
      </div>
    </div>
  );
};
