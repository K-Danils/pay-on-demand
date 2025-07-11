// TypeScript type definitions

export interface User {
  id: string;
  name: string;
  surname: string;
  identificationNumber: string;
  email: string;
  role: 'worker' | 'admin';
  companyId?: string;
  occupation?: string;
  occupations?: string[]; // Array of occupation IDs
  monthlyWage?: number;
  payrollDate?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

export interface Occupation {
  id: string;
  name: string;
  companyId: string;
  baseWage: number;
  description?: string;
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
  hoursWorked?: number;
  wageAccumulated?: number;
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
// Company-related types
export interface CompanyFormData {
  id?: string;
  name: string;
  active?: boolean;
}

export interface CompanyFilters {
  search?: string;
  status?: 'active' | 'inactive' | 'all';
  industry?: string;
  sortBy?: 'name' | 'createdAt' | 'employeeCount';
  sortOrder?: 'asc' | 'desc';
}

export interface CompanyStats {
  totalCompanies: number;
  activeCompanies: number;
  inactiveCompanies: number;
  totalEmployees: number;
  averageEmployeesPerCompany: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

// User-related types
export interface UserFormData {
  name: string;
  surname: string;
  identificationNumber: string;
  email: string;
  occupations: string[]; // Array of occupation IDs
  monthlyWage?: number;
  payrollDate?: number;
}

export interface UserTableData extends User {
  occupationNames: string[]; // Array of occupation names for display
  companyName?: string;
}

export interface UserFilters {
  search?: string;
  companyId?: string;
  occupation?: string;
  sortBy?: 'name' | 'surname' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// Occupation-related types
export interface OccupationFormData {
  name: string;
  baseWage?: number;
  description?: string;
}

export interface OccupationTableData extends Occupation {
  userCount: number; // Number of users with this occupation
}

export interface OccupationFilters {
  search?: string;
  companyId?: string;
  sortBy?: 'name' | 'baseWage' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// Payment Request-related types
export interface PayRequestTableData extends PayRequest {
  userName: string;
  userSurname: string;
  userEmail: string;
  companyName: string;
  occupationNames: string[];
}

export interface PayRequestDetails extends PayRequest {
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
    identificationNumber: string;
    monthlyWage?: number;
    payrollDate?: number;
  };
  company: {
    id: string;
    name: string;
  };
  occupations: {
    id: string;
    name: string;
    baseWage: number;
  }[];
}

export interface PayRequestFilters {
  search?: string;
  status?: 'pending' | 'approved' | 'denied' | 'all';
  companyId?: string;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  sortBy?: 'requestDate' | 'amount' | 'status' | 'userName';
  sortOrder?: 'asc' | 'desc';
}

export interface PayRequestStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  deniedRequests: number;
  totalAmountRequested: number;
  totalAmountApproved: number;
  avgRequestAmount: number;
}

export interface PayRequestAction {
  action: 'approve' | 'deny';
  notes?: string;
  processedBy: string;
}

export interface ApiResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}
