import type {
  CompanyDetails,
  UserTableData,
  OccupationTableData,
  PayRequestTableData,
  PayRequestDetails,
  PayRequestStats,
  ApiResponse,
  ApiResponse,
  Company,
} from '../types';

// Mock Companies Data
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    active: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    name: 'BuildRight Construction',
    active: true,
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: '3',
    name: 'HealthFirst Medical',
    active: true,
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: '4',
    name: 'EduTech Academy',
    active: false,
    createdAt: new Date('2023-06-05'),
    updatedAt: new Date('2023-12-15'),
  },
];

// Mock Occupations Data
export const mockOccupations: OccupationTableData[] = [
  {
    id: '1',
    name: 'Software Engineer',
    companyId: '1',
    baseWage: 5000,
    description: 'Full-stack software development',
    userCount: 1,
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20'),
  },
  {
    id: '2',
    name: 'Project Manager',
    companyId: '1',
    baseWage: 6000,
    description: 'Project coordination and management',
    userCount: 1,
    createdAt: new Date('2023-01-21'),
    updatedAt: new Date('2023-01-21'),
  },
  {
    id: '3',
    name: 'Construction Worker',
    companyId: '2',
    baseWage: 3500,
    description: 'General construction tasks',
    userCount: 1,
    createdAt: new Date('2023-03-25'),
    updatedAt: new Date('2023-03-25'),
  },
  {
    id: '4',
    name: 'Site Supervisor',
    companyId: '2',
    baseWage: 4500,
    description: 'Construction site supervision',
    userCount: 0,
    createdAt: new Date('2023-03-26'),
    updatedAt: new Date('2023-03-26'),
  },
  {
    id: '5',
    name: 'Nurse',
    companyId: '3',
    baseWage: 4000,
    description: 'Patient care and medical assistance',
    userCount: 1,
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    id: '6',
    name: 'Doctor',
    companyId: '3',
    baseWage: 8000,
    description: 'Medical diagnosis and treatment',
    userCount: 0,
    createdAt: new Date('2023-02-16'),
    updatedAt: new Date('2023-02-16'),
  },
];

// Mock Users Data
export const mockUsers: UserTableData[] = [
  {
    id: '1',
    name: 'John',
    surname: 'Doe',
    identificationNumber: '123456789',
    email: 'john.doe@techcorp.com',
    role: 'worker',
    companyId: '1',
    occupations: ['1'],
    occupationNames: ['Software Engineer'],
    monthlyWage: 5000,
    payrollDate: 15,
    createdAt: new Date('2023-01-25'),
    updatedAt: new Date('2023-01-25'),
  },
  {
    id: '2',
    name: 'Jane',
    surname: 'Smith',
    identificationNumber: '987654321',
    email: 'jane.smith@techcorp.com',
    role: 'worker',
    companyId: '1',
    occupations: ['2'],
    occupationNames: ['Project Manager'],
    monthlyWage: 6000,
    payrollDate: 15,
    createdAt: new Date('2023-01-26'),
    updatedAt: new Date('2023-01-26'),
  },
  {
    id: '3',
    name: 'Mike',
    surname: 'Johnson',
    identificationNumber: '456789123',
    email: 'mike.johnson@buildright.com',
    role: 'worker',
    companyId: '2',
    occupations: ['3'],
    occupationNames: ['Construction Worker'],
    monthlyWage: 3500,
    payrollDate: 30,
    createdAt: new Date('2023-03-30'),
    updatedAt: new Date('2023-03-30'),
  },
  {
    id: '4',
    name: 'Sarah',
    surname: 'Wilson',
    identificationNumber: '789123456',
    email: 'sarah.wilson@healthfirst.com',
    role: 'worker',
    companyId: '3',
    occupations: ['5'],
    occupationNames: ['Nurse'],
    monthlyWage: 4000,
    payrollDate: 15,
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-02-20'),
  },
];

