import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Card,
  Button,
  Space,
  Typography,
  message,
  Spin,
  Descriptions,
  Tag,
  Avatar,
  Row,
  Col,
  List,
  Divider,
  Alert,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  TeamOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  StopOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useCompany, useUsers, useOccupations } from './hooks';
import { UsersTable, OccupationsTable } from './components';
import {
  formatCompanyStatus,
  formatEmployeeCount,
  generateCompanyInitials,
  formatCompanyWebsite,
  getCompanyActionItems,
} from './utils';

const { Title, Text } = Typography;

const CompanyDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { company, fetchCompany, deleteCompany, loading } = useCompany();

  // Users and Occupations hooks
  const { users, loading: usersLoading, deleteUser, refetch: refetchUsers } = useUsers(id || '');

  const {
    occupations,
    loading: occupationsLoading,
    deleteOccupation,
    refetch: refetchOccupations,
  } = useOccupations(id || '');

  useEffect(() => {
    if (id) {
      fetchCompany(id);
    }
  }, [id, fetchCompany]);

  const handleDelete = async () => {
    if (!id || !company) return;

    try {
      const success = await deleteCompany(id);
      if (success) {
        message.success('Company deleted successfully');
        navigate('/admin/companies');
      } else {
        message.error('Failed to delete company');
      }
    } catch (err) {
      message.error('An error occurred while deleting the company');
    }
  };

  const handleBack = () => {
    navigate('/admin/companies');
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const success = await deleteUser(userId);
      if (success) {
        message.success('User deleted successfully');
        refetchUsers();
      } else {
        message.error('Failed to delete user');
      }
    } catch (err) {
      message.error('An error occurred while deleting the user');
    }
  };

  const handleDeleteOccupation = async (occupationId: string) => {
    try {
      const success = await deleteOccupation(occupationId);
      if (success) {
        message.success('Occupation deleted successfully');
        refetchOccupations();
      } else {
        message.error('Failed to delete occupation');
      }
    } catch (err) {
      message.error('An error occurred while deleting the occupation');
    }
  };

  const handleAddUser = () => {
    navigate(`/admin/companies/${id}/users/create`);
  };

  const handleAddOccupation = () => {
    navigate(`/admin/companies/${id}/occupations/create`);
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
            <Button type="primary" onClick={handleBack}>
              Back to Companies
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!company) return null;

  const actionItems = getCompanyActionItems(company);

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Header */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack}>
                Back to Companies
              </Button>
            </Space>
            <Space>
              <Button type="primary" icon={<EditOutlined />}>
                <Link to={`/admin/companies/${id}/edit`}>Edit</Link>
              </Button>
              <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
                Delete
              </Button>
            </Space>
          </div>
        </Card>

        {/* Company Overview */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <Avatar size={64} style={{ backgroundColor: '#1890ff', marginRight: '16px' }}>
              {generateCompanyInitials(company.name)}
            </Avatar>
            <div>
              <Title level={2} style={{ margin: 0 }}>
                {company.name}
              </Title>
              <Space style={{ marginTop: '8px' }}>
                <Tag color={company.active ? 'green' : 'red'}>{formatCompanyStatus(company.active)}</Tag>
              </Space>
            </div>
          </div>

          <Descriptions column={2} bordered>
            <Descriptions.Item label="Company Name">{company.name}</Descriptions.Item>

            {/* <Descriptions.Item label="Employee Count">{formatEmployeeCount(company.employeeCount)}</Descriptions.Item> */}
            <Descriptions.Item label="Created">{new Date(company.createdAt).toLocaleDateString()}</Descriptions.Item>
            <Descriptions.Item label="Last Updated">
              {new Date(company.updatedAt).toLocaleDateString()}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Contact Information */}
        <Card title="Contact Information">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}></Col>
            <Col xs={24} sm={12} md={8}>
              <Space>
                <GlobalOutlined />
              </Space>
            </Col>
            <Col xs={24}>
              <Space>
                <EnvironmentOutlined />
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Action Items */}
        {actionItems.length > 0 && (
          <Card title="Recommended Actions">
            <Alert
              message="Action Items"
              description={
                <List
                  size="small"
                  dataSource={actionItems}
                  renderItem={(item) => (
                    <List.Item>
                      <Text>{item}</Text>
                    </List.Item>
                  )}
                />
              }
              type="info"
              showIcon
            />
          </Card>
        )}

        {/* Users Management */}
        <Card
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Space>
                <UserOutlined />
                <span>Users ({users.length})</span>
              </Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
                Add User
              </Button>
            </div>
          }
        >
          <UsersTable
            users={users}
            loading={usersLoading}
            onDelete={handleDeleteUser}
            onEdit={(user) => navigate(`/admin/companies/${id}/users/${user.id}/edit`)}
          />
        </Card>

        {/* Occupations Management */}
        <Card
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Space>
                <BankOutlined />
                <span>Occupations ({occupations.length})</span>
              </Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddOccupation}>
                Add Occupation
              </Button>
            </div>
          }
        >
          <OccupationsTable
            occupations={occupations}
            loading={occupationsLoading}
            onDelete={handleDeleteOccupation}
            onEdit={(occupation) => navigate(`/admin/companies/${id}/occupations/${occupation.id}/edit`)}
          />
        </Card>
      </Space>
    </div>
  );
};

export default CompanyDetailsPage;
