'use client';

import React, { useEffect, use } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { CheckCircle2, Truck, ExternalLink, Package, ShieldCheck, MapPin, Share2 } from 'lucide-react';
import { useOrders } from '@/context/OrderContext';

export default function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const { getOrderById } = useOrders();

  const order = getOrderById(orderId);

  useEffect(() => {
    // Trigger confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.log('Confetti error:', e);
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Order Information Loading...</h2>
        <Link href="/" className="inline-block px-6 py-2 bg-amber-600 text-white rounded-full font-bold text-xs">
          Return to Store
        </Link>
      </div>
    );
  }

  const { courierDetails } = order;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Celebration Header */}
      <div className="text-center space-y-3 bg-gradient-to-b from-amber-100 to-amber-50/30 p-8 rounded-3xl border border-amber-200 shadow-sm">
        <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h1 className="text-2xl sm:text-4xl font-black font-serif text-slate-900">
          Order Confirmed! Jai Shri Krishna 🙏
        </h1>
        
        <p className="text-sm font-semibold text-amber-900">
          Order ID: <span className="bg-amber-200/80 px-2 py-0.5 rounded font-mono text-base">{order.orderId}</span>
        </p>

        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          Thank you for shopping with Ishka! Your payment has been received and shipment has been automatically created.
        </p>
      </div>

      {/* Shiprocket Courier Tracking Card */}
      {courierDetails ? (
        <div className="bg-white p-6 rounded-2xl border-2 border-emerald-500 shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
            ⚡ Shiprocket Auto-Booked
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Shipment & Courier Status</h3>
              <p className="text-xs text-slate-500">AWB Tracking Number: <strong className="text-slate-800 font-mono">{courierDetails.awbNumber}</strong></p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl text-xs border border-slate-200">
            <div>
              <span className="text-slate-400 block font-medium">Assigned Courier</span>
              <strong className="text-slate-800 text-sm">{courierDetails.courierName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Estimated Delivery</span>
              <strong className="text-emerald-700 text-sm">{courierDetails.estimatedDeliveryDate}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Pickup Warehouse</span>
              <strong className="text-slate-800 text-sm">Ishka Delhi Warehouse</strong>
            </div>
          </div>

          {/* Tracking Timeline Bar */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-700 mb-3">Live Status Progress:</h4>
            <div className="flex items-center justify-between relative text-xs">
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                <span className="font-bold text-slate-800 text-[11px]">Paid</span>
              </div>
              <div className="flex-1 h-1 bg-emerald-500 mx-2"></div>
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                <span className="font-bold text-slate-800 text-[11px]">Booked</span>
              </div>
              <div className="flex-1 h-1 bg-slate-200 mx-2"></div>
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-slate-400 text-[11px]">In Transit</span>
              </div>
              <div className="flex-1 h-1 bg-slate-200 mx-2"></div>
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">4</div>
                <span className="text-slate-400 text-[11px]">Delivered</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={`/track/${order.orderId}`}
              className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Live Order Tracking Page</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-300 text-center space-y-2">
          <p className="text-sm font-bold text-amber-900">Payment Pending / COD Order</p>
          <p className="text-xs text-slate-600">Shipment will be booked by admin shortly.</p>
        </div>
      )}

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Customer Address */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 border-b border-amber-100 pb-2">
            <MapPin className="w-4 h-4 text-amber-600" /> Shipping Address
          </h4>
          <p className="font-bold text-slate-800">{order.customer.fullName}</p>
          <p className="text-slate-600">{order.customer.addressLine1}</p>
          <p className="text-slate-600">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
          <p className="text-slate-600"><strong>Mobile:</strong> {order.customer.phone}</p>
        </div>

        {/* Order Receipt */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 border-b border-amber-100 pb-2">
            <Package className="w-4 h-4 text-amber-600" /> Items & Payment Receipt
          </h4>
          {order.items.map((it) => (
            <div key={it.id} className="flex justify-between py-1 border-b border-slate-100">
              <span>{it.product.name} ({it.selectedSize}) x{it.quantity}</span>
              <span className="font-bold">₹{it.price * it.quantity}</span>
            </div>
          ))}
          <div className="pt-2 flex justify-between font-black text-sm text-slate-900">
            <span>Total Paid ({order.paymentMethod}):</span>
            <span className="text-amber-700">₹{order.totalAmount}</span>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full shadow-lg"
        >
          Continue Shopping on Ishka
        </Link>
      </div>

    </div>
  );
};
