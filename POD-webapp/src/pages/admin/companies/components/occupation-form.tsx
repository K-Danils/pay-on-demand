import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Card, Button, Space, Alert } from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import type { OccupationFormData, Occupation } from '../../../../types';

const { TextArea } = Input;

interface OccupationFormProps {
  initialData?: Occupation | null;
  onSubmit: (data: OccupationFormData) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  onCancel?: () => void;
}

export const OccupationForm: React.FC<OccupationFormProps> = ({
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
        baseWage: initialData.baseWage,
        description: initialData.description,
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (values: OccupationFormData) => {
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
    <Card title={initialData ? 'Edit Occupation' : 'Add New Occupation'}>
      {error && <Alert message="Error" description={error} type="error" showIcon style={{ marginBottom: 16 }} />}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          baseWage: 0,
        }}
      >
        <Form.Item
          label="Occupation Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter occupation name' },
            { min: 2, message: 'Occupation name must be at least 2 characters' },
            { max: 100, message: 'Occupation name cannot exceed 100 characters' },
          ]}
        >
          <Input placeholder="Enter occupation name" />
        </Form.Item>

        <Form.Item
          label="Base Wage"
          name="baseWage"
          rules={[
            { required: true, message: 'Please enter base wage' },
            { type: 'number', min: 0, message: 'Base wage must be at least 0' },
            { type: 'number', max: 1000000, message: 'Base wage cannot exceed $1,000,000' },
          ]}
        >
          <InputNumber
            min={0}
            max={1000000}
            placeholder="Enter base wage"
            style={{ width: '100%' }}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as any}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ max: 500, message: 'Description cannot exceed 500 characters' }]}
        >
          <TextArea rows={4} placeholder="Enter occupation description (optional)" showCount maxLength={500} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
              {initialData ? 'Update Occupation' : 'Create Occupation'}
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
