import React, { useState } from "react";
import { Typography, Form, Input, Button, message, } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../../redux/store";
import axios from "axios";
const { Title } = Typography;

const initialState = {
    password: "",
    confirmPassword: "",
};

const ResetPassword = () => {
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);

    const { token } = useParams();

    const navigate = useNavigate();

    const handleChange = e => setState((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async () => {
        const { password, confirmPassword } = state;
        if (!password || !confirmPassword) return message.error("Please fill all fields.");

        if (password !== confirmPassword) return message.error("Passwords do not match.");

        try {
            setIsProcessing(true);
            const response = await axios.post(`${baseURL}/auth/reset-password/${token}`, { password });
            if (response.data.success) {
                message.success("Reset password successfully!");
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
                    Reset Password
                </Title>

                <p className="text-sm text-gray-500 text-center mt-1 mb-4">
                    Minimal reset password - no fuss.
                </p>

                <Form
                    layout="vertical"
                    className="space-y-3"
                    onFinish={handleSubmit}
                    noValidate
                >
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
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ResetPassword;
