import type { Company, CompanyFormData, CompanyDetails } from '../../../../types';

export const formatCompanyStatus = (status: boolean): string => {
  return status ? 'Active' : 'Inactive';
};

export const getStatusColor = (status: boolean): string => {
  return status ? 'green' : 'red';
};

export const formatEmployeeCount = (count: number): string => {
  if (count === 0) return 'No employees';
  if (count === 1) return '1 employee';
  return `${count.toLocaleString()} employees`;
};

export const formatCompanySize = (employeeCount: number): string => {
  if (employeeCount <= 10) return 'Small';
  if (employeeCount <= 50) return 'Medium';
  if (employeeCount <= 200) return 'Large';
  return 'Enterprise';
};

export const validateCompanyData = (data: CompanyFormData): string[] => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Company name must be at least 2 characters long');
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (data.website && !/^https?:\/\/[^\s]+$/.test(data.website)) {
    errors.push('Please enter a valid website URL');
  }

  if (data.employeeCount && (data.employeeCount < 0 || data.employeeCount > 100000)) {
    errors.push('Employee count must be between 0 and 100,000');
  }

  return errors;
};

export const generateCompanyInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const formatCompanyWebsite = (website: string): string => {
  if (!website) return '';
  return website.startsWith('http') ? website : `https://${website}`;
};

export const sortCompanies = (companies: Company[], sortBy: keyof Company, sortOrder: 'asc' | 'desc'): Company[] => {
  return [...companies].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return sortOrder === 'asc' ? comparison : -comparison;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortOrder === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
    }

    return 0;
  });
};

export const filterCompanies = (
  companies: Company[],
  filters: {
    search?: string;
    status?: 'active' | 'inactive' | 'all';
    industry?: string;
  },
): Company[] => {
  return companies.filter((company) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = company.name.toLowerCase().includes(searchTerm);

      if (!matchesSearch) return false;
    }

    return true;
  });
};

export const exportCompaniesData = (companies: Company[]): string => {
  const headers = ['Name', 'Industry', 'Status', 'Employee Count', 'Created At'];
  const rows = companies.map((company) => [
    company.name,

    formatCompanyStatus(company.active),
    // company.employeeCount.toString(),
    company.createdAt.toLocaleDateString(),
  ]);

  const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

  return csvContent;
};

export const getCompanyActionItems = (company: CompanyDetails): string[] => {
  const items: string[] = [];

  if (company.employeeCount === 0) {
    items.push('Add employees to this company');
  }

  if (company.occupationCount === 0) {
    items.push('Define occupations for this company');
  }

  if (!company.email) {
    items.push('Add contact email');
  }

  if (!company.phone) {
    items.push('Add contact phone number');
  }

  if (!company.website) {
    items.push('Add company website');
  }

  return items;
};