// Mock Payment Requests Data
export const mockPaymentRequests: PayRequestTableData[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John',
    userSurname: 'Doe',
    userEmail: 'john.doe@techcorp.com',
    companyName: 'TechCorp Solutions',
    occupationNames: ['Software Engineer'],
    requestDate: new Date('2024-01-15'),
    amount: 2500.0,
    status: 'pending',
    hoursWorked: 40,
    wageAccumulated: 2500.0,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane',
    userSurname: 'Smith',
    userEmail: 'jane.smith@techcorp.com',
    companyName: 'TechCorp Solutions',
    occupationNames: ['Project Manager'],
    requestDate: new Date('2024-01-12'),
    amount: 3000.0,
    status: 'approved',
    hoursWorked: 45,
    wageAccumulated: 3000.0,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-13'),
  },
  {
    id: '3',
    userId: '3',
    userName: 'Mike',
    userSurname: 'Johnson',
    userEmail: 'mike.johnson@buildright.com',
    companyName: 'BuildRight Construction',
    occupationNames: ['Construction Worker'],
    requestDate: new Date('2024-01-10'),
    amount: 1800.0,
    status: 'denied',
    hoursWorked: 35,
    wageAccumulated: 1800.0,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-11'),
  },
  {
    id: '4',
    userId: '4',
    userName: 'Sarah',
    userSurname: 'Wilson',
    userEmail: 'sarah.wilson@healthfirst.com',
    companyName: 'HealthFirst Medical',
    occupationNames: ['Nurse'],
    requestDate: new Date('2024-01-08'),
    amount: 2200.0,
    status: 'pending',
    hoursWorked: 38,
    wageAccumulated: 2200.0,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
];

