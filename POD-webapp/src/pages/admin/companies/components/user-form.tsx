import React, { useEffect } from 'react';
import { Form, Input, Select, InputNumber, Card, Button, Space, Alert } from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import type { UserFormData, User, Occupation } from '../../../../types';

const { Option } = Select;

interface UserFormProps {
  initialData?: User | null;
  onSubmit: (data: UserFormData) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  onCancel?: () => void;
  occupations?: Occupation[]; // Available occupations for selection
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
  error,
  onCancel,
  occupations = [],
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        surname: initialData.surname,
        identificationNumber: initialData.identificationNumber,
        email: initialData.email,
        occupations: initialData.occupations || [],
        monthlyWage: initialData.monthlyWage,
        payrollDate: initialData.payrollDate,
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (values: UserFormData) => {
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
    <Card title={initialData ? 'Edit User' : 'Add New User'}>
      {error && <Alert message="Error" description={error} type="error" showIcon style={{ marginBottom: 16 }} />}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          occupations: [],
          monthlyWage: 0,
          payrollDate: 1,
        }}
      >
        <Form.Item
          label="First Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter first name' },
            { min: 2, message: 'First name must be at least 2 characters' },
            { max: 50, message: 'First name cannot exceed 50 characters' },
          ]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="surname"
          rules={[
            { required: true, message: 'Please enter last name' },
            { min: 2, message: 'Last name must be at least 2 characters' },
            { max: 50, message: 'Last name cannot exceed 50 characters' },
          ]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          label="Identification Number"
          name="identificationNumber"
          rules={[
            { required: true, message: 'Please enter identification number' },
            { min: 5, message: 'Identification number must be at least 5 characters' },
            { max: 20, message: 'Identification number cannot exceed 20 characters' },
            {
              pattern: /^[A-Za-z0-9-]+$/,
              message: 'Identification number can only contain letters, numbers, and dashes',
            },
          ]}
        >
          <Input placeholder="Enter identification number" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email address' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="Enter email address" type="email" />
        </Form.Item>

        <Form.Item
          label="Occupations"
          name="occupations"
          rules={[{ required: true, message: 'Please select at least one occupation' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select occupations"
            notFoundContent={occupations.length === 0 ? 'No occupations available' : 'No matching occupations'}
          >
            {occupations.map((occupation) => (
              <Option key={occupation.id} value={occupation.id}>
                {occupation.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Monthly Wage"
          name="monthlyWage"
          rules={[
            { type: 'number', min: 0, message: 'Monthly wage must be at least 0' },
            { type: 'number', max: 1000000, message: 'Monthly wage cannot exceed $1,000,000' },
          ]}
        >
          <InputNumber
            min={0}
            max={1000000}
            placeholder="Enter monthly wage"
            style={{ width: '100%' }}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as any}
          />
        </Form.Item>

        <Form.Item
          label="Payroll Date"
          name="payrollDate"
          help="Day of the month when salary is paid (1-31)"
          rules={[
            { type: 'number', min: 1, message: 'Payroll date must be between 1 and 31' },
            { type: 'number', max: 31, message: 'Payroll date must be between 1 and 31' },
          ]}
        >
          <InputNumber min={1} max={31} placeholder="Enter payroll date" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
              {initialData ? 'Update User' : 'Create User'}
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
