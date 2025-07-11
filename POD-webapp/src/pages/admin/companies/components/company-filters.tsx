import React from 'react';
import { Card, Form, Input, Select, Button, Space, Col, Row } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { CompanyFilters as CompanyFiltersType } from '../../../../types';

const { Option } = Select;

interface CompanyFiltersProps {
  filters: CompanyFiltersType;
  onFiltersChange: (filters: Partial<CompanyFiltersType>) => void;
  onReset: () => void;
}

const industryOptions = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Construction',
  'Transportation',
  'Agriculture',
  'Energy',
  'Hospitality',
  'Media',
  'Other',
];

export const CompanyFilters: React.FC<CompanyFiltersProps> = ({ filters, onFiltersChange, onReset }) => {
  const [form] = Form.useForm();

  const handleSearch = (values: any) => {
    onFiltersChange(values);
  };

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  const handleFieldChange = (field: keyof CompanyFiltersType, value: any) => {
    onFiltersChange({ [field]: value });
  };

  return (
    <Card title="Filters" size="small">
      <Form form={form} layout="vertical" onFinish={handleSearch} initialValues={filters}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item label="Search" name="search">
              <Input
                placeholder="Search companies..."
                prefix={<SearchOutlined />}
                allowClear
                onChange={(e) => handleFieldChange('search', e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item label="Status" name="status">
              <Select placeholder="Select status" allowClear onChange={(value) => handleFieldChange('status', value)}>
                <Option value="all">All</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item label="Industry" name="industry">
              <Select
                placeholder="Select industry"
                allowClear
                onChange={(value) => handleFieldChange('industry', value)}
              >
                {industryOptions.map((industry) => (
                  <Option key={industry} value={industry}>
                    {industry}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item label="Sort By" name="sortBy">
              <Select placeholder="Sort by" onChange={(value) => handleFieldChange('sortBy', value)}>
                <Option value="name">Name</Option>
                <Option value="createdAt">Created Date</Option>
                <Option value="employeeCount">Employee Count</Option>
                <Option value="status">Status</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item label="Sort Order" name="sortOrder">
              <Select placeholder="Sort order" onChange={(value) => handleFieldChange('sortOrder', value)}>
                <Option value="asc">Ascending</Option>
                <Option value="desc">Descending</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item label=" ">
              <Space>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  Search
                </Button>
                <Button type="default" onClick={handleReset} icon={<ReloadOutlined />}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
