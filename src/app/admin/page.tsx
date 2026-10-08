'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Package, ShoppingCart, DollarSign, Truck, Plus, CheckCircle2, 
  Trash2, Settings, ToggleLeft, ToggleRight, Sparkles, ExternalLink, Box,
  CreditCard, QrCode, AlertCircle, RefreshCw, Lock, KeyRound, Eye, EyeOff, User, LogOut
} from 'lucide-react';
import { useOrders } from '@/context/OrderContext';
import { Product, CategoryType } from '@/types';

// STRICT ADMIN CREDENTIALS
const VALID_ADMIN_USERS = ['admin@ishka', '9045124626', 'dipanshu@ishka', 'admin'];
const STRICT_ADMIN_PASSWORD = '24771234';

export default function AdminDashboardPage() {
  const { 
    orders, 
    products, 
    isLoaded,
    shiprocketSettings, 
    paymentSettings,
    updateOrderStatus, 
    triggerShiprocketBooking, 
    updateShiprocketSettings,
    updatePaymentSettings,
    addNewProduct,
    deleteProduct,
    clearAllProducts,
    loadSampleProducts,
  } = useOrders();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'payment' | 'shiprocket'>('products');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [bookingLoadingId, setBookingLoadingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    hindiName: '',
    category: 'kanha-poshak',
    categoryName: 'Kanha Ji Poshak',
    description: '',
    images: ['https://images.unsplash.com/photo-1609252925148-b0f1b515e111?w=800&auto=format&fit=crop&q=80'],
    weightGrams: 150,
    lengthCm: 20,
    widthCm: 20,
    heightCm: 5,
    hasSizeVariants: true,
    defaultPrice: 299,
    defaultMrp: 499,
    variants: [
      { size: '0 No.', price: 199, mrp: 399, stock: 20 },
      { size: '1 No.', price: 249, mrp: 449, stock: 20 },
      { size: '2 No.', price: 299, mrp: 499, stock: 20 },
      { size: '3 No.', price: 349, mrp: 599, stock: 15 },
      { size: '4 No.', price: 399, mrp: 699, stock: 10 },
      { size: '5 No.', price: 449, mrp: 799, stock: 10 },
      { size: '6 No.', price: 499, mrp: 899, stock: 10 },
    ]
  });

  // Check login session on load
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('ishka_admin_logged_in');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanUser = usernameInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    if (!VALID_ADMIN_USERS.includes(cleanUser)) {
      setLoginError('Galat Admin ID / Username! Kripya sahi ID daalein.');
      return;
    }

    if (cleanPass !== STRICT_ADMIN_PASSWORD) {
      setLoginError('Galat Password! Keval sahi password se hi access milega.');
      return;
    }

    setIsAuthenticated(true);
    sessionStorage.setItem('ishka_admin_logged_in', 'true');
    setLoginError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ishka_admin_logged_in');
    setUsernameInput('');
    setPasswordInput('');
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({
          ...prev,
          images: [reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => (o.paymentStatus === 'PAID' ? sum + o.totalAmount : sum), 0);
  const bookedCourierCount = orders.filter((o) => o.courierDetails).length;

  const handleManualDispatch = async (orderId: string) => {
    setBookingLoadingId(orderId);
    const res = await triggerShiprocketBooking(orderId);
    setBookingLoadingId(null);
    setToastMsg(res.message);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name) {
      alert('Product ka naam daalna zaroori hai!');
      return;
    }

    const created: Product = {
      id: `ishka-p-${Date.now()}`,
      name: newProduct.name,
      hindiName: newProduct.hindiName || '',
      category: newProduct.category as CategoryType,
      categoryName: newProduct.category === 'kanha-poshak' ? 'Kanha Ji Poshak' : 
                    newProduct.category === 'kanha-shringar' ? 'Kanha Ji Shringar' :
                    newProduct.category === 'festival-decor' ? 'Festival Decor' : 'Puja Essentials',
      description: newProduct.description || 'Sundar traditional handmade item',
      images: newProduct.images && newProduct.images.length > 0 ? newProduct.images : ['https://images.unsplash.com/photo-1609252925148-b0f1b515e111?w=800&auto=format&fit=crop&q=80'],
      featured: true,
      bestseller: true,
      rating: 5.0,
      reviewCount: 1,
      weightGrams: Number(newProduct.weightGrams) || 150,
      lengthCm: Number(newProduct.lengthCm) || 20,
      widthCm: Number(newProduct.widthCm) || 20,
      heightCm: Number(newProduct.heightCm) || 5,
      hasSizeVariants: true,
      defaultPrice: Number(newProduct.defaultPrice) || 299,
      defaultMrp: Number(newProduct.defaultMrp) || 499,
      variants: newProduct.variants || [],
    };

    addNewProduct(created);
    setShowAddProductModal(false);
    setToastMsg(`🎉 "${created.name}" dukan me list ho gaya!`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // 🔒 SECURE ADMIN LOGIN SCREEN (Strict Password: 24771234)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-amber-50/40">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border-2 border-amber-400 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-900">Ishka Store Admin Login</h2>
            <p className="text-xs text-slate-500">
              Authorized personnel only. Apni Admin ID aur Password se login karein.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Username / Admin ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin ID / Mobile No.</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="admin@ishka ya 9045124626"
                  value={usernameInput}
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                    setLoginError('');
                  }}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs font-medium"
                />
                <User className="w-4 h-4 text-amber-600 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Secret Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError('');
                  }}
                  required
                  className="w-full pl-10 pr-10 py-3 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs font-mono font-bold tracking-wider"
                />
                <KeyRound className="w-4 h-4 text-amber-600 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold rounded-xl text-xs shadow-lg transition-all hover:scale-[1.01]"
            >
              Sign In to Admin Panel
            </button>
          </form>

          <div className="pt-2 text-center border-t border-slate-100 text-[11px] text-slate-400">
            🔒 Protected with 256-Bit Strict Credential Lock
          </div>

        </div>
      </div>
    );
  }

  // 🛡️ AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-bold border border-amber-400 animate-bounce flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md">
              Ishka Control Panel
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Dipanshu Jindal (Admin)
            </span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 mt-1">
            Store Owner Dashboard
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddProductModal(true)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Naya Product Daalein</span>
          </button>
          
          <Link
            href="/"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Website Par Dekhein
          </Link>

          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-amber-700">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Sales</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-serif">₹{totalRevenue}</p>
          <p className="text-[11px] text-emerald-700 font-semibold">Total Payments Received</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-amber-700">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Orders</span>
            <ShoppingCart className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-serif">{orders.length}</p>
          <p className="text-[11px] text-slate-500">Customer Orders</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-amber-700">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Courier Dispatched</span>
            <Truck className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-emerald-700 font-serif">{bookedCourierCount}</p>
          <p className="text-[11px] text-emerald-700 font-semibold">Shiprocket AWB Bookings</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-amber-700">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Products</span>
            <Package className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-serif">{products.length}</p>
          <p className="text-[11px] text-slate-500">Dukan me listed saaman</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-amber-200 gap-4 text-sm font-bold text-slate-600 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-2.5 shrink-0 transition-colors ${
            activeTab === 'products' ? 'text-amber-700 border-b-2 border-amber-700' : 'hover:text-slate-900'
          }`}
        >
          🛍️ Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2.5 shrink-0 transition-colors ${
            activeTab === 'orders' ? 'text-amber-700 border-b-2 border-amber-700' : 'hover:text-slate-900'
          }`}
        >
          📦 Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`pb-2.5 shrink-0 transition-colors flex items-center gap-1.5 ${
            activeTab === 'payment' ? 'text-amber-700 border-b-2 border-amber-700' : 'hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>💳 Bank & UPI QR Setup</span>
        </button>
        <button
          onClick={() => setActiveTab('shiprocket')}
          className={`pb-2.5 shrink-0 transition-colors flex items-center gap-1.5 ${
            activeTab === 'shiprocket' ? 'text-amber-700 border-b-2 border-amber-700' : 'hover:text-slate-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>🚚 Shiprocket API</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-amber-200 gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm font-serif">Product Catalog Controls</h3>
              <p className="text-xs text-slate-500">Aap yahan se dummy sample products hata sakte hain aur apne real products daal sakte hain.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (confirm('Kya aap sach me saare products delete karke dukan khali karna chahte hain?')) {
                    clearAllProducts();
                    setToastMsg('🗑️ Saare products dukan se hata diye gaye hain!');
                    setTimeout(() => setToastMsg(null), 3000);
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All (Saare Hatao)</span>
              </button>

              <button
                onClick={() => {
                  loadSampleProducts();
                  setToastMsg('✨ Sample products load ho gaye!');
                  setTimeout(() => setToastMsg(null), 3000);
                }}
                className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl border border-amber-300 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sample Load Karein</span>
              </button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-amber-300 text-center space-y-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                🪔
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Aapki Dukan Khali Hai (0 Products)</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Aapne saara dummy saaman hata diya hai. Ab **"+ Naya Product Daalein"** button dabakar apne real Kanha Ji ke vastra, mukut ya festival items list karein!
              </p>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                + Pehla Real Product Add Karein
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs space-y-3 flex flex-col justify-between relative group">
                  <button
                    onClick={() => {
                      if (confirm(`Kya aap "${p.name}" ko delete karna chahte hain?`)) {
                        deleteProduct(p.id);
                        setToastMsg(`Deleted: ${p.name}`);
                        setTimeout(() => setToastMsg(null), 2500);
                      }
                    }}
                    className="absolute top-3 right-3 p-1.5 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-colors shadow-xs z-10"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-20 h-20 object-cover rounded-xl border border-amber-100 shrink-0" />
                    <div className="pr-6">
                      <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        {p.categoryName}
                      </span>
                      <h4 className="font-bold text-slate-800 text-xs mt-1 line-clamp-2">{p.name}</h4>
                      <p className="text-sm font-extrabold text-slate-900 font-serif mt-1">₹{p.defaultPrice}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] space-y-1 text-slate-600">
                    <div className="flex justify-between">
                      <span>Weight:</span>
                      <strong>{p.weightGrams}g</strong>
                    </div>
                    {p.variants && (
                      <div className="flex justify-between text-amber-800 font-bold">
                        <span>Sizes:</span>
                        <span>{p.variants.map((v) => v.size).join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-amber-50 border-b border-amber-200 flex justify-between items-center text-xs font-bold text-amber-900">
            <span>Customer Orders List</span>
            <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
              Payment Gateway: {paymentSettings.gateway}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Name & Address</th>
                  <th className="p-4">Items & Size</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Courier Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Abhi koi order nahi aaya hai. Website se test order karke dekhein!
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.orderId} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-4">
                        <span className="font-bold text-slate-900 font-mono text-sm block">{o.orderId}</span>
                        <span className="text-[10px] text-slate-400">{new Date(o.orderDate).toLocaleString()}</span>
                      </td>

                      <td className="p-4">
                        <strong className="text-slate-900 block">{o.customer.fullName}</strong>
                        <span className="text-slate-500 block">{o.customer.phone}</span>
                        <span className="text-slate-400 text-[11px] block">{o.customer.addressLine1}, {o.customer.city} ({o.customer.pincode})</span>
                      </td>

                      <td className="p-4 max-w-xs">
                        {o.items.map((it) => (
                          <div key={it.id} className="text-[11px]">
                            • {it.product.name} <strong className="text-amber-800">({it.selectedSize})</strong> x{it.quantity}
                          </div>
                        ))}
                      </td>

                      <td className="p-4">
                        <strong className="text-slate-900 text-sm font-serif block">₹{o.totalAmount}</strong>
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {o.paymentMethod} • {o.paymentStatus}
                        </span>
                      </td>

                      <td className="p-4">
                        {o.courierDetails ? (
                          <div>
                            <span className="font-mono font-bold text-emerald-700 block text-xs">
                              AWB: {o.courierDetails.awbNumber}
                            </span>
                            <span className="text-slate-500 text-[10px] block">{o.courierDetails.courierName}</span>
                            <Link href={`/track/${o.orderId}`} target="_blank" className="text-amber-700 text-[10px] font-bold hover:underline flex items-center gap-0.5 mt-0.5">
                              <ExternalLink className="w-3 h-3" /> Live Tracking
                            </Link>
                          </div>
                        ) : (
                          <span className="text-amber-700 bg-amber-50 px-2 py-1 rounded text-[10px] font-bold border border-amber-200">
                            Pending Courier Booking
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        {!o.courierDetails ? (
                          <button
                            onClick={() => handleManualDispatch(o.orderId)}
                            disabled={bookingLoadingId === o.orderId}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg shadow-xs flex items-center gap-1"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>{bookingLoadingId === o.orderId ? 'Booking...' : 'Book Courier'}</span>
                          </button>
                        ) : (
                          <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Dispatched
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENT GATEWAY & BANK SETUP */}
      {activeTab === 'payment' && (
        <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs max-w-2xl space-y-6">
          <div className="border-b border-amber-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-600" />
              <span>Real Payment & Bank Account Setup</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Customer se paise seedha apne bank me lene ke liye option chuniye.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Payment Method Mode</label>
              <select
                value={paymentSettings.gateway}
                onChange={(e) => updatePaymentSettings({ gateway: e.target.value as any })}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg font-bold text-xs"
              >
                <option value="MANUAL_UPI">1. Direct UPI QR Code (Direct Aapke Bank Account Me - 0% Charges)</option>
                <option value="RAZORPAY">2. Razorpay Gateway (Cards, NetBanking & UPI Auto-Settlement)</option>
                <option value="TEST_MODE">3. Demo / Test Simulation Mode</option>
              </select>
            </div>

            {paymentSettings.gateway === 'MANUAL_UPI' && (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <QrCode className="w-4 h-4 text-amber-700" />
                  <span>Direct UPI Details (GPay / PhonePe / Paytm seedha aapke account me):</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Aapki Real UPI ID (e.g. 9045124626@paytm ya yourname@okhdfcbank)</label>
                  <input
                    type="text"
                    placeholder="e.g. 9045124626@paytm"
                    value={paymentSettings.upiId}
                    onChange={(e) => updatePaymentSettings({ upiId: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Aapka Name / Business Name (UPI me jo dikhega)</label>
                  <input
                    type="text"
                    placeholder="e.g. Ishka Crafts"
                    value={paymentSettings.upiName}
                    onChange={(e) => updatePaymentSettings({ upiName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            )}

            {paymentSettings.gateway === 'RAZORPAY' && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Razorpay Live Keys:</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Razorpay Key ID</label>
                  <input
                    type="text"
                    placeholder="rzp_live_xxxxxxxxxxxx"
                    value={paymentSettings.razorpayKeyId}
                    onChange={(e) => updatePaymentSettings({ razorpayKeyId: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Razorpay Key Secret</label>
                  <input
                    type="password"
                    placeholder="Key Secret"
                    value={paymentSettings.razorpayKeySecret}
                    onChange={(e) => updatePaymentSettings({ razorpayKeySecret: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg font-mono text-xs"
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setToastMsg('💾 Payment Settings Save Ho Gayi!');
                setTimeout(() => setToastMsg(null), 3000);
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
            >
              Save Payment Settings
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: SHIPROCKET COURIER API */}
      {activeTab === 'shiprocket' && (
        <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs max-w-2xl space-y-6">
          <div className="border-b border-amber-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-600" />
              <span>Shiprocket Real Courier API Integration</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Order aane par Shiprocket ke delivery boy ko automated parcel pickup bhejne ke liye.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 bg-amber-50/60 rounded-xl border border-amber-200">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Automated Booking on Payment</h4>
                <p className="text-slate-500">Payment aate hi automatic AWB number aur courier assign karein</p>
              </div>
              <button
                onClick={() => updateShiprocketSettings({ autoBooking: !shiprocketSettings.autoBooking })}
                className="text-amber-700 hover:scale-105 transition-transform"
              >
                {shiprocketSettings.autoBooking ? (
                  <ToggleRight className="w-10 h-10 text-emerald-600" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-slate-400" />
                )}
              </button>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Shiprocket API Token</label>
              <input
                type="password"
                placeholder="Shiprocket Dashboard -> API -> Token"
                value={shiprocketSettings.apiToken}
                onChange={(e) => updateShiprocketSettings({ apiToken: e.target.value })}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Aapka Warehouse / Dukan Ka Pickup Pincode</label>
              <input
                type="text"
                placeholder="e.g. 110001 ya 281121"
                value={shiprocketSettings.pickupPincode}
                onChange={(e) => updateShiprocketSettings({ pickupPincode: e.target.value })}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg text-xs font-bold"
              />
            </div>

            <button
              onClick={() => {
                setToastMsg('🚚 Shiprocket Settings Saved!');
                setTimeout(() => setToastMsg(null), 3000);
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
            >
              Save Shiprocket Settings
            </button>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 border-2 border-amber-400 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 font-serif">Naya Product List Karein</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Ka Naam (English) *</label>
                <input
                  type="text"
                  placeholder="e.g. Laddu Gopal Silk Zari Poshak"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hindi Naam (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. रेशमी जरी लड्डू गोपाल पोशाक"
                  value={newProduct.hindiName}
                  onChange={(e) => setNewProduct({ ...newProduct, hindiName: e.target.value })}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as CategoryType })}
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg text-xs"
                  >
                    <option value="kanha-poshak">Kanha Ji Poshak</option>
                    <option value="kanha-shringar">Kanha Ji Shringar</option>
                    <option value="festival-decor">Festival Decor</option>
                    <option value="puja-essentials">Puja Essentials</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    value={newProduct.defaultPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, defaultPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg text-xs font-bold"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <label className="block font-bold text-slate-800">Product Ki Photo (Gallery/Camera se chunein)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                />
                {newProduct.images?.[0] && (
                  <div className="flex items-center gap-3 pt-1">
                    <img src={newProduct.images[0]} alt="preview" className="w-12 h-12 object-cover rounded-lg border border-amber-300 shadow-xs" />
                    <span className="text-[11px] text-emerald-700 font-bold">✓ Photo Uploaded</span>
                  </div>
                )}
              </div>

              {/* Courier Specs */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-800 flex items-center gap-1">
                  <Box className="w-3.5 h-3.5 text-amber-700" />
                  Courier Weight & Box Specs
                </h5>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-slate-600">Weight (g)</label>
                    <input
                      type="number"
                      value={newProduct.weightGrams}
                      onChange={(e) => setNewProduct({ ...newProduct, weightGrams: Number(e.target.value) })}
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600">Length (cm)</label>
                    <input
                      type="number"
                      value={newProduct.lengthCm}
                      onChange={(e) => setNewProduct({ ...newProduct, lengthCm: Number(e.target.value) })}
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600">Width (cm)</label>
                    <input
                      type="number"
                      value={newProduct.widthCm}
                      onChange={(e) => setNewProduct({ ...newProduct, widthCm: Number(e.target.value) })}
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600">Height (cm)</label>
                    <input
                      type="number"
                      value={newProduct.heightCm}
                      onChange={(e) => setNewProduct({ ...newProduct, heightCm: Number(e.target.value) })}
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Jaise: Pure silk handmade poshak..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md text-xs"
              >
                Publish Karein (Dukan Me Daalein)
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
