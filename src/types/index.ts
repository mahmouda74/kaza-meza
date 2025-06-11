export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  userType: UserType;
  createdAt: Date;
  avatar?: string;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  merchantId: string;
  merchantName: string;
  logo?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  images: string[];
  storeId: string;
  storeName: string;
  merchantId: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Order {
  id: string;
  products: OrderItem[];
  customer: Customer;
  totalAmount: number;
  commission: number;
  marketerId?: string;
  marketerName?: string;
  deliveryRepId?: string;
  deliveryRepName?: string;
  status: OrderStatus;
  pickupLocation: string;
  deliveryLocation: string;
  deliveryCost: number;
  paymentMethod: 'COD';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  storeId: string;
  storeName: string;
}

export interface Customer {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

export type UserType = 'merchant' | 'marketer' | 'delivery';

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'picked_up' 
  | 'in_transit' 
  | 'delivered' 
  | 'cancelled';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
}