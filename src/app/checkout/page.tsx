'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Truck, CreditCard, ArrowRight, Lock, CheckCircle2, QrCode, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { ShippingAddress, PaymentMethod } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, shippingFee, totalAmount, totalWeightGrams, clearCart } = useCart();
  const { createOrder, paymentSettings } = useOrders();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Uttar Pradesh',
    pincode: '',
    landmark: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [upiPaymentDone, setUpiPaymentDone] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500">Please add products before checking out.</p>
        <Link href="/" className="inline-block px-6 py-2 bg-amber-600 text-white rounded-full font-bold text-xs">
          Return to Store
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!address.fullName || !address.phone || !address.addressLine1 || !address.city || !address.pincode) {
      setErrorMsg('Kripya apna poora delivery address bharein.');
      return;
    }

    if (address.pincode.length !== 6) {
      setErrorMsg('Pincode sahi 6-digit ka hona chahiye.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customer: address,
        items: cart,
        subtotal,
        shippingFee,
        discount,
        totalAmount,
        paymentMethod,
        totalWeightGrams,
      });

      clearCart();
      setIsProcessing(false);
      router.push(`/order-success/${order.orderId}`);
    }, 1200);
  };

  // Direct UPI Intent link
  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(paymentSettings.upiId || 'ishkacrafts@upi')}&pn=${encodeURIComponent(paymentSettings.upiName || 'Ishka Store')}&am=${totalAmount}&cu=INR&tn=Ishka_Order`;
  const upiQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiIntentUrl)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="border-b border-amber-200 pb-4">
        <h1 className="text-2xl font-bold font-serif text-slate-900">Secure Checkout & Payment</h1>
        <p className="text-xs text-slate-500 mt-1">
          Address bharein aur online payment complete karein taaki Shiprocket delivery auto-dispatch ho jaye.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left & Middle: Shipping Form & Payment Selection */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2 border-b border-amber-100 pb-3">
              <Truck className="w-5 h-5 text-amber-600" />
              <span>1. Customer Delivery Address</span>
            </h3>

            {errorMsg && (
              <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                {errorMsg}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Ka Naam *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Rahul Sharma"
                  value={address.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile No. (Tracking Updates Ke Liye) *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit Mobile Number"
                  value={address.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Order receipt bhejne ke liye"
                  value={address.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Makaan No. / Gali / Colony / Landmark *</label>
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="House No., Street name, Landmark"
                  value={address.addressLine1}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Shahar (City) *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pincode (6-digit) *</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="6-digit Pincode"
                  maxLength={6}
                  value={address.pincode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2 border-b border-amber-100 pb-3">
              <CreditCard className="w-5 h-5 text-amber-600" />
              <span>2. Payment Option Select Karein</span>
            </h3>

            {/* If Direct UPI Mode is enabled in admin */}
            {paymentSettings.gateway === 'MANUAL_UPI' && (
              <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-400 space-y-3 text-center">
                <div className="flex items-center justify-center gap-2 font-bold text-amber-950 text-sm">
                  <QrCode className="w-5 h-5 text-amber-700" />
                  <span>Scan & Pay with Any UPI App (GPay, PhonePe, Paytm)</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white p-4 rounded-xl border border-amber-200">
                  <img
                    src={upiQrImageUrl}
                    alt="UPI QR Code"
                    className="w-36 h-36 border-2 border-amber-500 rounded-lg shadow-sm"
                  />
                  <div className="text-left space-y-1 text-xs">
                    <p className="text-slate-500">Payable Amount:</p>
                    <p className="text-xl font-black text-slate-900 font-serif">₹{totalAmount}</p>
                    <p className="text-slate-600"><strong>UPI ID:</strong> <span className="font-mono bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-bold">{paymentSettings.upiId}</span></p>
                    <p className="text-slate-600"><strong>Name:</strong> {paymentSettings.upiName}</p>
                    <a
                      href={upiIntentUrl}
                      className="inline-block mt-2 px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-[11px]"
                    >
                      Tap to Pay on Mobile App
                    </a>
                  </div>
                </div>

                <label className="flex items-center justify-center gap-2 text-xs font-bold text-slate-800 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={upiPaymentDone}
                    onChange={(e) => setUpiPaymentDone(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>Maine UPI se ₹{totalAmount} pay kar diya hai (Order confirm karein)</span>
                </label>
              </div>
            )}

            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod('UPI')}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'UPI' ? 'border-amber-600 bg-amber-50/70' : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input type="radio" checked={paymentMethod === 'UPI'} onChange={() => {}} />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">UPI (Google Pay, PhonePe, Paytm)</h4>
                    <p className="text-xs text-slate-500">Instant confirmation & auto Shiprocket courier dispatch</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                  Recommended
                </span>
              </label>

              <label
                onClick={() => setPaymentMethod('COD')}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'COD' ? 'border-amber-600 bg-amber-50/70' : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input type="radio" checked={paymentMethod === 'COD'} onChange={() => {}} />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Cash on Delivery (COD)</h4>
                    <p className="text-xs text-slate-500">Delivery boy aane par cash payment karein</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right: Order Summary */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-lg sticky top-24 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-serif border-b border-amber-100 pb-3">
              Order Summary
            </h3>

            <div className="divide-y divide-amber-100 max-h-60 overflow-y-auto pr-1 space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 object-cover rounded-md" />
                    <div>
                      <h5 className="font-bold text-slate-800 line-clamp-1">{item.product.name}</h5>
                      <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        Size: {item.selectedSize} x {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-amber-200 space-y-2 text-xs text-slate-600">
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

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isProcessing ? 'Order Process Ho Raha Hai...' : `Order Place Karein (₹${totalAmount})`}</span>
            </button>

            <p className="text-[10px] text-center text-slate-400">
              🔒 256-Bit SSL Encrypted & Shiprocket Auto-Dispatched
            </p>
          </div>
        </div>

      </form>

    </div>
  );
};
