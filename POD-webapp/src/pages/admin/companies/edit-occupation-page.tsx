import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Space, Typography, message, Spin, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { OccupationForm } from './components';
import { useOccupation } from './hooks';
import type { OccupationFormData } from '../../../types';

const { Title } = Typography;

const EditOccupationPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: companyId, occupationId } = useParams<{ id: string; occupationId: string }>();
  const { occupation, fetchOccupation, updateOccupation, loading, error } = useOccupation(companyId || '');

  useEffect(() => {
    if (companyId && occupationId) {
      fetchOccupation(occupationId);
    }
  }, [companyId, occupationId, fetchOccupation]);

  const handleSubmit = async (data: OccupationFormData) => {
    if (!occupationId) return;

    try {
      const updatedOccupation = await updateOccupation(occupationId, data);
      if (updatedOccupation) {
        message.success('Occupation updated successfully');
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (err) {
      message.error('Failed to update occupation');
    }
  };

  const handleCancel = () => {
    navigate(`/admin/companies/${companyId}`);
  };

  const handleBack = () => {
    navigate(`/admin/companies/${companyId}`);
  };

  if (!companyId || !occupationId) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Alert message="Error" description="Company ID and Occupation ID are required" type="error" showIcon />
        </Card>
      </div>
    );
  }

  if (loading && !occupation) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px' }}>Loading occupation details...</div>
          </div>
        </Card>
      </div>
    );
  }

  if (!occupation && !loading) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Title level={3}>Occupation not found</Title>
            <p>The occupation you're looking for doesn't exist or has been deleted.</p>
            <Button type="primary" onClick={handleBack}>
              Back to Company Details
            </Button>
          </div>
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
              Edit Occupation: {occupation ? occupation.name : 'Loading...'}
            </Title>
          </div>
        </Card>

        {/* Form */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {occupation ? (
            <OccupationForm
              initialData={occupation}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
              onCancel={handleCancel}
            />
          ) : null}
        </div>
      </Space>
    </div>
  );
};

export default EditOccupationPage;
