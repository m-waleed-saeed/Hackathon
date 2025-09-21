import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeOutlined, 
  DollarOutlined,
  TeamOutlined, 
  MailOutlined,
  MessageOutlined,
  HeartOutlined,
  LogoutOutlined,
  UserOutlined,
  AppstoreOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme, Avatar, Dropdown } from 'antd';
import DashboardRoutes from './Routes';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';

const { Content, Sider } = Layout;

// Helper for menu items
function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
} 

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.user.currentUser);

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Map route paths to menu keys
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('owner')) return '1';
    if (path.includes('donations')) return '2';
    if (path.includes('users')) return '3';
    if (path.includes('subscribers')) return '4';
    if (path.includes('contact-messages')) return '5';
    if (path.includes('home-grid')) return '6';
    return '';
  };

  // Sidebar menu items
  const items = [
    getItem(<Link to="/dashboard/owner">My Campaigns</Link>, '1', <HomeOutlined />),
    getItem(<Link to="/dashboard/donations">Donations</Link>, '2', <DollarOutlined />),
    getItem(<Link to="/dashboard/users">Users</Link>, '3', <TeamOutlined />),
    getItem(<Link to="/dashboard/subscribers">Subscribers</Link>, '4', <MailOutlined />),
    getItem(<Link to="/dashboard/contact-messages">Contact Messages</Link>, '5', <MessageOutlined />),
    getItem(<Link to="/dashboard/home-grid">Home Grid</Link>, '6', <HeartOutlined />),
  ];

  // User dropdown menu
  const userMenuItems = [
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }} className="bg-teal-50">
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        }}
        theme="light"
        width={250}
        className="sidebar-teal"
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 mx-4 my-4">
          {collapsed ? (
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DC</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DC</span>
              </div>
              <span className="text-teal-800 font-bold text-xl">Donate And Care</span>
            </div>
          )}
        </div>

        {/* User Profile */}
        {!collapsed && user && (
          <div className="flex items-center px-4 py-3 mx-4 mb-4 bg-teal-100 rounded-lg">
            <Avatar 
              size="large" 
              src={user.avatar} 
              icon={<UserOutlined />} 
              className="bg-teal-500"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-teal-900 m-0">{user.name}</p>
              <p className="text-xs text-teal-600 m-0">{user.role}</p>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <Menu
          theme="light"
          selectedKeys={[getSelectedKey()]}
          mode="inline"
          items={items}
          className="px-2 border-none"
          style={{ background: 'transparent' }}
        />

        {/* Logout Button */}
        {!collapsed && (
          <div className="absolute bottom-4 w-full px-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center py-2 px-4 text-teal-700 hover:bg-teal-100 rounded-lg transition-colors duration-200"
            >
              <LogoutOutlined className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </Sider>

      {/* Content Area */}
      <Layout 
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: 'margin-left 0.2s',
          background: '#f0fdfa',
        }}
        className="min-h-screen"
      >
        {/* Header */}
        <div className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-teal-800 m-0">
            {getSelectedKey() === '1' && 'My Campaigns'}
            {getSelectedKey() === '2' && 'Donations'}
            {getSelectedKey() === '3' && 'Users'}
            {getSelectedKey() === '4' && 'Subscribers'}
            {getSelectedKey() === '5' && 'Contact Messages'}
            {getSelectedKey() === '6' && 'Home Grid'}
          </h1>
          
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <button className="flex items-center space-x-2 bg-teal-50 hover:bg-teal-100 rounded-full p-1 pl-3 transition-colors duration-200">
              <span className="text-sm font-medium text-teal-800">{user?.name}</span>
              <Avatar 
                size="default" 
                src={user?.avatar} 
                icon={<UserOutlined />} 
                className="bg-teal-500"
              />
            </button>
          </Dropdown>
        </div>

        {/* Main Content */}
        <Content className="p-6">
          <div
            className="min-h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm p-6"
            style={{
              background: colorBgContainer,
            }}
          >
            <DashboardRoutes />
          </div>
        </Content>
      </Layout>

      {/* Sidebar Styles */}
      <style jsx>{`
        .sidebar-teal .ant-menu-item {
          border-radius: 8px;
          margin: 4px 8px;
          height: 40px;
          line-height: 40px;
        }
        
        .sidebar-teal .ant-menu-item-selected {
          background-color: #0d9488 !important;
          color: white !important;
        }
        
        .sidebar-teal .ant-menu-item-selected .anticon {
          color: white !important;
        }
        
        .sidebar-teal .ant-menu-item:not(.ant-menu-item-selected):hover {
          background-color: #ccfbf1 !important;
          color: #0d9488 !important;
        }
        
        .sidebar-teal .ant-menu-item:not(.ant-menu-item-selected):hover .anticon {
          color: #0d9488 !important;
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;
