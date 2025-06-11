import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserType } from '../types';

interface AuthContextType {
  user: User | null;
  login: (phone: string, userType: UserType) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('kazameza_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          createdAt: new Date(parsedUser.createdAt)
        });
      } catch (error) {
        localStorage.removeItem('kazameza_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, userType: UserType): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: userType === 'merchant' ? 'محمد أحمد' : 
            userType === 'marketer' ? 'فاطمة علي' : 'أحمد محمود',
      phone,
      userType,
      createdAt: new Date(),
    };

    setUser(newUser);
    localStorage.setItem('kazameza_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kazameza_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};