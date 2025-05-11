import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

export type UserRole = 'student' | 'instructor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`https://localhost:7130/api/Users/login`, {
        email,
        password
      });

      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);

      if (userData.role.toLowerCase() !== role) {
        setError('Incorrect role selected');
        return false;
      }

      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role.toLowerCase()
      });

      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
  name: string,
  email: string,
  password: string,
  _role: UserRole
): Promise<boolean> => {
  setIsLoading(true);
  setError(null);

  try {
    const payload = {
      userId: crypto.randomUUID(),
      name,
      email,
      passwordHash: password,
      role: "INSTRUCTOR"
    };

    const response = await axios.post(`https://localhost:7130/api/Users/signup`, payload);
    const { token, user: userData } = response.data;

    localStorage.setItem('token', token);

    // Ensure role is lowercase and matches expected types
    const userRole = userData.role.toLowerCase() as UserRole;

    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userRole
    });

    return true;
  } catch (err: any) {
    setError(err.response?.data?.message || err.response?.data || 'Signup failed');
    return false;
  } finally {
    setIsLoading(false);
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
