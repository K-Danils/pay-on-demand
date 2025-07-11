import React, { useEffect } from 'react';
import { Form, Input, Select, InputNumber, Card, Button, Space, Alert } from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import type { Company, CompanyFormData } from '../../../../types';

const { TextArea } = Input;
const { Option } = Select;

interface CompanyFormProps {
  initialData?: Company | null;
  onSubmit: (data: CompanyFormData) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  onCancel?: () => void;
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

export const CompanyForm: React.FC<CompanyFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
  error,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        // address: initialData.address,
        // phone: initialData.phone,
        // email: initialData.email,
        // website: initialData.website,
        // industry: initialData.industry,
        // employeeCount: initialData.employeeCount,
        // status: initialData.status,
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (values: CompanyFormData) => {
    try {
      await onSubmit(values);
    } catch (err) {
      // Error handling is done by parent component
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Card title={initialData ? 'Edit Company' : 'Create New Company'}>
      {error && <Alert message="Error" description={error} type="error" showIcon style={{ marginBottom: 16 }} />}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          status: 'active',
          employeeCount: 0,
        }}
      >
        <Form.Item
          label="Company Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter company name' },
            { min: 2, message: 'Company name must be at least 2 characters' },
            { max: 100, message: 'Company name cannot exceed 100 characters' },
          ]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>

        {/* <Form.Item
          label="Description"
          name="description"
          rules={[{ max: 500, message: 'Description cannot exceed 500 characters' }]}
        >
          <TextArea rows={3} placeholder="Enter company description" showCount maxLength={500} />
        </Form.Item>

        <Form.Item label="Industry" name="industry">
          <Select placeholder="Select industry" allowClear>
            {industryOptions.map((industry) => (
              <Option key={industry} value={industry}>
                {industry}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ max: 200, message: 'Address cannot exceed 200 characters' }]}
        >
          <TextArea rows={2} placeholder="Enter company address" showCount maxLength={200} />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              pattern: /^\+?[\d\s\-\(\)]+$/,
              message: 'Please enter a valid phone number',
            },
          ]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: 'email', message: 'Please enter a valid email address' }]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[
            {
              pattern: /^https?:\/\/[^\s]+$/,
              message: 'Please enter a valid website URL (starting with http:// or https://)',
            },
          ]}
        >
          <Input placeholder="Enter website URL" />
        </Form.Item>

        <Form.Item
          label="Employee Count"
          name="employeeCount"
          rules={[
            { type: 'number', min: 0, message: 'Employee count must be at least 0' },
            { type: 'number', max: 100000, message: 'Employee count cannot exceed 100,000' },
          ]}
        >
          <InputNumber min={0} max={100000} placeholder="Enter employee count" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select status' }]}>
          <Select placeholder="Select status">
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item> */}

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
              {initialData ? 'Update Company' : 'Create Company'}
            </Button>
            <Button type="default" onClick={handleReset} icon={<ReloadOutlined />}>
              Reset
            </Button>
            {onCancel && (
              <Button type="default" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
