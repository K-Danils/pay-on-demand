import React from 'react';
import { Table, Tag, Button, Space, Empty, Typography } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { PayRequestTableData } from '../../../../types';

const { Text } = Typography;

interface PaymentRequestsTableProps {
  paymentRequests: PayRequestTableData[];
  loading: boolean;
  onView: (paymentRequest: PayRequestTableData) => void;
  onApprove?: (paymentRequest: PayRequestTableData) => void;
  onDeny?: (paymentRequest: PayRequestTableData) => void;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

export const PaymentRequestsTable: React.FC<PaymentRequestsTableProps> = ({
  paymentRequests,
  loading,
  onView,
  onApprove,
  onDeny,
  pagination,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'approved':
        return 'green';
      case 'denied':
        return 'red';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'denied':
        return 'Denied';
      default:
        return status;
    }
  };

  const columns: ColumnsType<PayRequestTableData> = [
    {
      title: 'Request ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id) => (
        <Text code style={{ fontSize: '12px' }}>
          {id.slice(0, 8)}...
        </Text>
      ),
    },
    {
      title: 'Employee',
      key: 'employee',
      render: (_, record) => (
        <Space>
          <UserOutlined style={{ color: '#1890ff' }} />
          <div>
            <div style={{ fontWeight: 500 }}>{`${record.userName} ${record.userSurname}`}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>{record.userEmail}</div>
          </div>
        </Space>
      ),
      sorter: (a, b) => `${a.userName} ${a.userSurname}`.localeCompare(`${b.userName} ${b.userSurname}`),
    },
    {
      title: 'Company',
      dataIndex: 'companyName',
      key: 'companyName',
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    },
    {
      title: 'Occupations',
      key: 'occupations',
      render: (_, record) => (
        <Space wrap>
          {record.occupationNames && record.occupationNames.length > 0 ? (
            record.occupationNames.map((occupation, index) => (
              <Tag key={index} color="blue" style={{ fontSize: '11px' }}>
                {occupation}
              </Tag>
            ))
          ) : (
            <Tag color="default" style={{ fontSize: '11px' }}>
              No occupations
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <Space>
          <DollarOutlined style={{ color: '#52c41a' }} />
          <Text strong style={{ color: '#52c41a' }}>
            ${amount.toLocaleString()}
          </Text>
        </Space>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Hours',
      dataIndex: 'hoursWorked',
      key: 'hoursWorked',
      render: (hours) => (hours ? `${hours}h` : 'N/A'),
      sorter: (a, b) => (a.hoursWorked || 0) - (b.hoursWorked || 0),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>,
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Approved', value: 'approved' },
        { text: 'Denied', value: 'denied' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => onView(record)}>
            View
          </Button>
          {record.status === 'pending' && (
            <>
              {onApprove && (
                <Button
                  type="link"
                  icon={<CheckOutlined />}
                  size="small"
                  style={{ color: '#52c41a' }}
                  onClick={() => onApprove(record)}
                >
                  Approve
                </Button>
              )}
              {onDeny && (
                <Button type="link" icon={<CloseOutlined />} size="small" danger onClick={() => onDeny(record)}>
                  Deny
                </Button>
              )}
            </>
          )}
        </Space>
      ),
      width: 180,
    },
  ];

  const tableProps: TableProps<PayRequestTableData> = {
    columns,
    dataSource: paymentRequests,
    loading,
    rowKey: 'id',
    size: 'small',
    locale: {
      emptyText: <Empty description="No payment requests found" image={Empty.PRESENTED_IMAGE_SIMPLE} />,
    },
    scroll: { x: 1200 },
    ...(pagination && {
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: pagination.onChange,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} payment requests`,
        size: 'small',
      },
    }),
  };

  return <Table {...tableProps} />;
};
