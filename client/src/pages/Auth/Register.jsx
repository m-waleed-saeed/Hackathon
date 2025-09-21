import React, { useState } from "react";
import { Typography, Form, Input, Button, message, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../redux/store";
import axios from "axios";

const { Title } = Typography;

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", };

const Register = () => {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const handleChange = e => setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    const { firstName, lastName, email, password, confirmPassword } = state;
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return message.error("Please fill all fields.");
    }
    
    if (password !== confirmPassword) return message.error("Passwords do not match.");

    if (!/^\S+@\S+\.\S+$/.test(email)) return message.error("Please provide a valid email.");

    setIsProcessing(true);
    try {
      const response = await axios.post(`${baseURL}/auth/register`, { firstName, lastName, email, password, confirmPassword });
    
      if (response.data.success) {
        message.success("Registered successfully");
        setState(initialState);
        navigate("/auth/login");
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error(err.response.data.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <Title level={3} className="!m-0 text-center text-gray-500">
          Create account
        </Title>

        <p className="text-sm text-gray-500 text-center mt-1 mb-4">
          Minimal register - no fuss.
        </p>

        <Form
          layout="vertical"
          className="space-y-3"
          onFinish={handleSubmit}
          noValidate
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item className="m-0">
                <Input
                  size="large"
                  placeholder="First name"
                  name="firstName"
                  value={state.firstName}
                  onChange={handleChange}
                  className="rounded-md"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item className="m-0">
                <Input
                  size="large"
                  placeholder="Last name"
                  name="lastName"
                  value={state.lastName}
                  onChange={handleChange}
                  className="rounded-md"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="m-0">
            <Input
              size="large"
              placeholder="Email address"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="rounded-md"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item className="m-0">
            <Input.Password
              size="large"
              placeholder="Password"
              name="password"
              value={state.password}
              onChange={handleChange}
              className="rounded-md"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item className="m-0">
            <Input.Password
              size="large"
              placeholder="Confirm password"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
              className="rounded-md"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item className="m-0">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isProcessing}
              className="rounded-md h-12"
            >
              Register
            </Button>
          </Form.Item>

          <div className="text-center text-xs text-gray-400">
            Already have an account? <Link to="/auth/login" className="text-teal-500">Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
