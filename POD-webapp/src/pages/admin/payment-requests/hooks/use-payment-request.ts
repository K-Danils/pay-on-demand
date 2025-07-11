import { useState, useCallback } from 'react';
// import api from '../../../../services/api';
import { mockDataService } from '../../../../services/mock-data';
import type { PayRequestDetails, PayRequestAction } from '../../../../types';

export const usePaymentRequest = () => {
  const [paymentRequest, setPaymentRequest] = useState<PayRequestDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentRequest = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await mockDataService.getPaymentRequest(id);

      if (response.success) {
        setPaymentRequest(response.data);
      } else {
        setError('Failed to fetch payment request details');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const processPaymentRequest = useCallback(
    async (id: string, action: PayRequestAction) => {
      setLoading(true);
      setError(null);

      try {
        const status = action.action === 'approve' ? 'approved' : 'denied';
        const response = await mockDataService.updatePaymentRequestStatus(id, status);

        if (response.success) {
          // Update local state if we have the payment request loaded
          if (paymentRequest && paymentRequest.id === id) {
            setPaymentRequest((prev) =>
              prev
                ? {
                    ...prev,
                    status: action.action === 'approve' ? 'approved' : 'denied',
                    processedDate: new Date(),
                    processedBy: action.processedBy,
                    notes: action.notes || prev.notes,
                  }
                : null,
            );
          }
          return response.data;
        } else {
          setError(response.message || `Failed to ${action.action} payment request`);
          return null;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [paymentRequest],
  );

  const approvePaymentRequest = useCallback(
    async (id: string, processedBy: string, notes?: string) => {
      return await processPaymentRequest(id, { action: 'approve', processedBy, notes });
    },
    [processPaymentRequest],
  );

  const denyPaymentRequest = useCallback(
    async (id: string, processedBy: string, notes?: string) => {
      return await processPaymentRequest(id, { action: 'deny', processedBy, notes });
    },
    [processPaymentRequest],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setPaymentRequest(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    paymentRequest,
    loading,
    error,
    fetchPaymentRequest,
    processPaymentRequest,
    approvePaymentRequest,
    denyPaymentRequest,
    clearError,
    reset,
  };
};
