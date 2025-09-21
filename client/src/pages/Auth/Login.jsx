import React, { useState } from "react";
import { Typography, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import axios from "axios";

const { Title } = Typography;

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = e => setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    const { email, password } = state;
    if (!email || !password) return message.error("Please fill all fields.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return message.error("Please provide a valid email.");

    try {
      dispatch(loginStart());

      const response = await axios.post(`${baseURL}/auth/login`, { email, password });
      console.log("Response from backend:", response.data);

      if (response.data.success) {
        const { token, user } = response.data

        if (!token || !user) {
          console.error("Missing token or user in response");
          return message.error("Invalid server response");
        }
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        message.success("Logged in successfully!");
        dispatch(loginSuccess({ user, token }));
        navigate("/");
        setState(initialState);
      } else {
        dispatch(loginFailure(response.data.message));
        message.error(response.data.message);
      }
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || "Login failed"));
      message.error(err.response?.data?.message || "Login failed");
    }

  };


  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <Title level={3} className="!m-0 text-center text-gray-800">
          Login
        </Title>

        <p className="text-sm text-gray-500 text-center mt-1 mb-4">
          Minimal login - no fuss.
        </p>

        <Form
          layout="vertical"
          className="space-y-3"
          onFinish={handleSubmit}
          noValidate
        >

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
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isLoading}
              className="rounded-md h-12"
            >
              Login
            </Button>
          </Form.Item>

          <div className="text-center text-xs text-gray-400">
            <p> Don't have an account? <Link to="/auth/register" className="text-teal-500">Register</Link></p>
            <br />
            <p> Forgot your password? <Link to="/auth/forgot-password" className="text-teal-500">Forgot password?</Link></p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
