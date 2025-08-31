 import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  fullName: string;
  referralCode: string;
}

interface Wallet {
  id: number;
  mvzx: number;
  usdt: number;
}

interface AuthContextType {
  user: User | null;
  wallet: Wallet | null;
  token: string | null;
  login: (email: string, pin: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/profile`);
      setUser(response.data.data.user);
      setWallet(response.data.data.wallet);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, pin: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        pin
      });

      const { data } = response.data;
      setToken(data.token);
      setUser(data.user);
      setWallet(data.wallet);
      
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, userData);
      
      const { data } = response.data;
      setToken(data.token);
      setUser(data.user);
      
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      // Save wallet private key securely (in practice, this should be handled more securely)
      if (data.wallet.privateKey) {
        localStorage.setItem('walletPK', data.wallet.privateKey);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setWallet(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('walletPK');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    wallet,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
