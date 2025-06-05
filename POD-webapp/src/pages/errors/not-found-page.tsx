import React from 'react';
import { Layout, Typography, Button, Space } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../routes';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(paths.home);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <Content
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '500px' }}>
          <div style={{ marginBottom: '32px' }}>
            <Title level={1} style={{ fontSize: '120px', margin: 0, color: '#4A90E2' }}>
              404
            </Title>
            <Title level={2} style={{ marginBottom: '16px' }}>
              Page Not Found
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#666' }}>
              The page you're looking for doesn't exist or has been moved.
            </Paragraph>
          </div>

          <Space size='middle'>
            <Button type='primary' size='large' icon={<HomeOutlined />} onClick={handleGoHome}>
              Go Home
            </Button>
            <Button size='large' icon={<ArrowLeftOutlined />} onClick={handleGoBack}>
              Go Back
            </Button>
          </Space>
        </div>
      </Content>
    </Layout>
  );
};

export default NotFoundPage;
