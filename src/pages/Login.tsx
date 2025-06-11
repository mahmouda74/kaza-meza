import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, User, Store, Users, Truck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserType } from '../types';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState<UserType>('merchant');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const userTypes = [
    {
      type: 'merchant' as UserType,
      title: 'تاجر',
      description: 'أريد بيع منتجاتي',
      icon: Store
    },
    {
      type: 'marketer' as UserType,
      title: 'مسوق',
      description: 'أريد تسويق المنتجات',
      icon: Users
    },
    {
      type: 'delivery' as UserType,
      title: 'مندوب توصيل',
      description: 'أريد توصيل الطلبات',
      icon: Truck
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!phone.trim()) {
      setError('يرجى إدخال رقم الهاتف');
      return;
    }

    if (phone.length < 11) {
      setError('رقم الهاتف غير صحيح');
      return;
    }

    setIsLoading(true);
    
    try {
      await login(phone, userType);
      navigate('/dashboard');
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-6">
            <Store className="h-12 w-12 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              كزاميزا
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            مرحباً بك
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            سجل دخولك للوصول إلى لوحة التحكم
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                اختر نوع الحساب
              </label>
              <div className="grid grid-cols-1 gap-3">
                {userTypes.map((type) => (
                  <label
                    key={type.type}
                    className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      userType === type.type
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type.type}
                      checked={userType === type.type}
                      onChange={(e) => setUserType(e.target.value as UserType)}
                      className="sr-only"
                    />
                    <type.icon className={`h-6 w-6 ml-3 ${
                      userType === type.type ? 'text-emerald-600' : 'text-gray-400'
                    }`} />
                    <div className="flex-1">
                      <div className={`font-medium ${
                        userType === type.type ? 'text-emerald-900 dark:text-emerald-100' : 'text-gray-900 dark:text-white'
                      }`}>
                        {type.title}
                      </div>
                      <div className={`text-sm ${
                        userType === type.type ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {type.description}
                      </div>
                    </div>
                    {userType === type.type && (
                      <div className="w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                رقم الهاتف
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10"
                  placeholder="01xxxxxxxxx"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <User className="h-5 w-5 ml-2" />
                  تسجيل الدخول
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              لا تملك حساب؟ سيتم إنشاء حساب جديد تلقائياً
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;