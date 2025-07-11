import { useState, useEffect, useCallback } from 'react';
// import api from '../../../../services/api';
import { mockDataService } from '../../../../services/mock-data';
import type { UserTableData, UserFilters, PaginationParams, ApiResponse } from '../../../../types';

export const useUsers = (companyId: string) => {
  const [users, setUsers] = useState<UserTableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserFilters>({
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

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        companyId,
        ...(filters.search && { search: filters.search }),
        ...(filters.occupation && { occupation: filters.occupation }),
        ...(filters.sortBy && { sortBy: filters.sortBy }),
        ...(filters.sortOrder && { sortOrder: filters.sortOrder }),
      };

      const response = await mockDataService.getUsers(companyId, params);

      if (response.success) {
        setUsers(response.data);
        setPagination((prev) => ({
          ...prev,
          total: response.pagination.total,
        }));
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [companyId, filters, pagination.page, pagination.limit]);

  const deleteUser = useCallback(
    async (id: string) => {
      try {
        await mockDataService.deleteUser(companyId, id);
        await fetchUsers(); // Refresh the list
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete user');
        return false;
      }
    },
    [companyId, fetchUsers],
  );

  const updateFilters = useCallback((newFilters: Partial<UserFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  const updatePagination = useCallback((newPagination: Partial<PaginationParams>) => {
    setPagination((prev) => ({ ...prev, ...newPagination }));
  }, []);

  useEffect(() => {
    if (companyId) {
      fetchUsers();
    }
  }, [companyId, fetchUsers]);

  return {
    users,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    updatePagination,
    deleteUser,
    refetch: fetchUsers,
  };
};
