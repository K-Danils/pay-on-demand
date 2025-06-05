import React, { useState } from 'react';
import { Layout, Menu, Button, Dropdown, Avatar, Space, Typography } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  HistoryOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarOutlined,
  BankOutlined,
  TeamOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { paths } from '../../routes';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface DashboardLayoutProps {
  userType: 'worker' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isAdmin = userType === 'admin';

  // Menu items based on user type
  const workerMenuItems = [
    {
      key: paths.dashboard.overview,
      icon: <DashboardOutlined />,
      label: 'Overview',
    },
    {
      key: paths.dashboard.payRequests,
      icon: <DollarOutlined />,
      label: 'Pay Requests',
    },
    {
      key: paths.dashboard.history,
      icon: <HistoryOutlined />,
      label: 'History',
    },
    {
      key: paths.dashboard.account,
      icon: <UserOutlined />,
      label: 'Account',
    },
    {
      key: paths.dashboard.settings,
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const adminMenuItems = [
    {
      key: paths.admin.overview,
      icon: <DashboardOutlined />,
      label: 'Overview',
    },
    {
      key: paths.admin.payRequests,
      icon: <FileTextOutlined />,
      label: 'Pay Requests',
    },
    {
      key: paths.admin.companies,
      icon: <BankOutlined />,
      label: 'Companies',
    },
    {
      key: paths.admin.users,
      icon: <TeamOutlined />,
      label: 'Users',
    },
    {
      key: paths.admin.occupations,
      icon: <UserOutlined />,
      label: 'Occupations',
    },
    {
      key: paths.admin.settings,
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const menuItems = isAdmin ? adminMenuItems : workerMenuItems;

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
    navigate(paths.home);
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate(isAdmin ? paths.admin.settings : paths.dashboard.account),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const userDropdown = {
    items: userMenuItems,
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            height: '64px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <DollarOutlined style={{ fontSize: '24px', color: '#FF6B35' }} />
          {!collapsed && (
            <Text strong style={{ marginLeft: '12px', color: '#1E3A8A' }}>
              Pay On Demand
            </Text>
          )}
        </div>

        <Menu
          mode='inline'
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ border: 'none', paddingTop: '16px' }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px' }}
          />

          <Space>
            <Text type='secondary'>{isAdmin ? 'Administrator' : 'Worker'} Portal</Text>
            <Dropdown menu={userDropdown} placement='bottomRight'>
              <Button type='text' style={{ height: 'auto', padding: '4px 8px' }}>
                <Space>
                  <Avatar
                    icon={<UserOutlined />}
                    style={{ backgroundColor: '#4A90E2' }}
                    size='small'
                  />
                  <Text>John Doe</Text>
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </Header>

        <Content
          style={{
            margin: '24px',
            padding: '24px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
