'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Truck, MapPin, CheckCircle2, Clock, ExternalLink, Package } from 'lucide-react';
import { useOrders } from '@/context/OrderContext';

export default function PublicTrackPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const { getOrderById } = useOrders();

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Order Not Found</h2>
        <p className="text-xs text-slate-500">Please check your Order ID or contact support.</p>
        <Link href="/" className="inline-block px-6 py-2 bg-amber-600 text-white rounded-full font-bold text-xs">
          Return to Store
        </Link>
      </div>
    );
  }

  const { courierDetails } = order;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-md space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-100 pb-4 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-md">
              Live Order Tracking
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-1">
              Order #{order.orderId}
            </h1>
            <p className="text-xs text-slate-500">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
          </div>

          <div className="text-left sm:text-right">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full border border-emerald-300">
              Status: {order.orderStatus.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Courier Details */}
        {courierDetails ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs">
              <div>
                <span className="text-slate-500 block">AWB Tracking No.</span>
                <strong className="text-slate-900 text-sm font-mono">{courierDetails.awbNumber}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Courier Partner</span>
                <strong className="text-slate-900 text-sm">{courierDetails.courierName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Est. Delivery</span>
                <strong className="text-emerald-700 text-sm">{courierDetails.estimatedDeliveryDate}</strong>
              </div>
            </div>

            {/* Tracking Activity History */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Shipment History & Milestones
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-300">
                {courierDetails.history.map((event, idx) => (
                  <div key={idx} className="relative flex items-start gap-3 text-xs">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{event.status}</h4>
                      <p className="text-slate-600">{event.description}</p>
                      <span className="text-[10px] text-slate-400">
                        {new Date(event.time).toLocaleString()} • {event.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={courierDetails.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Track directly on Shiprocket Portal</span>
            </a>
          </div>
        ) : (
          <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-600">
            Shipment details are currently being processed by our warehouse.
          </div>
        )}

      </div>

    </div>
  );
};
