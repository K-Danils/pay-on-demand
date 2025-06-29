import { useNavigation } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const RouteLoader = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(249, 250, 251, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 32, color: '#4A90E2' }} spin />} size="large" />
        <div style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading...</div>
      </div>
    </div>
  );
};

export default RouteLoader;
