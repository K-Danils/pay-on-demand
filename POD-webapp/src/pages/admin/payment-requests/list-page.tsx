import React, { useState } from 'react';
import { Card, Space, Typography, message, Button } from 'antd';
import { DollarOutlined, ReloadOutlined } from '@ant-design/icons';
import { PaymentRequestsTable, PaymentRequestDetailModal, PaymentRequestFilters } from './components';
import { usePaymentRequests, usePaymentRequest } from './hooks';
import type { PayRequestTableData } from '../../../types';

const { Title } = Typography;

const PaymentRequestsListPage: React.FC = () => {
  const {
    paymentRequests,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    updatePagination,
    clearFilters,
    refetch,
  } = usePaymentRequests();

  const {
    paymentRequest,
    loading: detailLoading,
    fetchPaymentRequest,
    approvePaymentRequest,
    denyPaymentRequest,
    reset: resetDetail,
  } = usePaymentRequest();

  const [selectedRequest, setSelectedRequest] = useState<PayRequestTableData | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [processingAction, setProcessingAction] = useState(false);

  const handleViewRequest = async (request: PayRequestTableData) => {
    setSelectedRequest(request);
    setDetailModalVisible(true);
    await fetchPaymentRequest(request.id);
  };

  const handleCloseDetail = () => {
    setDetailModalVisible(false);
    setSelectedRequest(null);
    resetDetail();
  };

  const handleApproveRequest = async (request: PayRequestTableData) => {
    setSelectedRequest(request);
    setDetailModalVisible(true);
    await fetchPaymentRequest(request.id);
  };

  const handleDenyRequest = async (request: PayRequestTableData) => {
    setSelectedRequest(request);
    setDetailModalVisible(true);
    await fetchPaymentRequest(request.id);
  };

  const handleApproveFromModal = async (id: string, notes?: string) => {
    setProcessingAction(true);
    try {
      const result = await approvePaymentRequest(id, 'admin', notes);
      if (result) {
        message.success('Payment request approved successfully');
        await refetch(); // Refresh the list
        handleCloseDetail();
      } else {
        message.error('Failed to approve payment request');
      }
    } catch (err) {
      message.error('An error occurred while approving the payment request');
    } finally {
      setProcessingAction(false);
    }
  };

  const handleDenyFromModal = async (id: string, notes?: string) => {
    setProcessingAction(true);
    try {
      const result = await denyPaymentRequest(id, 'admin', notes);
      if (result) {
        message.success('Payment request denied successfully');
        await refetch(); // Refresh the list
        handleCloseDetail();
      } else {
        message.error('Failed to deny payment request');
      }
    } catch (err) {
      message.error('An error occurred while denying the payment request');
    } finally {
      setProcessingAction(false);
    }
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    updatePagination({ page, limit: pageSize });
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Header */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <DollarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Title level={2} style={{ margin: 0 }}>
                Payment Requests
              </Title>
            </Space>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
                Refresh
              </Button>
            </Space>
          </div>
        </Card>

        {/* Filters */}
        <PaymentRequestFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onClearFilters={clearFilters}
          loading={loading}
        />

        {/* Table */}
        <Card>
          <PaymentRequestsTable
            paymentRequests={paymentRequests}
            loading={loading}
            onView={handleViewRequest}
            onApprove={handleApproveRequest}
            onDeny={handleDenyRequest}
            pagination={{
              current: pagination.page || 1,
              pageSize: pagination.limit || 10,
              total: pagination.total || 0,
              onChange: handlePaginationChange,
            }}
          />
        </Card>

        {/* Detail Modal */}
        <PaymentRequestDetailModal
          visible={detailModalVisible}
          onClose={handleCloseDetail}
          paymentRequest={paymentRequest}
          loading={detailLoading}
          onApprove={handleApproveFromModal}
          onDeny={handleDenyFromModal}
          processingAction={processingAction}
        />
      </Space>
    </div>
  );
};

export default PaymentRequestsListPage;
