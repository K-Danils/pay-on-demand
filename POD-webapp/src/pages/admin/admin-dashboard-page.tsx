import React from 'react';
import { Card, Row, Col, Typography, Space, Button, Statistic, Alert } from 'antd';
import {
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  TeamOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { usePaymentStats } from './payment-requests/hooks';

const { Title, Text } = Typography;

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { stats, loading, error } = usePaymentStats();

  const handleViewPaymentRequests = () => {
    navigate('/admin/payment-requests');
  };

  const handleViewCompanies = () => {
    navigate('/admin/companies');
  };

  if (error) {
    return (
      <div style={{ padding: '24px' }}>
        <Alert message="Error Loading Dashboard" description={error} type="error" showIcon />
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
              <Title level={2} style={{ margin: 0 }}>
                Admin Dashboard
              </Title>
              <Text type="secondary">Payment Requests Overview</Text>
            </Space>
            <Space>
              <Button type="primary" onClick={handleViewPaymentRequests}>
                Manage Payment Requests
              </Button>
              <Button onClick={handleViewCompanies}>Manage Companies</Button>
            </Space>
          </div>
        </Card>

        {/* Payment Request Statistics */}
        <Card title="Payment Request Statistics" loading={loading}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ backgroundColor: '#fff2e8' }}>
                <Statistic
                  title="Pending Requests"
                  value={stats?.pendingRequests || 0}
                  prefix={<ClockCircleOutlined style={{ color: '#fa8c16' }} />}
                  valueStyle={{ color: '#fa8c16' }}
                />
                <Text type="secondary">Awaiting approval</Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ backgroundColor: '#f6ffed' }}>
                <Statistic
                  title="Approved Requests"
                  value={stats?.approvedRequests || 0}
                  prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                  valueStyle={{ color: '#52c41a' }}
                />
                <Text type="secondary">Successfully approved</Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ backgroundColor: '#fff2f0' }}>
                <Statistic
                  title="Denied Requests"
                  value={stats?.deniedRequests || 0}
                  prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
                  valueStyle={{ color: '#ff4d4f' }}
                />
                <Text type="secondary">Rejected requests</Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} style={{ backgroundColor: '#f0f5ff' }}>
                <Statistic
                  title="Total Requests"
                  value={stats?.totalRequests || 0}
                  prefix={<DollarOutlined style={{ color: '#1890ff' }} />}
                  valueStyle={{ color: '#1890ff' }}
                />
                <Text type="secondary">All time total</Text>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Financial Overview */}
        <Card title="Financial Overview" loading={loading}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={8}>
              <Card bordered={false}>
                <Statistic
                  title="Total Amount Requested"
                  value={stats?.totalAmountRequested || 0}
                  prefix="$"
                  precision={2}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={8}>
              <Card bordered={false}>
                <Statistic
                  title="Total Amount Approved"
                  value={stats?.totalAmountApproved || 0}
                  prefix="$"
                  precision={2}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={8}>
              <Card bordered={false}>
                <Statistic
                  title="Average Request Amount"
                  value={stats?.avgRequestAmount || 0}
                  prefix="$"
                  precision={2}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center' }} onClick={handleViewPaymentRequests}>
                <Space direction="vertical">
                  <EyeOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                  <Title level={4}>View All Requests</Title>
                  <Text type="secondary">Manage pending payment requests</Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center' }} onClick={handleViewCompanies}>
                <Space direction="vertical">
                  <TeamOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
                  <Title level={4}>Manage Companies</Title>
                  <Text type="secondary">View and edit company information</Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center' }} onClick={() => navigate('/admin/users')}>
                <Space direction="vertical">
                  <BankOutlined style={{ fontSize: '32px', color: '#fa8c16' }} />
                  <Title level={4}>View Users</Title>
                  <Text type="secondary">Manage user accounts and roles</Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Recent Activity Summary */}
        {stats && stats.pendingRequests > 0 && (
          <Alert
            message="Action Required"
            description={`You have ${stats.pendingRequests} payment request${stats.pendingRequests === 1 ? '' : 's'} awaiting approval.`}
            type="warning"
            action={
              <Button size="small" type="primary" onClick={handleViewPaymentRequests}>
                Review Now
              </Button>
            }
            showIcon
          />
        )}
      </Space>
    </div>
  );
};

export default AdminDashboardPage;
