import React from 'react';
import { Table, Tag, Button, Space, Popconfirm, Empty } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { UserTableData } from '../../../../types';

interface UsersTableProps {
  users: UserTableData[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onEdit?: (user: UserTableData) => void;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, loading, onDelete, onEdit, pagination }) => {
  const handleDelete = async (id: string) => {
    await onDelete(id);
  };

  const columns: ColumnsType<UserTableData> = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => (
        <Space>
          <UserOutlined style={{ color: '#1890ff' }} />
          <div>
            <div style={{ fontWeight: 500 }}>{`${record.name} ${record.surname}`}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>{record.email}</div>
          </div>
        </Space>
      ),
      sorter: (a, b) => `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`),
    },
    {
      title: 'ID Number',
      dataIndex: 'identificationNumber',
      key: 'identificationNumber',
      sorter: (a, b) => a.identificationNumber.localeCompare(b.identificationNumber),
    },
    {
      title: 'Occupations',
      key: 'occupations',
      render: (_, record) => (
        <Space wrap>
          {record.occupationNames && record.occupationNames.length > 0 ? (
            record.occupationNames.map((occupation, index) => (
              <Tag key={index} color="blue">
                {occupation}
              </Tag>
            ))
          ) : (
            <Tag color="default">No occupations assigned</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Monthly Wage',
      dataIndex: 'monthlyWage',
      key: 'monthlyWage',
      render: (wage) => (wage ? `$${wage.toLocaleString()}` : 'Not set'),
      sorter: (a, b) => (a.monthlyWage || 0) - (b.monthlyWage || 0),
    },
    {
      title: 'Payroll Date',
      dataIndex: 'payrollDate',
      key: 'payrollDate',
      render: (date) => (date ? `Day ${date}` : 'Not set'),
      sorter: (a, b) => (a.payrollDate || 0) - (b.payrollDate || 0),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          {onEdit && (
            <Button type="link" icon={<EditOutlined />} size="small" onClick={() => onEdit(record)}>
              Edit
            </Button>
          )}
          <Popconfirm
            title="Delete User"
            description={`Are you sure you want to delete "${record.name} ${record.surname}"? This action cannot be undone.`}
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 120,
    },
  ];

  const tableProps: TableProps<UserTableData> = {
    columns,
    dataSource: users,
    loading,
    rowKey: 'id',
    size: 'small',
    locale: {
      emptyText: <Empty description="No users found" image={Empty.PRESENTED_IMAGE_SIMPLE} />,
    },
    scroll: { x: 800 },
    ...(pagination && {
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: pagination.onChange,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
        size: 'small',
      },
    }),
  };

  return <Table {...tableProps} />;
};
