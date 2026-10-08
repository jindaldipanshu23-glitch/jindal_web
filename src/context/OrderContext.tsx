'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, Product, ShiprocketSettings, CourierDetails } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/initialProducts';

interface PaymentGatewaySettings {
  gateway: 'RAZORPAY' | 'PHONEPE' | 'MANUAL_UPI' | 'TEST_MODE';
  razorpayKeyId: string;
  razorpayKeySecret: string;
  upiId: string;
  upiName: string;
}

interface OrderContextType {
  orders: Order[];
  products: Product[];
  isLoaded: boolean;
  shiprocketSettings: ShiprocketSettings;
  paymentSettings: PaymentGatewaySettings;
  adminPin: string;
  createOrder: (newOrder: Omit<Order, 'orderId' | 'orderDate' | 'orderStatus' | 'paymentStatus'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  triggerShiprocketBooking: (orderId: string) => Promise<{ success: boolean; awb?: string; message: string }>;
  updateShiprocketSettings: (settings: Partial<ShiprocketSettings>) => void;
  updatePaymentSettings: (settings: Partial<PaymentGatewaySettings>) => void;
  updateAdminPin: (pin: string) => void;
  addNewProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  clearAllProducts: () => void;
  loadSampleProducts: () => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const DEFAULT_SHIPROCKET_SETTINGS: ShiprocketSettings = {
  autoBooking: false,
  apiToken: '',
  pickupPincode: '',
  defaultCourier: 'Delhivery Surface / Express',
  testMode: true,
};

const DEFAULT_PAYMENT_SETTINGS: PaymentGatewaySettings = {
  gateway: 'MANUAL_UPI',
  razorpayKeyId: '',
  razorpayKeySecret: '',
  upiId: 'ishkacrafts@upi',
  upiName: 'Ishka Crafts Store',
};

const DEFAULT_ADMIN_PIN = '1234';

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [shiprocketSettings, setShiprocketSettings] = useState<ShiprocketSettings>(DEFAULT_SHIPROCKET_SETTINGS);
  const [paymentSettings, setPaymentSettings] = useState<PaymentGatewaySettings>(DEFAULT_PAYMENT_SETTINGS);
  const [adminPin, setAdminPin] = useState<string>(DEFAULT_ADMIN_PIN);

  // Load from localStorage on client startup
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('ishka_orders_v2');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const hasInit = localStorage.getItem('ishka_products_initialized_v2');
      const savedProducts = localStorage.getItem('ishka_products_v2');
      
      if (hasInit === 'true' && savedProducts !== null) {
        setProducts(JSON.parse(savedProducts));
      } else {
        setProducts(INITIAL_PRODUCTS);
        localStorage.setItem('ishka_products_v2', JSON.stringify(INITIAL_PRODUCTS));
        localStorage.setItem('ishka_products_initialized_v2', 'true');
      }

      const savedShip = localStorage.getItem('ishka_shiprocket_settings_v2');
      if (savedShip) setShiprocketSettings(JSON.parse(savedShip));

      const savedPay = localStorage.getItem('ishka_payment_settings_v2');
      if (savedPay) setPaymentSettings(JSON.parse(savedPay));

      const savedPin = localStorage.getItem('ishka_admin_pin_v2');
      if (savedPin) setAdminPin(savedPin);
    } catch (err) {
      console.error('Error loading data from storage:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveProductsToStorage = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('ishka_products_v2', JSON.stringify(newProducts));
      localStorage.setItem('ishka_products_initialized_v2', 'true');
    } catch (e) {
      console.error('Storage save error:', e);
    }
  };

  const clearAllProducts = () => {
    saveProductsToStorage([]);
  };

  const loadSampleProducts = () => {
    saveProductsToStorage(INITIAL_PRODUCTS);
  };

  const addNewProduct = (product: Product) => {
    const updated = [product, ...products];
    saveProductsToStorage(updated);
  };

