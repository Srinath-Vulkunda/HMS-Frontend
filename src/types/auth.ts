export type UserRole = 
  | 'admin' 
  | 'doctor' 
  | 'pharmacist' 
  | 'lab_technician' 
  | 'receptionist' 
  | 'accountant'
  | 'hr'
  | 'nurse';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
