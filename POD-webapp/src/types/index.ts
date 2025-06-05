// TypeScript type definitions

export interface User {
  id: string;
  email: string;
  role: 'worker' | 'admin';
  companyId?: string;
  occupation?: string;
  monthlyWage?: number;
  payrollDate?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Occupation {
  id: string;
  name: string;
  companyId: string;
  baseWage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PayRequest {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'approved' | 'denied';
  requestDate: Date;
  processedDate?: Date;
  processedBy?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
