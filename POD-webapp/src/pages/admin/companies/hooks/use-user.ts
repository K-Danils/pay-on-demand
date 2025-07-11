import { useState, useCallback } from 'react';
import api from '../../../../services/api';
import type { User, UserFormData, ApiResponse } from '../../../../types';

export const useUser = (companyId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get<ApiResponse<User>>(`/companies/${companyId}/users/${id}`);

        if (response.data.success) {
          setUser(response.data.data);
        } else {
          setError('Failed to fetch user details');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    },
    [companyId],
  );

  const createUser = useCallback(
    async (data: UserFormData) => {
      setLoading(true);
      setError(null);

      try {
        const userData = {
          ...data,
          companyId,
          role: 'worker' as const, // Default role for company users
        };

        const response = await api.post<ApiResponse<User>>(`/companies/${companyId}/users`, userData);

        if (response.data.success) {
          return response.data.data;
        } else {
          setError(response.data.message || 'Failed to create user');
          return null;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [companyId],
  );

  const updateUser = useCallback(
    async (id: string, data: Partial<UserFormData>) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.put<ApiResponse<User>>(`/companies/${companyId}/users/${id}`, data);

        if (response.data.success) {
          // Update local state if we have the user loaded
          if (user && user.id === id) {
            setUser((prev) => (prev ? { ...prev, ...response.data.data } : null));
          }
          return response.data.data;
        } else {
          setError(response.data.message || 'Failed to update user');
          return null;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [companyId, user],
  );

  const deleteUser = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        await api.delete(`/companies/${companyId}/users/${id}`);

        // Clear local state if this was the loaded user
        if (user && user.id === id) {
          setUser(null);
        }

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete user');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [companyId, user],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setUser(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    error,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    clearError,
    reset,
  };
};
