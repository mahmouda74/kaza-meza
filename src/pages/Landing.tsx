import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  Users, 
  Truck, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const Landing: React.FC = () => {
  const features = [
    {
      icon: Store,
      title: 'للتجار',
      description: 'أنشئ متجرك الإلكتروني وأضف منتجاتك بسهولة',
      benefits: ['إدارة المنتجات', 'تتبع المبيعات', 'تقارير مفصلة']
    },
    {
      icon: Users,
      title: 'للمسوقين',
      description: 'اربح عمولة من كل عملية بيع تتم من خلالك',
      benefits: ['عمولات مجزية', 'أدوات تسويق', 'دعم مستمر']
    },
    {
      icon: Truck,
      title: 'لمندوبي التوصيل',
      description: 'احصل على طلبات توصيل في منطقتك',
      benefits: ['مرونة في العمل', 'أجر عادل', 'تطبيق سهل']
    }
  ];

  const stats = [
    { number: '1000+', label: 'تاجر نشط' },
    { number: '5000+', label: 'مسوق' },
    { number: '500+', label: 'مندوب توصيل' },
    { number: '50000+', label: 'طلب مكتمل' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              منصة <span className="text-emerald-600">كزاميزا</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              نربط بين التجار والمسوقين ومندوبي التوصيل لتوفير تجربة تسوق متميزة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                ابدأ الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                اعرف المزيد
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              منصة شاملة لجميع الأطراف
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              نوفر حلول متكاملة للتجار والمسوقين ومندوبي التوصيل
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-emerald-500 ml-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              لماذا تختار كزاميزا؟
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                أمان وموثوقية
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                نضمن حماية بياناتك وأموالك مع أعلى معايير الأمان
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                سرعة في التوصيل
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                شبكة واسعة من مندوبي التوصيل لضمان وصول طلباتك بسرعة
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                نمو مستمر
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                أدوات وتقارير تساعدك على تنمية أعمالك وزيادة أرباحك
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            جاهز للبدء؟
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف التجار والمسوقين ومندوبي التوصيل واكسب المال معنا
          </p>
          <Link
            to="/login"
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
          >
            سجل الآن مجاناً
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;