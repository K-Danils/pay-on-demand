import React, { useState } from 'react';
import { Layout, Card, Form, Input, Button, Typography, Space, Divider } from 'antd';
import { MailOutlined, DollarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paths } from '../../routes';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

interface SignInFormData {
  email: string;
}

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const isAdminLogin = searchParams.get('type') === 'admin';

  const onFinish = async (values: SignInFormData) => {
    setLoading(true);
    try {
      // TODO: Implement authentication logic
      console.log('Sign in attempt:', values, 'Admin:', isAdminLogin);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate based on user type
      if (isAdminLogin) {
        navigate(paths.admin.overview);
      } else {
        navigate(paths.dashboard.overview);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate(paths.home);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <Content
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Button
              type='text'
              icon={<ArrowLeftOutlined />}
              onClick={handleBackToHome}
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                color: '#4A90E2',
              }}
            >
              Back to Home
            </Button>

            <Space direction='vertical' size='small'>
              <DollarOutlined style={{ fontSize: '48px', color: '#FF6B35' }} />
              <Title level={2} style={{ margin: 0 }}>
                Pay On Demand
              </Title>
              <Text type='secondary'>
                {isAdminLogin ? 'Administrator Portal' : 'Worker Portal'}
              </Text>
            </Space>
          </div>

          <Card className='shadow-medium'>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Title level={3} style={{ marginBottom: '8px' }}>
                Sign In {isAdminLogin ? 'as Admin' : ''}
              </Title>
              <Paragraph type='secondary'>
                Enter your email to receive a secure sign-in link
              </Paragraph>
            </div>

            <Form name='signIn' layout='vertical' onFinish={onFinish} autoComplete='off'>
              <Form.Item
                label='Email Address'
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email address',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address',
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder='Enter your email' size='large' />
              </Form.Item>

              <Form.Item style={{ marginBottom: '16px' }}>
                <Button type='primary' htmlType='submit' size='large' block loading={loading}>
                  {loading ? 'Sending Sign-In Link...' : 'Send Sign-In Link'}
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <Space direction='vertical' size='small'>
                <Text type='secondary' style={{ fontSize: '12px' }}>
                  Secure email-based authentication powered by Firebase
                </Text>
                {!isAdminLogin && (
                  <>
                    <Divider type='vertical' />
                    <Button
                      type='link'
                      size='small'
                      onClick={() => navigate(paths.auth.signIn + '?type=admin')}
                    >
                      Sign in as Administrator
                    </Button>
                  </>
                )}
                {isAdminLogin && (
                  <>
                    <Divider type='vertical' />
                    <Button type='link' size='small' onClick={() => navigate(paths.auth.signIn)}>
                      Sign in as Worker
                    </Button>
                  </>
                )}
              </Space>
            </div>
          </Card>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Text type='secondary' style={{ fontSize: '12px' }}>
              Need help? Contact your system administrator
            </Text>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default SignInPage;
