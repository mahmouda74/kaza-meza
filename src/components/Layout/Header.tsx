import React from 'react';
import { Link } from 'react-router-dom';
import { User, Moon, Sun, Bell, LogOut, Store } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <Store className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              كزاميزا
            </span>
          </Link>

          {/* Navigation & Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {user ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {/* User Menu */}
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.userType === 'merchant' ? 'تاجر' : 
                         user.userType === 'marketer' ? 'مسوق' : 'مندوب توصيل'}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  
                  <button
                    onClick={logout}
                    className="p-2 text-red-600 hover:text-red-700 transition-colors"
                    title="تسجيل الخروج"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <Link
                  to="/login"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  تسجيل الدخول
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;