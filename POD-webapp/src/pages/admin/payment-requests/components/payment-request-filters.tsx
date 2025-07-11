import React from 'react';
import { Card, Input, Select, DatePicker, Button, Space, Row, Col } from 'antd';
import { SearchOutlined, ClearOutlined, FilterOutlined } from '@ant-design/icons';
import type { PayRequestFilters } from '../../../../types';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface PaymentRequestFiltersProps {
  filters: PayRequestFilters;
  onFiltersChange: (filters: Partial<PayRequestFilters>) => void;
  onClearFilters: () => void;
  loading?: boolean;
}

export const PaymentRequestFilters: React.FC<PaymentRequestFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  loading = false,
}) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ search: value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ status: value as 'pending' | 'approved' | 'denied' | 'all' });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');
    onFiltersChange({
      sortBy: sortBy as 'requestDate' | 'amount' | 'status' | 'userName',
      sortOrder: sortOrder as 'asc' | 'desc',
    });
  };

  const handleDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      onFiltersChange({
        startDate: dates[0].toDate(),
        endDate: dates[1].toDate(),
      });
    } else {
      onFiltersChange({
        startDate: undefined,
        endDate: undefined,
      });
    }
  };

  const getSortValue = () => {
    return `${filters.sortBy || 'requestDate'}-${filters.sortOrder || 'desc'}`;
  };

  return (
    <Card
      title={
        <Space>
          <FilterOutlined />
          <span>Filter Payment Requests</span>
        </Space>
      }
      size="small"
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by employee name, email, or company..."
            prefix={<SearchOutlined />}
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            allowClear
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Status"
            value={filters.status || 'all'}
            onChange={handleStatusChange}
            style={{ width: '100%' }}
          >
            <Option value="all">All Status</Option>
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="denied">Denied</Option>
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Select placeholder="Sort by" value={getSortValue()} onChange={handleSortChange} style={{ width: '100%' }}>
            <Option value="requestDate-desc">Request Date (Newest)</Option>
            <Option value="requestDate-asc">Request Date (Oldest)</Option>
            <Option value="amount-desc">Amount (Highest)</Option>
            <Option value="amount-asc">Amount (Lowest)</Option>
            <Option value="userName-asc">Employee Name (A-Z)</Option>
            <Option value="userName-desc">Employee Name (Z-A)</Option>
            <Option value="status-asc">Status (A-Z)</Option>
            <Option value="status-desc">Status (Z-A)</Option>
          </Select>
        </Col>

        <Col xs={24} sm={12} md={4}>
          <Button icon={<ClearOutlined />} onClick={onClearFilters} disabled={loading} style={{ width: '100%' }}>
            Clear
          </Button>
        </Col>

        <Col xs={24} md={12}>
          <RangePicker
            placeholder={['Start Date', 'End Date']}
            onChange={handleDateRangeChange}
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
          />
        </Col>
      </Row>
    </Card>
  );
};
