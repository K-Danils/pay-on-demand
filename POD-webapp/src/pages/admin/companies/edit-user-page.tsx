import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Space, Typography, message, Spin, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { UserForm } from './components';
import { useUser, useOccupations } from './hooks';
import type { UserFormData, Occupation } from '../../../types';

const { Title } = Typography;

const EditUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: companyId, userId } = useParams<{ id: string; userId: string }>();
  const { user, fetchUser, updateUser, loading, error } = useUser(companyId || '');
  const { occupations, loading: occupationsLoading } = useOccupations(companyId || '');
  const [availableOccupations, setAvailableOccupations] = useState<Occupation[]>([]);

  useEffect(() => {
    if (companyId && userId) {
      fetchUser(userId);
    }
  }, [companyId, userId, fetchUser]);

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
    if (!userId) return;

    try {
      const updatedUser = await updateUser(userId, data);
      if (updatedUser) {
        message.success('User updated successfully');
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (err) {
      message.error('Failed to update user');
    }
  };

  const handleCancel = () => {
    navigate(`/admin/companies/${companyId}`);
  };

  const handleBack = () => {
    navigate(`/admin/companies/${companyId}`);
  };

  if (!companyId || !userId) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Alert message="Error" description="Company ID and User ID are required" type="error" showIcon />
        </Card>
      </div>
    );
  }

  if (loading && !user) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px' }}>Loading user details...</div>
          </div>
        </Card>
      </div>
    );
  }

  if (!user && !loading) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Title level={3}>User not found</Title>
            <p>The user you're looking for doesn't exist or has been deleted.</p>
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
              Edit User: {user ? `${user.name} ${user.surname}` : 'Loading...'}
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
                description="You need to create at least one occupation before editing users. Users must be assigned to one or more occupations."
                type="warning"
                showIcon
                action={
                  <Button type="primary" onClick={() => navigate(`/admin/companies/${companyId}/occupations/create`)}>
                    Create Occupation
                  </Button>
                }
              />
            </Card>
          ) : user ? (
            <UserForm
              initialData={user}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
              onCancel={handleCancel}
              occupations={availableOccupations}
            />
          ) : null}
        </div>
      </Space>
    </div>
  );
};

export default EditUserPage;
