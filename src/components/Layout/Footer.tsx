import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <Store className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold">كزاميزا</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              منصة التجارة الإلكترونية الرائدة في مصر. نربط بين التجار والمسوقين ومندوبي التوصيل 
              لتوفير تجربة تسوق متميزة وخدمة توصيل سريعة وموثوقة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  تسجيل الدخول
                </Link>
              </li>
              <li>
                <a href="#features" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  المميزات
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  من نحن
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">+20 100 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">info@kazameza.com</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">القاهرة، مصر</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 كزاميزا. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;