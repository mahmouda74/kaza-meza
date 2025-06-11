import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Package,
  Share2,
  Eye,
  ShoppingCart,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from '../../components/UI/StatCard';
import { mockProducts, mockOrders } from '../../data/mockData';

const MarketerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data for marketer
  const marketerOrders = mockOrders.filter(order => order.marketerId === user?.id);
  const totalCommission = marketerOrders.reduce((sum, order) => sum + order.commission, 0);
  const totalSales = marketerOrders.length;

  const categories = [...new Set(mockProducts.map(product => product.category))];
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: TrendingUp },
    { id: 'products', label: 'المنتجات', icon: Package },
    { id: 'orders', label: 'طلباتي', icon: ShoppingCart }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            مرحباً، {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            تابع أداءك التسويقي وعمولاتك
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8 space-x-reverse">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="إجمالي العمولات"
                value={`${totalCommission.toLocaleString('ar-EG')} ج.م`}
                icon={DollarSign}
                trend={{ value: 18.2, isPositive: true }}
              />
              <StatCard
                title="المبيعات المحققة"
                value={totalSales}
                icon={TrendingUp}
                trend={{ value: 12.5, isPositive: true }}
              />
              <StatCard
                title="العملاء الجدد"
                value="45"
                icon={Users}
                trend={{ value: 8.1, isPositive: true }}
              />
              <StatCard
                title="معدل التحويل"
                value="3.2%"
                icon={Package}
                trend={{ value: 2.4, isPositive: true }}
              />
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  الطلبات الأخيرة
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {marketerOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          طلب #{order.id.slice(-6)}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {order.customer.name} - {order.products.length} منتج
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-emerald-600">
                          +{order.commission.toLocaleString('ar-EG')} ج.م
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          عمولة
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  المنتجات الأكثر مبيعاً
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockProducts.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center space-x-4 space-x-reverse">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.storeName}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {product.price.toLocaleString('ar-EG')} ج.م
                        </p>
                        <p className="text-sm text-emerald-600">
                          عمولة: {(product.price * 0.05).toLocaleString('ar-EG')} ج.م
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Products Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                المنتجات المتاحة للتسويق
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                اختر المنتجات التي تريد تسويقها واحصل على عمولة من كل عملية بيع
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="البحث في المنتجات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="relative">
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">جميع الفئات</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">السعر:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {product.price.toLocaleString('ar-EG')} ج.م
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">العمولة (5%):</span>
                        <span className="font-semibold text-emerald-600">
                          {(product.price * 0.05).toLocaleString('ar-EG')} ج.م
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1 space-x-reverse">
                        <Share2 className="h-4 w-4" />
                        <span>مشاركة</span>
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  لا توجد منتجات
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  لم يتم العثور على منتجات تطابق البحث
                </p>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                طلباتي
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                تتبع الطلبات التي تم إنجازها من خلالك
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        رقم الطلب
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        العميل
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        المبلغ الإجمالي
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        العمولة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        التاريخ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {marketerOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          #{order.id.slice(-6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {order.customer.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {order.totalAmount.toLocaleString('ar-EG')} ج.م
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-600">
                          {order.commission.toLocaleString('ar-EG')} ج.م
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {order.status === 'pending' ? 'قيد الانتظار' :
                             order.status === 'confirmed' ? 'مؤكد' :
                             order.status === 'delivered' ? 'تم التوصيل' : order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {order.createdAt.toLocaleDateString('ar-EG')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {marketerOrders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  لا توجد طلبات
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  ابدأ بتسويق المنتجات لتحصل على طلبات وعمولات
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketerDashboard;