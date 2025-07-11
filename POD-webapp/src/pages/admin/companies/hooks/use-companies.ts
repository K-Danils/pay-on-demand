import { useState, useEffect, useCallback } from 'react';
// import api from '../../../../services/api';
import { mockDataService } from '../../../../services/mock-data';
import type { Company, CompanyFilters, PaginationParams, ApiResponse } from '../../../../types';
import api from '../../../../services/api';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CompanyFilters>({
    search: '',
    status: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  });
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    limit: 10,
    total: 0,
  });

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.page,
        size: pagination.limit,
        // ...(filters.search && { search: filters.search }),
        // ...(filters.status !== 'all' && { status: filters.status }),
        // ...(filters.industry && { industry: filters.industry }),
        // ...(filters.sortBy && { sortBy: filters.sortBy }),
        // ...(filters.sortOrder && { sortOrder: filters.sortOrder }),
      };

      // Use mock data service instead of API
      const response = await api.get<ApiResponse<Company>>(`/companies`, { params: params });
      console.log(response.data);
      if (response.data.content) {
        setCompanies(response.data.content);
        setPagination((prev) => ({
          ...prev,
          total: response.data.totalElements,
        }));
      } else {
        setError('Failed to fetch companies');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  const deleteCompany = useCallback(
    async (id: string) => {
      try {
        await mockDataService.deleteCompany(id);
        await fetchCompanies(); // Refresh the list
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete company');
        return false;
      }
    },
    [fetchCompanies],
  );

  const toggleCompanyStatus = useCallback(
    async (id: string, currentStatus: boolean) => {
      try {
        const newStatus = currentStatus ? 'deactivated' : 'activated';
        await mockDataService.updateCompany(id, { status: newStatus });
        await fetchCompanies(); // Refresh the list
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update company status');
        return false;
      }
    },
    [fetchCompanies],
  );

  const updateFilters = useCallback((newFilters: Partial<CompanyFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  const updatePagination = useCallback((newPagination: Partial<PaginationParams>) => {
    setPagination((prev) => ({ ...prev, ...newPagination }));
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    updatePagination,
    deleteCompany,
    toggleCompanyStatus,
    refetch: fetchCompanies,
  };
};
