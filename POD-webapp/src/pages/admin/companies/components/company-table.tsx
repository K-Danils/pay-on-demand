import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Tag, Button, Avatar, Space, Popconfirm, Empty } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, StopOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { Company } from '../../../../types';
import { formatCompanyStatus, generateCompanyInitials } from '../utils';

interface CompanyTableProps {
  companies: Company[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onToggleStatus: (company: Company) => Promise<void>;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

export const CompanyTable: React.FC<CompanyTableProps> = ({
  companies,
  loading,
  onDelete,
  onToggleStatus,
  pagination,
}) => {
  const handleDelete = async (id: string) => {
    await onDelete(id);
  };

  const handleToggleStatus = async (company: Company) => {
    await onToggleStatus({ ...company, active: !company.active });
  };

  const columns: ColumnsType<Company> = [
    {
      title: 'Company',
      key: 'name',
      render: (_, record) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }} size={40}>
            {generateCompanyInitials(record.name)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
          </div>
        </Space>
      ),
      width: 250,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => <Tag color={status ? 'green' : 'red'}>{formatCompanyStatus(status)}</Tag>,
      sorter: (a, b) => a.active.toString().localeCompare(b.active.toString()),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, record) => record.active === value,
    },
    // {
    //   title: 'Employees',
    //   dataIndex: 'employeeCount',
    //   key: 'employeeCount',
    //   render: (count) => formatEmployeeCount(count),
    //   sorter: (a, b) => a.employeeCount - b.employeeCount,
    // },
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
          <Button type="link" icon={<EyeOutlined />} size="small">
            <Link to={`/admin/companies/${record.id}`}>View</Link>
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small">
            <Link to={`/admin/companies/${record.id}/edit`}>Edit</Link>
          </Button>
          <Popconfirm
            title={`${record.active ? 'Deactivate' : 'Activate'} Company`}
            description={`Are you sure you want to ${record.active ? 'deactivate' : 'activate'} "${record.name}"?`}
            onConfirm={() => handleToggleStatus(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={record.active ? <StopOutlined /> : <CheckCircleOutlined />}
              size="small"
              danger={record.active}
            >
              {record.active ? 'Deactivate' : 'Activate'}
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Delete Company"
            description={`Are you sure you want to delete "${record.name}"? This action cannot be undone.`}
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
      width: 300,
    },
  ];

  const tableProps: TableProps<Company> = {
    columns,
    dataSource: companies,
    loading,
    rowKey: 'id',
    locale: {
      emptyText: <Empty description="No companies found" image={Empty.PRESENTED_IMAGE_SIMPLE} />,
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
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} companies`,
      },
    }),
  };

  return <Table {...tableProps} />;
};
