import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<UserRole, User> = {
  admin: {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'admin@hms.com',
    role: 'admin',
    department: 'Administration',
  },
  doctor: {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'doctor@hms.com',
    role: 'doctor',
    department: 'Cardiology',
  },
  pharmacist: {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'pharmacy@hms.com',
    role: 'pharmacist',
    department: 'Pharmacy',
  },
  lab_technician: {
    id: '4',
    name: 'James Wilson',
    email: 'lab@hms.com',
    role: 'lab_technician',
    department: 'Laboratory',
  },
  receptionist: {
    id: '5',
    name: 'Lisa Thompson',
    email: 'reception@hms.com',
    role: 'receptionist',
    department: 'Front Desk',
  },
  accountant: {
    id: '6',
    name: 'Robert Davis',
    email: 'accounts@hms.com',
    role: 'accountant',
    department: 'Finance',
  },
  hr: {
    id: '7',
    name: 'Amanda Foster',
    email: 'hr@hms.com',
    role: 'hr',
    department: 'Human Resources',
  },
  nurse: {
    id: '8',
    name: 'Rachel Green',
    email: 'nurse@hms.com',
    role: 'nurse',
    department: 'Nursing',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers[role];
    if (user) {
      setAuthState({
        user,
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
