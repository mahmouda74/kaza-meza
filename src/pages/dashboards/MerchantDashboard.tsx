import React, { useState } from 'react';
import { 
  Package, 
  Store, 
  TrendingUp, 
  DollarSign,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from '../../components/UI/StatCard';
import { mockProducts, mockStores } from '../../data/mockData';
import { Product } from '../../types';

const MerchantDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'stores'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products for current merchant
  const merchantProducts = mockProducts.filter(product => product.merchantId === user?.id);
  const merchantStores = mockStores.filter(store => store.merchantId === user?.id);

  const filteredProducts = merchantProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = merchantProducts.reduce((sum, product) => sum + (product.price * 10), 0);
  const totalProducts = merchantProducts.length;
  const activeStores = merchantStores.filter(store => store.isActive).length;

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: TrendingUp },
    { id: 'products', label: 'المنتجات', icon: Package },
    { id: 'stores', label: 'المتاجر', icon: Store }
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
            إدارة متاجرك ومنتجاتك من مكان واحد
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
                title="إجمالي الإيرادات"
                value={`${totalRevenue.toLocaleString('ar-EG')} ج.م`}
                icon={DollarSign}
                trend={{ value: 12.5, isPositive: true }}
              />
              <StatCard
                title="عدد المنتجات"
                value={totalProducts}
                icon={Package}
                trend={{ value: 8.2, isPositive: true }}
              />
              <StatCard
                title="المتاجر النشطة"
                value={activeStores}
                icon={Store}
              />
              <StatCard
                title="الطلبات الجديدة"
                value="23"
                icon={TrendingUp}
                trend={{ value: 15.3, isPositive: true }}
              />
            </div>

            {/* Recent Products */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  المنتجات الحديثة
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {merchantProducts.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {product.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {product.price.toLocaleString('ar-EG')} ج.م
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          الكمية: {product.quantity}
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  إدارة المنتجات
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {totalProducts} منتج
                </p>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-colors">
                <Plus className="h-5 w-5" />
                <span>إضافة منتج جديد</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="البحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
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
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-emerald-600">
                        {product.price.toLocaleString('ar-EG')} ج.م
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        الكمية: {product.quantity}
                      </span>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1 space-x-reverse">
                        <Eye className="h-4 w-4" />
                        <span>عرض</span>
                      </button>
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1 space-x-reverse">
                        <Edit className="h-4 w-4" />
                        <span>تعديل</span>
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                        <Trash2 className="h-4 w-4" />
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
                  {searchTerm ? 'لم يتم العثور على منتجات تطابق البحث' : 'ابدأ بإضافة منتجك الأول'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Stores Tab */}
        {activeTab === 'stores' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  إدارة المتاجر
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {merchantStores.length} متجر
                </p>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-colors">
                <Plus className="h-5 w-5" />
                <span>إضافة متجر جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {merchantStores.map((store) => (
                <div key={store.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {store.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {store.description}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      store.isActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {store.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                      إدارة المتجر
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {merchantStores.length === 0 && (
              <div className="text-center py-12">
                <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  لا توجد متاجر
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  ابدأ بإنشاء متجرك الأول
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantDashboard;