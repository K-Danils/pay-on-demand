import { useState, useCallback } from 'react';
import api from '../../../../services/api';
import type { Company, CompanyFormData, ApiResponse } from '../../../../types';

export const useCompany = (initialId?: string) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompany = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<any>(`/companies/${id}`);

      if (response.data) {
        setCompany(response.data);
      } else {
        setError('Failed to fetch company details');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCompany = useCallback(async (data: CompanyFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<any>(`/companies`, data);

      if (response.data) {
        return response.data;
      } else {
        //setError(response.message || 'Failed to create company');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCompany = useCallback(
    async (data: CompanyFormData) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.put<any>(`/companies`, data);

        if (response.data) {
          // Update local state if we have the company loaded
          if (company && company.id === data.id) {
            setCompany((prev) => (prev ? { ...prev, ...response.data } : null));
          }
          return response.data;
        } else {
          setError('Failed to update company');
          return null;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [company],
  );

  const deleteCompany = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        await api.delete<any>(`/companies/${id}`);

        // Clear local state if this was the loaded company
        if (company && company.id === id) {
          setCompany(null);
        }

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete company');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [company],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setCompany(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    company,
    loading,
    error,
    fetchCompany,
    createCompany,
    updateCompany,
    deleteCompany,
    clearError,
    reset,
  };
};
