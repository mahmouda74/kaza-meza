import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import MerchantDashboard from './dashboards/MerchantDashboard';
import MarketerDashboard from './dashboards/MarketerDashboard';
import DeliveryDashboard from './dashboards/DeliveryDashboard';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            يرجى تسجيل الدخول
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            تحتاج إلى تسجيل الدخول للوصول إلى لوحة التحكم
          </p>
        </div>
      </div>
    );
  }

  switch (user.userType) {
    case 'merchant':
      return <MerchantDashboard />;
    case 'marketer':
      return <MarketerDashboard />;
    case 'delivery':
      return <DeliveryDashboard />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              نوع حساب غير صحيح
            </h2>
          </div>
        </div>
      );
  }
};

export default Dashboard;