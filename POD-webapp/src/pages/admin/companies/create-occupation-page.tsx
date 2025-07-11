import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Space, Typography, message, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { OccupationForm } from './components';
import { useOccupation } from './hooks';
import type { OccupationFormData } from '../../../types';

const { Title } = Typography;

const CreateOccupationPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: companyId } = useParams<{ id: string }>();
  const { createOccupation, loading, error } = useOccupation(companyId || '');

  const handleSubmit = async (data: OccupationFormData) => {
    try {
      const newOccupation = await createOccupation(data);
      if (newOccupation) {
        message.success('Occupation created successfully');
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (err) {
      message.error('Failed to create occupation');
    }
  };

  const handleCancel = () => {
    navigate(`/admin/companies/${companyId}`);
  };

  const handleBack = () => {
    navigate(`/admin/companies/${companyId}`);
  };

  if (!companyId) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Alert message="Error" description="Company ID is required" type="error" showIcon />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Header */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack}>
                Back to Company Details
              </Button>
            </Space>
            <Title level={3} style={{ margin: 0 }}>
              Add New Occupation
            </Title>
          </div>
        </Card>

        {/* Form */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <OccupationForm onSubmit={handleSubmit} loading={loading} error={error} onCancel={handleCancel} />
        </div>
      </Space>
    </div>
  );
};

export default CreateOccupationPage;