// Mock Payment Request Details
export const mockPaymentRequestDetails: Record<string, PayRequestDetails> = {
  '1': {
    id: '1',
    userId: '1',
    company: {
      id: '1',
      name: 'TechCorp Solutions',
    },
    requestDate: new Date('2024-01-15'),
    amount: 2500.0,
    status: 'pending',
    hoursWorked: 40,
    wageAccumulated: 2500.0,
    notes: 'Regular weekly payment request',
    user: {
      id: '1',
      name: 'John',
      surname: 'Doe',
      identificationNumber: '123456789',
      email: 'john.doe@techcorp.com',
      monthlyWage: 5000,
      payrollDate: 15,
    },

    occupations: [
      {
        id: '1',
        name: 'Software Engineer',
        baseWage: 5000,
      },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
};

// Mock Statistics
export const mockPaymentStats: PayRequestStats = {
  totalRequests: 4,
  pendingRequests: 2,
  approvedRequests: 1,
  deniedRequests: 1,
  totalAmountRequested: 9500.0,
  totalAmountApproved: 3000.0,
  avgRequestAmount: 2375.0,
};

// Utility function to simulate API delays
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API Response Helpers
export const createMockResponse = <T>(data: T, success: boolean = true, message?: string): ApiResponse<T> => ({
  success,
  data,
  message: message || (success ? 'Success' : 'Error'),
});

export const createMockListResponse = <T>(
  data: T[],
  page: number = 1,
  limit: number = 10,
  total?: number,
): ApiResponse<T> => ({
  content: data,
  pageable: {
    pageNumber: page,
    pageSize: limit,
    sort: {
      empty: false,
      unsorted: false,
      sorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: false,
  totalElements: total || data.length,
  totalPages: Math.ceil((total || data.length) / limit),
  first: page === 1,
  size: limit,
  number: page,
  sort: {
    empty: false,
    unsorted: false,
    sorted: true,
  },
  numberOfElements: data.length,
  empty: false,
});

// Mock Data Service Functions
export const mockDataService = {
  // Companies
  async getCompanies(params: any = {}): Promise<ApiResponse<Company>> {
    await delay(500);

    let filteredCompanies = [...mockCompanies];

    if (params.search) {
      filteredCompanies = filteredCompanies.filter(
        (company) =>
          company.name.toLowerCase().includes(params.search.toLowerCase()) ||
          company.active.toString().includes(params.search.toLowerCase()),
      );
    }

    if (params.status && params.status !== 'all') {
      filteredCompanies = filteredCompanies.filter((company) => company.active === params.status);
    }

    if (params.sortBy) {
      filteredCompanies.sort((a, b) => {
        const aValue = a[params.sortBy as keyof Company];
        const bValue = b[params.sortBy as keyof Company];

        if (aValue === undefined || bValue === undefined) {
          return 0;
        }

        if (params.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filteredCompanies.slice(startIndex, endIndex);

    return createMockListResponse(paginatedData, page, limit, filteredCompanies.length);
  },

  async getCompany(id: string): Promise<ApiResponse<CompanyDetails>> {
    await delay(300);

    const company = mockCompanies.find((c) => c.id === id);
    if (!company) {
      return createMockResponse(null as any, false, 'Company not found');
    }

    const companyDetails: CompanyDetails = {
      ...company,
      employees: mockUsers.filter((u) => u.companyId === id),
      occupations: mockOccupations.filter((o) => o.companyId === id),
      employeeCount: mockUsers.filter((u) => u.companyId === id).length,
      occupationCount: mockOccupations.filter((o) => o.companyId === id).length,
      status: company.active ? 'active' : 'inactive',
    };

    return createMockResponse(companyDetails);
  },

  async createCompany(data: any): Promise<ApiResponse<Company>> {
    await delay(800);

    const newCompany: Company = {
      id: Date.now().toString(),
      name: data.name,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockCompanies.push(newCompany);
    return createMockResponse(newCompany);
  },

  async updateCompany(id: string, data: any): Promise<ApiResponse<Company>> {
    await delay(600);

    const companyIndex = mockCompanies.findIndex((c) => c.id === id);
    if (companyIndex === -1) {
      return createMockResponse(null as any, false, 'Company not found');
    }

    mockCompanies[companyIndex] = {
      ...mockCompanies[companyIndex],
      ...data,
      updatedAt: new Date(),
    };

    return createMockResponse(mockCompanies[companyIndex]);
  },

  async deleteCompany(id: string): Promise<ApiResponse<void>> {
    await delay(400);

    const companyIndex = mockCompanies.findIndex((c) => c.id === id);
    if (companyIndex === -1) {
      return createMockResponse(null as any, false, 'Company not found');
    }

    mockCompanies.splice(companyIndex, 1);
    return createMockResponse(undefined as any);
  },

  // Payment Requests
  async getPaymentRequests(params: any = {}): Promise<ApiResponse<PayRequestTableData>> {
    await delay(500);

    let filteredRequests = [...mockPaymentRequests];

    if (params.search) {
      filteredRequests = filteredRequests.filter(
        (req) =>
          req.userName.toLowerCase().includes(params.search.toLowerCase()) ||
          req.companyName.toLowerCase().includes(params.search.toLowerCase()),
      );
    }

    if (params.status && params.status !== 'all') {
      filteredRequests = filteredRequests.filter((req) => req.status === params.status);
    }

    if (params.companyId) {
      filteredRequests = filteredRequests.filter((req) => req.companyName === params.companyId);
    }

    if (params.userId) {
      filteredRequests = filteredRequests.filter((req) => req.userId === params.userId);
    }

    if (params.sortBy) {
      filteredRequests.sort((a, b) => {
        const aValue = a[params.sortBy as keyof PayRequestTableData];
        const bValue = b[params.sortBy as keyof PayRequestTableData];
        if (aValue === undefined || bValue === undefined) {
          return 0;
        }

        if (params.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filteredRequests.slice(startIndex, endIndex);

    return createMockListResponse(paginatedData, page, limit, filteredRequests.length);
  },

  async getPaymentRequest(id: string): Promise<ApiResponse<PayRequestDetails>> {
    await delay(300);

    const requestDetails = mockPaymentRequestDetails[id];
    if (!requestDetails) {
      return createMockResponse(null as any, false, 'Payment request not found');
    }

    return createMockResponse(requestDetails);
  },

  async updatePaymentRequestStatus(id: string, status: string): Promise<ApiResponse<PayRequestTableData>> {
    await delay(600);

    const requestIndex = mockPaymentRequests.findIndex((r) => r.id === id);
    if (requestIndex === -1) {
      return createMockResponse(null as any, false, 'Payment request not found');
    }

    mockPaymentRequests[requestIndex] = {
      ...mockPaymentRequests[requestIndex],
      status: status as any,
      updatedAt: new Date(),
    };

    return createMockResponse(mockPaymentRequests[requestIndex]);
  },

  async getPaymentStats(): Promise<ApiResponse<PayRequestStats>> {
    await delay(400);
    return createMockResponse(mockPaymentStats);
  },

  // Users
  async getUsers(companyId: string, params: any = {}): Promise<ApiResponse<UserTableData>> {
    await delay(500);

    let filteredUsers = mockUsers.filter((u) => u.companyId === companyId);

    if (params.search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(params.search.toLowerCase()) ||
          user.surname.toLowerCase().includes(params.search.toLowerCase()) ||
          user.email.toLowerCase().includes(params.search.toLowerCase()),
      );
    }

    if (params.occupation) {
      filteredUsers = filteredUsers.filter((user) => user.occupations?.includes(params.occupation));
    }

    if (params.sortBy) {
      filteredUsers.sort((a, b) => {
        const aValue = a[params.sortBy as keyof UserTableData];
        const bValue = b[params.sortBy as keyof UserTableData];

        if (params.sortOrder === 'desc') {
          return bValue && aValue ? (bValue > aValue ? 1 : -1) : 0;
        }
        return aValue && bValue ? (aValue > bValue ? 1 : -1) : 0;
      });
    }

    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filteredUsers.slice(startIndex, endIndex);

    return createMockListResponse(paginatedData, page, limit, filteredUsers.length);
  },

  async getUser(companyId: string, userId: string): Promise<ApiResponse<UserTableData>> {
    await delay(300);

    const user = mockUsers.find((u) => u.id === userId && u.companyId === companyId);
    if (!user) {
      return createMockResponse(null as any, false, 'User not found');
    }

    return createMockResponse(user);
  },

  async createUser(companyId: string, data: any): Promise<ApiResponse<UserTableData>> {
    await delay(800);

    const occupationNames = data.occupations.map((occId: string) => {
      const occupation = mockOccupations.find((o) => o.id === occId);
      return occupation ? occupation.name : 'Unknown';
    });

    const newUser: UserTableData = {
      id: Date.now().toString(),
      name: data.name,
      surname: data.surname,
      identificationNumber: data.identificationNumber,
      email: data.email,
      companyId,
      occupations: data.occupations,
      occupationNames,
      role: 'worker',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUsers.push(newUser);
    return createMockResponse(newUser);
  },

  async updateUser(companyId: string, userId: string, data: any): Promise<ApiResponse<UserTableData>> {
    await delay(600);

    const userIndex = mockUsers.findIndex((u) => u.id === userId && u.companyId === companyId);
    if (userIndex === -1) {
      return createMockResponse(null as any, false, 'User not found');
    }

    const occupationNames =
      data.occupations?.map((occId: string) => {
        const occupation = mockOccupations.find((o) => o.id === occId);
        return occupation ? occupation.name : 'Unknown';
      }) || mockUsers[userIndex].occupationNames;

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...data,
      occupationNames,
      updatedAt: new Date(),
    };

    return createMockResponse(mockUsers[userIndex]);
  },

  async deleteUser(companyId: string, userId: string): Promise<ApiResponse<void>> {
    await delay(400);

    const userIndex = mockUsers.findIndex((u) => u.id === userId && u.companyId === companyId);
    if (userIndex === -1) {
      return createMockResponse(null as any, false, 'User not found');
    }

    mockUsers.splice(userIndex, 1);
    return createMockResponse(undefined as any);
  },

  // Occupations
  async getOccupations(companyId: string, params: any = {}): Promise<ApiResponse<OccupationTableData>> {
    await delay(500);

    let filteredOccupations = mockOccupations.filter((o) => o.companyId === companyId);

    if (params.search) {
      filteredOccupations = filteredOccupations.filter((occupation) =>
        occupation.name.toLowerCase().includes(params.search.toLowerCase()),
      );
    }

    if (params.sortBy) {
      filteredOccupations.sort((a, b) => {
        const aValue = a[params.sortBy as keyof OccupationTableData];
        const bValue = b[params.sortBy as keyof OccupationTableData];

        if (params.sortOrder === 'desc') {
          return bValue && aValue ? (bValue > aValue ? 1 : -1) : 0;
        }
        return aValue && bValue ? (aValue > bValue ? 1 : -1) : 0;
      });
    }

    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filteredOccupations.slice(startIndex, endIndex);

    return createMockListResponse(paginatedData, page, limit, filteredOccupations.length);
  },

  async getOccupation(companyId: string, occupationId: string): Promise<ApiResponse<OccupationTableData>> {
    await delay(300);

    const occupation = mockOccupations.find((o) => o.id === occupationId && o.companyId === companyId);
    if (!occupation) {
      return createMockResponse(null as any, false, 'Occupation not found');
    }

    return createMockResponse(occupation);
  },

  async createOccupation(companyId: string, data: any): Promise<ApiResponse<OccupationTableData>> {
    await delay(800);

    const newOccupation: OccupationTableData = {
      id: Date.now().toString(),
      name: data.name,
      companyId,
      baseWage: 0,
      userCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockOccupations.push(newOccupation);
    return createMockResponse(newOccupation);
  },

  async updateOccupation(
    companyId: string,
    occupationId: string,
    data: any,
  ): Promise<ApiResponse<OccupationTableData>> {
    await delay(600);

    const occupationIndex = mockOccupations.findIndex((o) => o.id === occupationId && o.companyId === companyId);
    if (occupationIndex === -1) {
      return createMockResponse(null as any, false, 'Occupation not found');
    }

    mockOccupations[occupationIndex] = {
      ...mockOccupations[occupationIndex],
      ...data,
      updatedAt: new Date(),
    };

    return createMockResponse(mockOccupations[occupationIndex]);
  },

  async deleteOccupation(companyId: string, occupationId: string): Promise<ApiResponse<void>> {
    await delay(400);

    const occupationIndex = mockOccupations.findIndex((o) => o.id === occupationId && o.companyId === companyId);
    if (occupationIndex === -1) {
      return createMockResponse(null as any, false, 'Occupation not found');
    }

    mockOccupations.splice(occupationIndex, 1);
    return createMockResponse(undefined as any);
  },
};
