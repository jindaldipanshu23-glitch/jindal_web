'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingBag, ArrowRight, Check, MapPin, Sparkles } from 'lucide-react';
import { useOrders } from '@/context/OrderContext';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products } = useOrders();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>(
    product?.variants && product.variants.length > 0 ? product.variants[0].size : 'Standard'
  );
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{ available: boolean; text: string } | null>(null);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <Link href="/" className="inline-block px-6 py-2 bg-amber-600 text-white rounded-full font-bold text-xs">
          Back to Store
        </Link>
      </div>
    );
  }

  const currentVariant = product.variants?.find((v) => v.size === selectedSize);
  const price = currentVariant ? currentVariant.price : product.defaultPrice;
  const mrp = currentVariant ? currentVariant.mrp : product.defaultMrp;
  const discountPercent = Math.round(((mrp - price) / mrp) * 100);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, price, mrp);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, price, mrp);
    setIsCartOpen(true);
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      setPincodeResult({ available: false, text: 'Please enter a valid 6-digit Pincode' });
      return;
    }
    // Simulate Shiprocket Pincode API call
    setPincodeResult({
      available: true,
      text: `⚡ Shiprocket Express Courier available for ${pincode}! Expected Delivery in 3-4 Business Days.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-700">Home</Link>
        <span>/</span>
        <Link href={`/?category=${product.category}`} className="hover:text-amber-700">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-slate-800 line-clamp-1">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden border-2 border-amber-200 bg-amber-50 shadow-md">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-amber-600 scale-105' : 'border-amber-200 opacity-70'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Purchase Controls */}
        <div className="space-y-6">
          
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md">
              {product.categoryName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-2">
              {product.name}
            </h1>
            {product.hindiName && (
              <p className="text-base font-serif text-amber-900 font-medium mt-1">
                {product.hindiName}
              </p>
            )}

            <div className="flex items-center gap-3 mt-3 text-xs">
              <div className="flex items-center gap-1 bg-amber-100 px-2.5 py-1 rounded-full text-amber-900 font-bold">
                <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                <span>{product.rating} / 5</span>
              </div>
              <span className="text-slate-500">({product.reviewCount} Verified Buyer Reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900 font-serif">
                  ₹{price}
                </span>
                <span className="text-base text-slate-400 line-through">
                  ₹{mrp}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Save {discountPercent}%
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Inclusive of all taxes & free shipping above ₹499</p>
            </div>
          </div>

          {/* Size Variant Picker */}
          {product.hasSizeVariants && product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Select Statue Size (No.):</span>
                <span className="text-amber-700 font-extrabold">Selected: {selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.size}
                    onClick={() => setSelectedSize(v.size)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === v.size
                        ? 'bg-amber-600 text-white border-amber-600 shadow-md scale-105'
                        : 'bg-white text-slate-700 border-amber-200 hover:border-amber-400'
                    }`}
                  >
                    <div>{v.size}</div>
                    <div className="text-[10px] opacity-80">₹{v.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{addedToast ? 'Added to Cart!' : 'Add to Cart'}</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Shiprocket Pincode Checker */}
          <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-3">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Check Delivery Speed (Pincode):</span>
            </label>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit Pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-3 py-2 bg-amber-50/50 border border-amber-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-700 text-white text-xs font-bold rounded-lg hover:bg-amber-800"
              >
                Check
              </button>
            </form>
            {pincodeResult && (
              <p className={`text-xs font-semibold ${pincodeResult.available ? 'text-emerald-700' : 'text-red-600'}`}>
                {pincodeResult.text}
              </p>
            )}
          </div>

          {/* Specs & Shipping Details for Shiprocket */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-600">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
              📦 Product & Logistics Specs
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div><strong>Weight:</strong> {product.weightGrams}g</div>
              <div><strong>Dimensions:</strong> {product.lengthCm}x{product.widthCm}x{product.heightCm} cm</div>
              {product.fabric && <div><strong>Fabric:</strong> {product.fabric}</div>}
              {product.careInstructions && <div><strong>Care:</strong> {product.careInstructions}</div>}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
