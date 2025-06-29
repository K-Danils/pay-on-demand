import { Typography, Card, Row, Col, Statistic, Button, List, Badge, Space } from 'antd';
import { DollarOutlined, CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const OverviewPage = () => {
  // Mock data - in real app this would come from API
  const availableFunds = 1850.75;
  const nextPayrollDate = '2024-02-15';
  const monthlyWage = 4200.0;
  const accumulatedThisMonth = 2450.3;

  const recentRequests = [
    { id: '1', amount: 300, status: 'approved', date: '2024-01-20' },
    { id: '2', amount: 150, status: 'pending', date: '2024-01-22' },
    { id: '3', amount: 200, status: 'approved', date: '2024-01-18' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'processing';
      case 'denied':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleOutlined />;
      case 'pending':
        return <ClockCircleOutlined />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Dashboard Overview</Title>
        <Paragraph type="secondary">Welcome back! Here's a summary of your current financial status.</Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Available Funds"
              value={availableFunds}
              precision={2}
              prefix={<DollarOutlined style={{ color: '#10B981' }} />}
              suffix="USD"
              valueStyle={{ color: '#10B981', fontWeight: 600 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Wage"
              value={monthlyWage}
              precision={2}
              prefix={<DollarOutlined style={{ color: '#4A90E2' }} />}
              suffix="USD"
              valueStyle={{ color: '#4A90E2', fontWeight: 600 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Accumulated This Month"
              value={accumulatedThisMonth}
              precision={2}
              prefix={<DollarOutlined style={{ color: '#FF6B35' }} />}
              suffix="USD"
              valueStyle={{ color: '#FF6B35', fontWeight: 600 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Next Payroll"
              value={nextPayrollDate}
              prefix={<CalendarOutlined style={{ color: '#1E3A8A' }} />}
              valueStyle={{ color: '#1E3A8A', fontWeight: 600 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={16}>
          <Card title="Recent Pay Requests" className="shadow-soft">
            <List
              dataSource={recentRequests}
              renderItem={(request) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Space>
                        <span>${request.amount.toFixed(2)}</span>
                        <Badge
                          status={getStatusColor(request.status) as any}
                          text={request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        />
                      </Space>
                    }
                    description={`Requested on ${request.date}`}
                    avatar={getStatusIcon(request.status)}
                  />
                </List.Item>
              )}
            />
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Button type="link">View All Requests</Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Quick Actions" className="shadow-soft">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Button type="primary" size="large" block icon={<DollarOutlined />}>
                Request Pay Advance
              </Button>
              <Button size="large" block icon={<CalendarOutlined />}>
                View Pay History
              </Button>
              <Button size="large" block icon={<CheckCircleOutlined />}>
                Update Account Info
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OverviewPage;
