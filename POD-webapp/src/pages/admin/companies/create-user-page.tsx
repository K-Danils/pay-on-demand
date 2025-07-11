import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Space, Typography, message, Spin, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { UserForm } from './components';
import { useUser, useOccupations } from './hooks';
import type { UserFormData, Occupation } from '../../../types';

const { Title } = Typography;

const CreateUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: companyId } = useParams<{ id: string }>();
  const { createUser, loading, error } = useUser(companyId || '');
  const { occupations, loading: occupationsLoading } = useOccupations(companyId || '');
  const [availableOccupations, setAvailableOccupations] = useState<Occupation[]>([]);

  useEffect(() => {
    // Convert occupation table data to plain occupation objects
    const plainOccupations = occupations.map((occ) => ({
      id: occ.id,
      name: occ.name,
      companyId: occ.companyId,
      baseWage: occ.baseWage,
      description: occ.description,
      createdAt: occ.createdAt,
      updatedAt: occ.updatedAt,
    }));
    setAvailableOccupations(plainOccupations);
  }, [occupations]);

  const handleSubmit = async (data: UserFormData) => {
    try {
      const newUser = await createUser(data);
      if (newUser) {
        message.success('User created successfully');
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (err) {
      message.error('Failed to create user');
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
              Add New User
            </Title>
          </div>
        </Card>

        {/* Form */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {occupationsLoading ? (
            <Card>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin size="large" />
                <div style={{ marginTop: '16px' }}>Loading occupations...</div>
              </div>
            </Card>
          ) : availableOccupations.length === 0 ? (
            <Card>
              <Alert
                message="No Occupations Available"
                description="You need to create at least one occupation before adding users. Users must be assigned to one or more occupations."
                type="warning"
                showIcon
                action={
                  <Button type="primary" onClick={() => navigate(`/admin/companies/${companyId}/occupations/create`)}>
                    Create Occupation
                  </Button>
                }
              />
            </Card>
          ) : (
            <UserForm
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
              onCancel={handleCancel}
              occupations={availableOccupations}
            />
          )}
        </div>
      </Space>
    </div>
  );
};

export default CreateUserPage;
