import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Space, Typography, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { CompanyForm } from './components';
import { useCompany } from './hooks';
import type { CompanyFormData } from '../../../types';

const { Title } = Typography;

const EditCompanyPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { company, fetchCompany, updateCompany, loading, error } = useCompany();

  useEffect(() => {
    if (id) {
      fetchCompany(id);
    }
  }, [id, fetchCompany]);

  const handleSubmit = async (data: CompanyFormData) => {
    if (!id) return;

    console.log(data);

    try {
      const updatedCompany = await updateCompany({
        id: id,
        name: data.name,
      });
      if (updatedCompany) {
        message.success('Company updated successfully');
        navigate('/admin/companies');
      } else {
        message.error('Failed to update company');
      }
    } catch (err) {
      message.error('An error occurred while updating the company');
    }
  };

  const handleCancel = () => {
    navigate('/admin/companies');
  };

  if (loading && !company) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px' }}>Loading company details...</div>
          </div>
        </Card>
      </div>
    );
  }

  if (!company && !loading) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Title level={3}>Company not found</Title>
            <p>The company you're looking for doesn't exist or has been deleted.</p>
            <Button type="primary" onClick={handleCancel}>
              Back to Companies
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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

        <Title level={2}>Edit Company</Title>

        <CompanyForm
          initialData={company}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          onCancel={handleCancel}
        />
      </Card>
    </div>
  );
};

export default EditCompanyPage;
