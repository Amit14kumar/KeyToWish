import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create mock auth data
const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

// Create auth provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    // In a real app, you would check a token in localStorage or cookies
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Mock API call to validate token and get user data
      setTimeout(() => {
        setUser(MOCK_USER);
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Mock API call - in a real app, you would call your auth API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email !== 'john@example.com' || password !== 'password') {
        throw new Error('Invalid email or password');
      }
      
      // Set user and save token
      setUser(MOCK_USER);
      localStorage.setItem('auth_token', 'mock_jwt_token');
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Mock API call - in a real app, you would call your auth API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user
      const newUser: User = {
        id: '2', // In a real app, this would come from your backend
        name,
        email,
      };
      
      // Set user and save token
      setUser(newUser);
      localStorage.setItem('auth_token', 'mock_jwt_token');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  // Forgot password function
  const forgotPassword = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      // Mock API call - in a real app, you would call your auth API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Just return - in a real app, this would send a reset email
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
