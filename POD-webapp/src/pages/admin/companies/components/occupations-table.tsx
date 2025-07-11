import React from 'react';
import { Table, Button, Space, Popconfirm, Empty } from 'antd';
import { EditOutlined, DeleteOutlined, BankOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { OccupationTableData } from '../../../../types';

interface OccupationsTableProps {
  occupations: OccupationTableData[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onEdit?: (occupation: OccupationTableData) => void;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

export const OccupationsTable: React.FC<OccupationsTableProps> = ({
  occupations,
  loading,
  onDelete,
  onEdit,
  pagination,
}) => {
  const handleDelete = async (id: string) => {
    await onDelete(id);
  };

  const columns: ColumnsType<OccupationTableData> = [
    {
      title: 'Occupation',
      key: 'occupation',
      render: (_, record) => (
        <Space>
          <BankOutlined style={{ color: '#1890ff' }} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>{record.description}</div>
          </div>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Base Wage',
      dataIndex: 'baseWage',
      key: 'baseWage',
      render: (wage) => `$${wage.toLocaleString()}`,
      sorter: (a, b) => a.baseWage - b.baseWage,
    },
    {
      title: 'Assigned Users',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (count) => {
        if (count === 0) return 'No users';
        if (count === 1) return '1 user';
        return `${count} users`;
      },
      sorter: (a, b) => a.userCount - b.userCount,
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
            title="Delete Occupation"
            description={
              record.userCount > 0
                ? `"${record.name}" is assigned to ${record.userCount} user(s). Are you sure you want to delete it?`
                : `Are you sure you want to delete "${record.name}"? This action cannot be undone.`
            }
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

  const tableProps: TableProps<OccupationTableData> = {
    columns,
    dataSource: occupations,
    loading,
    rowKey: 'id',
    size: 'small',
    locale: {
      emptyText: <Empty description="No occupations found" image={Empty.PRESENTED_IMAGE_SIMPLE} />,
    },
    scroll: { x: 600 },
    ...(pagination && {
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: pagination.onChange,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} occupations`,
        size: 'small',
      },
    }),
  };

  return <Table {...tableProps} />;
};
