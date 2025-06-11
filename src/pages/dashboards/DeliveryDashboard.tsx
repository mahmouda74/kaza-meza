import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign,
  Package,
  CheckCircle,
  Navigation,
  Phone,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from '../../components/UI/StatCard';
import { mockOrders } from '../../data/mockData';
import { Order } from '../../types';

const DeliveryDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'available' | 'my-orders'>('overview');

  // Mock data for delivery representative
  const deliveryOrders = mockOrders.filter(order => order.deliveryRepId === user?.id);
  const availableOrders = mockOrders.filter(order => !order.deliveryRepId && order.status === 'confirmed');
  
  const totalEarnings = deliveryOrders.reduce((sum, order) => sum + order.deliveryCost, 0);
  const completedOrders = deliveryOrders.filter(order => order.status === 'delivered').length;
  const todayOrders = deliveryOrders.filter(order => {
    const today = new Date();
    const orderDate = new Date(order.createdAt);
    return orderDate.toDateString() === today.toDateString();
  }).length;

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: Truck },
    { id: 'available', label: 'الطلبات المتاحة', icon: Package },
    { id: 'my-orders', label: 'طلباتي', icon: CheckCircle }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'picked_up':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'in_transit':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'confirmed':
        return 'مؤكد';
      case 'picked_up':
        return 'تم الاستلام';
      case 'in_transit':
        return 'في الطريق';
      case 'delivered':
        return 'تم التوصيل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            مرحباً، {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة طلبات التوصيل وتتبع أرباحك
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
                title="إجمالي الأرباح"
                value={`${totalEarnings.toLocaleString('ar-EG')} ج.م`}
                icon={DollarSign}
                trend={{ value: 15.3, isPositive: true }}
              />
              <StatCard
                title="الطلبات المكتملة"
                value={completedOrders}
                icon={CheckCircle}
                trend={{ value: 8.7, isPositive: true }}
              />
              <StatCard
                title="طلبات اليوم"
                value={todayOrders}
                icon={Clock}
              />
              <StatCard
                title="الطلبات المتاحة"
                value={availableOrders.length}
                icon={Package}
                trend={{ value: 12.1, isPositive: true }}
              />
            </div>

            {/* Today's Orders */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  طلبات اليوم
                </h3>
              </div>
              <div className="p-6">
                {todayOrders > 0 ? (
                  <div className="space-y-4">
                    {deliveryOrders
                      .filter(order => {
                        const today = new Date();
                        const orderDate = new Date(order.createdAt);
                        return orderDate.toDateString() === today.toDateString();
                      })
                      .map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                              <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                طلب #{order.id.slice(-6)}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {order.customer.name}
                              </p>
                            </div>
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-emerald-600">
                              {order.deliveryCost.toLocaleString('ar-EG')} ج.م
                            </p>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      لا توجد طلبات لليوم
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                الأداء الأسبوعي
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  رسم بياني للأداء الأسبوعي
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Available Orders Tab */}
        {activeTab === 'available' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                الطلبات المتاحة للتوصيل
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                اختر الطلبات التي تريد توصيلها في منطقتك
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableOrders.map((order) => (
                <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        طلب #{order.id.slice(-6)}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.products.length} منتج - {order.totalAmount.toLocaleString('ar-EG')} ج.م
                      </p>
                    </div>
                    <span className="text-lg font-bold text-emerald-600">
                      {order.deliveryCost.toLocaleString('ar-EG')} ج.م
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          من: {order.pickupLocation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <Navigation className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          إلى: {order.deliveryLocation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <User className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          العميل: {order.customer.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Phone className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white ltr">
                          {order.customer.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 space-x-reverse">
                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors">
                      قبول الطلب
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                      <MapPin className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {availableOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  لا توجد طلبات متاحة
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  لا توجد طلبات متاحة للتوصيل في الوقت الحالي
                </p>
              </div>
            )}
          </div>
        )}

        {/* My Orders Tab */}
        {activeTab === 'my-orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                طلباتي
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                تتبع حالة الطلبات التي تقوم بتوصيلها
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
                        المبلغ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        أجر التوصيل
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        التاريخ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {deliveryOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          #{order.id.slice(-6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <div>
                            <div>{order.customer.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 ltr">
                              {order.customer.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {order.totalAmount.toLocaleString('ar-EG')} ج.م
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-600">
                          {order.deliveryCost.toLocaleString('ar-EG')} ج.م
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {order.createdAt.toLocaleDateString('ar-EG')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2 space-x-reverse">
                            <button className="text-emerald-600 hover:text-emerald-900 dark:hover:text-emerald-400">
                              تحديث الحالة
                            </button>
                            <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
                              <MapPin className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {deliveryOrders.length === 0 && (
              <div className="text-center py-12">
                <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  لا توجد طلبات
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  لم تقم بقبول أي طلبات للتوصيل بعد
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;