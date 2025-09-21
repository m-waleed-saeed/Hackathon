import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Divider, Avatar, Row, Col, Typography, Space, Tag, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, CrownOutlined, LogoutOutlined, SaveOutlined } from '@ant-design/icons';
import axios from 'axios';
import { logout, updateUser } from '../../../redux/userSlice';
import { baseURL } from '../../../redux/store';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const { Title, Text } = Typography;

const UserAccount = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isSaving, setIsSaving] = useState(false);


  const [state, setState] = useState({
    phone: '',
  });


  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        address: user.address || '',
      });
      setState({ phone: user.phone || '' });
    }
  }, [user, form]);

  const handleSave = async (values) => {
    if (!user) {
      message.error("User data not loaded yet!");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: state.phone,
        address: values.address,
      };

      const res = await axios.put(`${baseURL}/auth/update/${user._id}`, payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      dispatch(updateUser(res.data.user));

      form.setFieldsValue({
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        email: res.data.user.email,
        address: res.data.user.address || '',
      });
      setState({ phone: res.data.user.phone || '' });

      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Failed to update profile!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.1, when: "beforeChildren", staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#F8F4EA] py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-10">
          <Title level={1} className="!text-[#000000] !font-playfair">Your Account</Title>
          <Text className="text-gray-600">Manage your profile and account settings</Text>
        </motion.div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <motion.div variants={itemVariants}>
              <Card
                className="h-full rounded-xl border-none shadow-lg bg-white"
                bodyStyle={{ padding: 24 }}
              >
                <div className="flex flex-col items-center mb-6">
                  <Avatar size={80} icon={<UserOutlined />} className="bg-[#ff3333] mb-4" />
                  <Title level={3} className="!m-0 !text-[#000000] !font-playfair">
                    {user?.firstName} {user?.lastName}
                  </Title>
                  <Tag
                    icon={<CrownOutlined />}
                    color={user?.role === 'Admin' ? '#D4B14A' : '#9CB098'}
                    className="mt-2 rounded-full"
                  >
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </Tag>
                </div>

                <Divider className="!border-[#9CB098]" />

                <Space direction="vertical" size="middle" className="w-full">
                  <div className="flex items-center">
                    <MailOutlined className="text-[#ff3333] mr-3" />
                    <Text className="text-gray-800">{user?.email}</Text>
                  </div>
                  {user?.phone && (
                    <div className="flex items-center">
                      <PhoneOutlined className="text-[#ff3333] mr-3" />
                      <Text className="text-gray-800">{user?.phone}</Text>
                    </div>
                  )}
                  {user?.address && (
                    <div className="flex items-center">
                      <EnvironmentOutlined className="text-[#ff3333] mr-3" />
                      <Text className="text-gray-800">{user?.address}</Text>
                    </div>
                  )}
                </Space>
              </Card>
            </motion.div>
          </Col>

          {/* Account Settings */}
          <Col xs={24} lg={14}>
            <motion.div variants={itemVariants}>
              <Card
                title={<Title level={3} className="!m-0 !text-[#000000] !font-playfair">Account Settings</Title>}
                className="rounded-xl border-none shadow-lg bg-white"
                bodyStyle={{ padding: 24 }}
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSave}
                  className="account-form"
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                      >
                        <Input prefix={<UserOutlined className="text-[#9CB098]" />} placeholder="First Name" className="rounded-lg p-2" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                      >
                        <Input prefix={<UserOutlined className="text-[#9CB098]" />} placeholder="Last Name" className="rounded-lg p-2" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input prefix={<MailOutlined className="text-[#9CB098]" />} placeholder="Email" className="rounded-lg p-2" />
                  </Form.Item>

                  <Form.Item label="Telephone" name="phone">
                    <PhoneInput
                      country={'pk'}
                      value={state.phone}
                      onChange={(phone) => setState({ phone })}
                      inputStyle={{
                        width: '100%',
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #9CB098',
                        paddingLeft: '50px',
                        fontSize: '14px',
                      }}
                      buttonStyle={{
                        borderRadius: '8px 0 0 8px',
                        border: '1px solid #9CB098',
                        borderRight: '0',
                        top: '0',
                      }}
                      containerStyle={{
                        width: '100%',
                      }}
                    />
                  </Form.Item>


                  <Form.Item label="Address" name="address">
                    <Input prefix={<EnvironmentOutlined className="text-[#9CB098]" />} placeholder="Address" className="rounded-lg p-2" />
                  </Form.Item>

                  <Form.Item className="mb-6">
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={isSaving}
                      className="w-full h-12 rounded-lg bg-[#ff3333] border-none font-semibold text-white hover:bg-[#e62e2e] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Save Changes
                    </Button>
                  </Form.Item>

                  <Divider className="!border-[#9CB098]" />

                  <Form.Item className="mb-0">
                    <Button
                      icon={<LogoutOutlined />}
                      onClick={handleLogout}
                      className="w-full h-12 rounded-lg bg-white border border-[#ff3333] text-[#ff3333] font-semibold hover:bg-[#fff5f5] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Logout
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Montserrat:wght@400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .account-form .ant-form-item-label > label { font-family: 'Montserrat', sans-serif; font-weight: 600; color: #000000; }
        .account-form .ant-input { font-family: 'Montserrat', sans-serif; border: 1px solid #9CB098; border-radius: 8px; }
        .account-form .ant-input:focus, .account-form .ant-input-focused { border-color: #ff3333; box-shadow: 0 0 0 2px rgba(255, 51, 51, 0.2); }
        .account-form .ant-input-affix-wrapper:focus, .account-form .ant-input-affix-wrapper-focused { border-color: #ff3333; box-shadow: 0 0 0 2px rgba(255, 51, 51, 0.2); }
      `}</style>
    </motion.div>
  );
};

export default UserAccount;
