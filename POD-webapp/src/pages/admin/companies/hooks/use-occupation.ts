import { useState, useCallback } from 'react';
import api from '../../../../services/api';
import type { Occupation, OccupationFormData, ApiResponse } from '../../../../types';

export const useOccupation = (companyId: string) => {
  const [occupation, setOccupation] = useState<Occupation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOccupation = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get<ApiResponse<Occupation>>(`/companies/${companyId}/occupations/${id}`);

        if (response.data.success) {
          setOccupation(response.data.data);
        } else {
          setError('Failed to fetch occupation details');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    },
    [companyId],
  );

  const createOccupation = useCallback(
    async (data: OccupationFormData) => {
      setLoading(true);
      setError(null);

      try {
        const occupationData = {
          ...data,
          companyId,
        };

        const response = await api.post<ApiResponse<Occupation>>(`/companies/${companyId}/occupations`, occupationData);

        if (response.data.success) {
          return response.data.data;
        } else {
          setError(response.data.message || 'Failed to create occupation');
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

  const updateOccupation = useCallback(
    async (id: string, data: Partial<OccupationFormData>) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.put<ApiResponse<Occupation>>(`/companies/${companyId}/occupations/${id}`, data);

        if (response.data.success) {
          // Update local state if we have the occupation loaded
          if (occupation && occupation.id === id) {
            setOccupation((prev) => (prev ? { ...prev, ...response.data.data } : null));
          }
          return response.data.data;
        } else {
          setError(response.data.message || 'Failed to update occupation');
          return null;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [companyId, occupation],
  );

  const deleteOccupation = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        await api.delete(`/companies/${companyId}/occupations/${id}`);

        // Clear local state if this was the loaded occupation
        if (occupation && occupation.id === id) {
          setOccupation(null);
        }

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete occupation');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [companyId, occupation],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setOccupation(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    occupation,
    loading,
    error,
    fetchOccupation,
    createOccupation,
    updateOccupation,
    deleteOccupation,
    clearError,
    reset,
  };
};
