'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    shippingFee,
    freeShippingThreshold,
    totalAmount,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const res = applyCoupon(inputCoupon);
    setCouponMessage(res);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs transition-opacity">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Cart Header */}
          <div className="p-4 bg-amber-700 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2 font-bold text-lg font-serif">
              <ShoppingBag className="w-5 h-5 text-yellow-300" />
              <span>Shopping Cart ({cart.length})</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full hover:bg-amber-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-amber-50 p-3.5 border-b border-amber-200">
            {amountNeededForFreeShipping > 0 ? (
              <div>
                <p className="text-xs text-amber-900 font-semibold mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Add <strong className="text-amber-700">₹{amountNeededForFreeShipping}</strong> more for <strong>FREE Shipping!</strong>
                </p>
                <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                🎉 Congratulations! You unlocked FREE Delivery!
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-3xl">
                  🪔
                </div>
                <h3 className="text-lg font-bold text-slate-800">Your Cart is Empty</h3>
                <p className="text-xs text-slate-500">
                  Explore our divine Laddu Gopal Poshak and festival decorations!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold text-xs shadow-md transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-white rounded-xl border border-amber-200/80 shadow-xs hover:border-amber-400 transition-all"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-amber-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200">
                        Size: {item.selectedSize}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        ₹{item.price}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through">
                        ₹{item.mrp}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-amber-300 rounded-lg overflow-hidden bg-amber-50/50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-700 hover:bg-amber-200"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-700 hover:bg-amber-200"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-amber-200 space-y-3">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Coupon Code (e.g. KANHA10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs uppercase tracking-wider font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <Tag className="w-3.5 h-3.5 text-amber-600 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponCode && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-200">
                  <span>Coupon <strong>{couponCode}</strong> applied (-₹{discount})</span>
                  <button onClick={removeCoupon} className="text-red-600 font-bold hover:underline">Remove</button>
                </div>
              )}

              {couponMessage && !couponCode && (
                <p className={`text-[11px] font-medium ${couponMessage.success ? 'text-emerald-700' : 'text-red-600'}`}>
                  {couponMessage.message}
                </p>
              )}

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-slate-800">
                    {shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-amber-700 font-serif">₹{totalAmount}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.01]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
