import React, { useState } from 'react';
import {
  MenuOutlined,
  UserOutlined,
  SearchOutlined, 
  LogoutOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import { Drawer, Dropdown, Avatar, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';



const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('home');

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userMenuItems = [
    {
      key: 'my-account',
      icon: <UserOutlined />,
      label: 'My Account',
      onClick: () => {
          navigate('/user-account');
      },
    },
    {
      key: 'my-orders',
      icon: <ShoppingOutlined />,
      label: 'My Donations',
      onClick: () => {
        navigate('/my-donations');
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      danger: true,
      label: 'Logout',
      onClick: () => {
        dispatch(logout());
      },
    }
  ];

  const navItems = [
    { key: 'home',path:'/', label: 'Home' },
    { key: 'products',path:'/campaigns', label: 'Campaigns' },
    { key: 'about',path:'/about-us', label: 'About Us' },
    { key: 'contact',path:'/contact-us', label: 'Contact' },
  ];

  return (
    <nav className="bg-teal-600 shadow-lg border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center">
            <button
              className="md:hidden rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuOutlined className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="logo pt-3 !text-white">Donate And Care</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentMenu === item.key
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  onClick={() => {
                    setCurrentMenu(item.key);
                    navigate(item.path);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="lg:hidden p-2 !  text-gray-600 hover:text-gray-900">
              <SearchOutlined className="h-5 w-5" />
            </button>
            {user ?
              <Dropdown
                menu={{ items: userMenuItems }}
                trigger={['click']}
                placement="bottomRight"
              >
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                  <Avatar
                    size="default"
                    icon={<UserOutlined />}
                    className="bg-blue-500"
                  />
                  <span className="hidden ml-1 sm:block text-sm font-medium text-gray-700">
                    {user?.firstName + " " + user?.lastName}
                  </span>
                </button>
              </Dropdown>
              :
              <Button type='primary' onClick={() => navigate('/auth/login')}>Login</Button>
            }
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={300}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`px-4 py-3 rounded-md text-left font-medium transition-colors duration-200 ${currentMenu === item.key
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              onClick={() => {
                setCurrentMenu(item.key);
                setIsDrawerOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile search input */}
          <div className="mt-4">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-full"
            />
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;