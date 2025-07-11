import { useState, useEffect, useCallback } from 'react';
// import api from '../../../../services/api';
import { mockDataService } from '../../../../services/mock-data';
import type { OccupationTableData, OccupationFilters, PaginationParams, ApiResponse } from '../../../../types';
import api from '../../../../services/api';

export const useOccupations = (companyId: string) => {
  const [occupations, setOccupations] = useState<OccupationTableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<OccupationFilters>({
    search: '',
    companyId,
    sortBy: 'name',
    sortOrder: 'asc',
  });
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchOccupations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        companyId,
        ...(filters.search && { search: filters.search }),
        ...(filters.sortBy && { sortBy: filters.sortBy }),
        ...(filters.sortOrder && { sortOrder: filters.sortOrder }),
      });

      const response = await api.get<ApiResponse<OccupationTableData>>(
        `/companies/${companyId}/occupations?${params.toString()}`,
      );

      if (response.data.success) {
        setOccupations(response.data.data);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pagination.total,
        }));
      } else {
        setError('Failed to fetch occupations');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [companyId, filters, pagination.page, pagination.limit]);

  const deleteOccupation = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/companies/${companyId}/occupations/${id}`);
        await fetchOccupations(); // Refresh the list
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete occupation');
        return false;
      }
    },
    [companyId, fetchOccupations],
  );

  const updateFilters = useCallback((newFilters: Partial<OccupationFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  const updatePagination = useCallback((newPagination: Partial<PaginationParams>) => {
    setPagination((prev) => ({ ...prev, ...newPagination }));
  }, []);

  useEffect(() => {
    if (companyId) {
      fetchOccupations();
    }
  }, [companyId, fetchOccupations]);

  return {
    occupations,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    updatePagination,
    deleteOccupation,
    refetch: fetchOccupations,
  };
};
