import { Layout, Typography, Card, Button, Space } from 'antd';
import { DollarOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { paths } from '../routes';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  const handleWorkerLogin = () => {
    navigate(paths.auth.signIn);
  };

  const handleAdminLogin = () => {
    navigate(paths.auth.signIn + '?type=admin');
  };

  const handleSignIn = () => {
    navigate(paths.auth.signIn);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DollarOutlined style={{ fontSize: '24px', color: '#FF6B35', marginRight: '12px' }} />
          <Title level={3} style={{ margin: 0, color: 'white' }}>
            Pay On Demand
          </Title>
        </div>
        <Space>
          <Button type="text" icon={<UserOutlined />} style={{ color: 'white' }} onClick={handleSignIn}>
            Login
          </Button>
        </Space>
      </Header>

      <Content style={{ padding: '24px', flex: 1 }}>
        <div className="container-responsive">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title level={1} className="text-gradient">
              Welcome to Pay On Demand
            </Title>
            <Paragraph style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
              Access your earned salary on-demand. Manage your finances with flexibility and control.
            </Paragraph>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '48px',
            }}
          >
            <Card
              className="card-hover shadow-soft"
              title="For Workers"
              extra={<UserOutlined style={{ color: '#4A90E2' }} />}
            >
              <Paragraph>
                Access your accumulated earnings instantly. Submit withdrawal requests and track your financial
                progress.
              </Paragraph>
              <Button type="primary" size="large" block onClick={handleWorkerLogin}>
                Worker Dashboard
              </Button>
            </Card>

            <Card
              className="card-hover shadow-soft"
              title="For Administrators"
              extra={<SettingOutlined style={{ color: '#4A90E2' }} />}
            >
              <Paragraph>
                Manage companies, users, and approve pay requests. Complete administrative control over the system.
              </Paragraph>
              <Button type="primary" size="large" block onClick={handleAdminLogin}>
                Admin Dashboard
              </Button>
            </Card>
          </div>

          <Card className="shadow-medium" style={{ textAlign: 'center' }}>
            <Title level={3}>Ready to get started?</Title>
            <Paragraph>Sign in to access your dashboard and manage your on-demand salary requests.</Paragraph>
            <Space size="large">
              <Button type="primary" size="large" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button size="large">Learn More</Button>
            </Space>
          </Card>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#1E3A8A', color: 'white' }}>
        <Paragraph style={{ margin: 0, color: 'white' }}>
          Pay On Demand ©2024 - Empowering Financial Flexibility
        </Paragraph>
      </Footer>
    </Layout>
  );
};

export default HomePage;
