'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  // Selected size state (default to first variant if exists, or 'Standard')
  const defaultSize = product.variants && product.variants.length > 0 
    ? product.variants[0].size 
    : 'Standard';
  
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Active pricing based on size selection
  const currentVariant = product.variants?.find((v) => v.size === selectedSize);
  const price = currentVariant ? currentVariant.price : product.defaultPrice;
  const mrp = currentVariant ? currentVariant.mrp : product.defaultMrp;
  const discountPercent = Math.round(((mrp - price) / mrp) * 100);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, price, mrp);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="group bg-white rounded-2xl border border-amber-200/70 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col">
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-amber-50">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.bestseller && (
            <span className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Bestseller
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-xs border border-amber-100">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{product.rating}</span>
          <span className="text-slate-400 font-normal">({product.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
            {product.categoryName}
          </span>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 hover:text-amber-700 transition-colors mt-0.5">
              {product.name}
            </h3>
          </Link>
          {product.hindiName && (
            <p className="text-[11px] text-amber-900 font-serif font-medium mt-0.5">
              {product.hindiName}
            </p>
          )}
        </div>

        {/* Size Variation Selector */}
        {product.hasSizeVariants && product.variants && product.variants.length > 0 && (
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1 font-medium">
              <span>Select Size (No.):</span>
              <span className="text-amber-800 font-bold">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.variants.map((v) => (
                <button
                  key={v.size}
                  onClick={() => setSelectedSize(v.size)}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-all ${
                    selectedSize === v.size
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-amber-50 text-slate-700 border-amber-200 hover:border-amber-400'
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-amber-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900 font-serif">
                ₹{price}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{mrp}
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">Taxes Included</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              addedAnimation
                ? 'bg-emerald-600 text-white scale-95'
                : 'bg-amber-600 hover:bg-amber-700 text-white hover:scale-105'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
