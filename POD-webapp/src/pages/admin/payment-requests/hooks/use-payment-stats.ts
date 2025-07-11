import { useState, useEffect, useCallback } from 'react';
// import api from '../../../../services/api';
import { mockDataService } from '../../../../services/mock-data';
import type { PayRequestStats, ApiResponse } from '../../../../types';

export const usePaymentStats = () => {
  const [stats, setStats] = useState<PayRequestStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await mockDataService.getPaymentStats();

      if (response.success) {
        setStats(response.data);
      } else {
        setError('Failed to fetch payment request statistics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshStats = useCallback(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refreshStats,
  };
};
