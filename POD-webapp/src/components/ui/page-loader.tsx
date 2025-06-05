import React from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface PageLoaderProps {
  message?: string;
  size?: 'small' | 'default' | 'large';
  fullHeight?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  message = 'Loading...',
  size = 'large',
  fullHeight = false,
}) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: size === 'large' ? 32 : 24, color: '#4A90E2' }} spin />
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: fullHeight ? '100vh' : '200px',
        padding: '40px 20px',
        background: fullHeight ? '#F9FAFB' : 'transparent',
      }}
    >
      <Spin indicator={antIcon} size={size} style={{ marginBottom: '16px' }} />
      <Text type='secondary' style={{ fontSize: '14px' }}>
        {message}
      </Text>
    </div>
  );
};

export default PageLoader;
