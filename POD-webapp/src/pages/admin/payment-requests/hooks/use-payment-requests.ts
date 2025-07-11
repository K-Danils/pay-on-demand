import { useState, useEffect, useCallback } from 'react';
// import api from '../../../../services/api';
import { mockDataService } from '../../../../services/mock-data';
import type { PayRequestTableData, PayRequestFilters, PaginationParams } from '../../../../types';

export const usePaymentRequests = () => {
  const [paymentRequests, setPaymentRequests] = useState<PayRequestTableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PayRequestFilters>({
    search: '',
    status: 'all',
    sortBy: 'requestDate',
    sortOrder: 'desc',
  });
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchPaymentRequests = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(filters.search && { search: filters.search }),
        ...(filters.status && filters.status !== 'all' && { status: filters.status }),
        ...(filters.companyId && { companyId: filters.companyId }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.startDate && { startDate: filters.startDate.toISOString() }),
        ...(filters.endDate && { endDate: filters.endDate.toISOString() }),
        ...(filters.sortBy && { sortBy: filters.sortBy }),
        ...(filters.sortOrder && { sortOrder: filters.sortOrder }),
      };

      const response = await mockDataService.getPaymentRequests(params);

      if (response.content) {
        setPaymentRequests(response.content);
        setPagination((prev) => ({
          ...prev,
          total: response.totalElements,
        }));
      } else {
        setError('Failed to fetch payment requests');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  const updateFilters = useCallback((newFilters: Partial<PayRequestFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  const updatePagination = useCallback((newPagination: Partial<PaginationParams>) => {
    setPagination((prev) => ({ ...prev, ...newPagination }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      status: 'all',
      sortBy: 'requestDate',
      sortOrder: 'desc',
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  useEffect(() => {
    fetchPaymentRequests();
  }, [fetchPaymentRequests]);

  return {
    paymentRequests,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    updatePagination,
    clearFilters,
    refetch: fetchPaymentRequests,
  };
};
