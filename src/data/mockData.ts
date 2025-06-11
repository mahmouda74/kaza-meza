import { Product, Store, Order } from '../types';

export const mockStores: Store[] = [
  {
    id: 'store_1',
    name: 'متجر الإلكترونيات',
    description: 'متجر متخصص في بيع الأجهزة الإلكترونية والهواتف الذكية',
    merchantId: 'merchant_1',
    merchantName: 'محمد أحمد',
    isActive: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'store_2',
    name: 'متجر الأزياء العصرية',
    description: 'أحدث صيحات الموضة والأزياء النسائية والرجالية',
    merchantId: 'merchant_2',
    merchantName: 'سارة محمود',
    isActive: true,
    createdAt: new Date('2024-02-01'),
  },
];

export const mockProducts: Product[] = [
  {
    id: 'product_1',
    name: 'آيفون 15 برو',
    description: 'آيفون 15 برو بذاكرة 256 جيجا، لون تيتانيوم طبيعي',
    price: 45000,
    quantity: 15,
    category: 'هواتف ذكية',
    images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
    storeId: 'store_1',
    storeName: 'متجر الإلكترونيات',
    merchantId: 'merchant_1',
    isActive: true,
    createdAt: new Date('2024-03-01'),
  },
  {
    id: 'product_2',
    name: 'سامسونج جالاكسي S24',
    description: 'سامسونج جالاكسي S24 بذاكرة 512 جيجا، لون أسود',
    price: 35000,
    quantity: 8,
    category: 'هواتف ذكية',
    images: ['https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg'],
    storeId: 'store_1',
    storeName: 'متجر الإلكترونيات',
    merchantId: 'merchant_1',
    isActive: true,
    createdAt: new Date('2024-03-05'),
  },
  {
    id: 'product_3',
    name: 'قميص رجالي كلاسيكي',
    description: 'قميص رجالي قطني كلاسيكي، متوفر بعدة ألوان',
    price: 450,
    quantity: 25,
    category: 'ملابس رجالية',
    images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'],
    storeId: 'store_2',
    storeName: 'متجر الأزياء العصرية',
    merchantId: 'merchant_2',
    isActive: true,
    createdAt: new Date('2024-03-10'),
  },
];

export const mockOrders: Order[] = [
  {
    id: 'order_1',
    products: [
      {
        productId: 'product_1',
        productName: 'آيفون 15 برو',
        quantity: 1,
        price: 45000,
        storeId: 'store_1',
        storeName: 'متجر الإلكترونيات',
      },
    ],
    customer: {
      name: 'أحمد محمد',
      phone: '01234567890',
      address: 'شارع التحرير، وسط البلد، القاهرة',
    },
    totalAmount: 45000,
    commission: 2250,
    marketerId: 'marketer_1',
    marketerName: 'فاطمة علي',
    status: 'pending',
    pickupLocation: 'متجر الإلكترونيات - شارع فيصل، الجيزة',
    deliveryLocation: 'شارع التحرير، وسط البلد، القاهرة',
    deliveryCost: 50,
    paymentMethod: 'COD',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  },
];