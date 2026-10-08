export type CategoryType = 
  | 'kanha-poshak'
  | 'kanha-shringar'
  | 'festival-decor'
  | 'puja-essentials';

export interface SizeVariant {
  size: string; // e.g., '0 No.', '1 No.', '2 No.', '3 No.', '4 No.', '5 No.', '6 No.', 'Standard'
  price: number;
  mrp: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: CategoryType;
  categoryName: string;
  description: string;
  images: string[];
  featured?: boolean;
  bestseller?: boolean;
  rating: number;
  reviewCount: number;
  weightGrams: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  hasSizeVariants: boolean;
  defaultPrice: number;
  defaultMrp: number;
  variants?: SizeVariant[];
  fabric?: string;
  careInstructions?: string;
}

export interface CartItem {
  id: string; // productId + size
  productId: string;
  product: Product;
  selectedSize: string;
  price: number;
  mrp: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export type PaymentMethod = 'UPI' | 'CARD' | 'NETBANKING' | 'COD';
export type OrderStatus = 'PAYMENT_PENDING' | 'PAID' | 'COURIER_BOOKED' | 'DISPATCHED' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface TrackingEvent {
  time: string;
  status: string;
  location: string;
  description: string;
}

export interface CourierDetails {
  partner: 'Shiprocket' | 'Delhivery' | 'ExpressLogistics';
  awbNumber: string;
  courierName: string;
  bookingTime: string;
  estimatedDeliveryDate: string;
  trackingUrl: string;
  pickupScheduled: boolean;
  history: TrackingEvent[];
}

export interface Order {
  orderId: string;
  customer: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  paymentId?: string;
  orderStatus: OrderStatus;
  orderDate: string;
  totalWeightGrams: number;
  courierDetails?: CourierDetails;
  notes?: string;
}

export interface ShiprocketSettings {
  autoBooking: boolean;
  apiToken: string;
  pickupPincode: string;
  defaultCourier: string;
  testMode: boolean;
}
