import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Space, Typography, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { CompanyForm } from './components';
import { useCompany } from './hooks';
import type { CompanyFormData } from '../../../types';

const { Title } = Typography;

const CreateCompanyPage: React.FC = () => {
  const navigate = useNavigate();
  const { createCompany, loading, error } = useCompany();

  const handleSubmit = async (data: CompanyFormData) => {
    try {
      const newCompany = await createCompany(data);
      if (newCompany) {
        message.success('Company created successfully');
        navigate('/admin/companies');
      } else {
        message.error('Failed to create company');
      }
    } catch (err) {
      message.error('An error occurred while creating the company');
    }
  };

  const handleCancel = () => {
    navigate('/admin/companies');
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Space>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleCancel}>
              Back to Companies
            </Button>
          </Space>
        </div>

        <Title level={2}>Create New Company</Title>

        <CompanyForm onSubmit={handleSubmit} loading={loading} error={error} onCancel={handleCancel} />
      </Card>
    </div>
  );
};

export default CreateCompanyPage;