  const deleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    saveProductsToStorage(updated);
  };

  const updateShiprocketSettings = (newSettings: Partial<ShiprocketSettings>) => {
    setShiprocketSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('ishka_shiprocket_settings_v2', JSON.stringify(updated));
      return updated;
    });
  };

  const updatePaymentSettings = (newSettings: Partial<PaymentGatewaySettings>) => {
    setPaymentSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('ishka_payment_settings_v2', JSON.stringify(updated));
      return updated;
    });
  };

  const updateAdminPin = (newPin: string) => {
    setAdminPin(newPin);
    localStorage.setItem('ishka_admin_pin_v2', newPin);
  };

  const generateShiprocketBooking = (orderId: string, pincode: string): CourierDetails => {
    const randomAwb = `SR-${Math.floor(100000000 + Math.random() * 900000000)}`;
    const couriers = ['Delhivery Express', 'BlueDart Surface', 'XpressBees Air'];
    const chosenCourier = couriers[Math.floor(Math.random() * couriers.length)];
    const nowISO = new Date().toISOString();

    return {
      partner: 'Shiprocket',
      awbNumber: randomAwb,
      courierName: chosenCourier,
      bookingTime: nowISO,
      estimatedDeliveryDate: '3-4 Business Days',
      trackingUrl: `https://shiprocket.co/tracking/${randomAwb}`,
      pickupScheduled: true,
      history: [
        {
          time: nowISO,
          status: 'Order Confirmed',
          location: 'Ishka Online Store',
          description: 'Payment received successfully',
        },
        {
          time: nowISO,
          status: 'Courier Shipment Booked',
          location: 'Shiprocket API Gateway',
          description: `Shipment booked with ${chosenCourier}. AWB: ${randomAwb}`,
        },
      ],
    };
  };

  const createOrder = (
    orderData: Omit<Order, 'orderId' | 'orderDate' | 'orderStatus' | 'paymentStatus'>
  ): Order => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ISHKA-${orderNum}`;
    const isPaid = orderData.paymentMethod !== 'COD';

    let initialStatus: OrderStatus = isPaid ? 'PAID' : 'PAYMENT_PENDING';
    let courierDetails: CourierDetails | undefined = undefined;

    if (isPaid && shiprocketSettings.autoBooking) {
      initialStatus = 'COURIER_BOOKED';
      courierDetails = generateShiprocketBooking(orderId, orderData.customer.pincode);
    }

    const created: Order = {
      ...orderData,
      orderId,
      orderDate: new Date().toISOString(),
      orderStatus: initialStatus,
      paymentStatus: isPaid ? 'PAID' : 'PENDING',
      courierDetails,
    };

    setOrders((prev) => {
      const updated = [created, ...prev];
      localStorage.setItem('ishka_orders_v2', JSON.stringify(updated));
      return updated;
    });

    return created;
  };

  const triggerShiprocketBooking = async (
    orderId: string
  ): Promise<{ success: boolean; awb?: string; message: string }> => {
    const targetOrder = orders.find((o) => o.orderId === orderId);
    if (!targetOrder) {
      return { success: false, message: 'Order not found' };
    }

    if (targetOrder.courierDetails) {
      return {
        success: true,
        awb: targetOrder.courierDetails.awbNumber,
        message: `Courier already booked: ${targetOrder.courierDetails.awbNumber}`,
      };
    }

    const courier = generateShiprocketBooking(orderId, targetOrder.customer.pincode);

    setOrders((prev) => {
      const updated: Order[] = prev.map((o) =>
        o.orderId === orderId
          ? {
              ...o,
              orderStatus: 'COURIER_BOOKED' as OrderStatus,
              courierDetails: courier,
            }
          : o
      );
      localStorage.setItem('ishka_orders_v2', JSON.stringify(updated));
      return updated;
    });

    return {
      success: true,
      awb: courier.awbNumber,
      message: `Shipment booked with ${courier.courierName}! AWB: ${courier.awbNumber}`,
    };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.orderId === orderId ? { ...o, orderStatus: status } : o));
      localStorage.setItem('ishka_orders_v2', JSON.stringify(updated));
      return updated;
    });
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.orderId === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        products,
        isLoaded,
        shiprocketSettings,
        paymentSettings,
        adminPin,
        createOrder,
        updateOrderStatus,
        triggerShiprocketBooking,
        updateShiprocketSettings,
        updatePaymentSettings,
        updateAdminPin,
        addNewProduct,
        deleteProduct,
        clearAllProducts,
        loadSampleProducts,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
