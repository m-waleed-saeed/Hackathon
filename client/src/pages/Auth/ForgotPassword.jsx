import React, { useState } from "react";
import { Typography, Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { baseURL } from "../../redux/store";
import axios from "axios";
const { Title } = Typography;

const ForgotPassword = () => {
    const [state, setState] = useState({ email: "" });
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = e => setState((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async () => {
        const { email } = state;
        if (!email) return message.error("Please fill field.");
        if (!/^\S+@\S+\.\S+$/.test(email)) return message.error("Please provide a valid email.");

        try {
            setIsProcessing(true);
            const response = await axios.post(`${baseURL}/auth/forgot-password`, { email });

            if (response.data.success) {
                message.success("Forgot password mail sent successfully!");
                setState({ email: "" });
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
        <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
                <Title level={3} className="!m-0 text-center text-gray-800">
                    Forgot Password
                </Title>

                <p className="text-sm text-gray-500 text-center mt-1 mb-4">
                    Minimal forgot password - no fuss.
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={isProcessing}
                            className="rounded-md h-12"
                        >
                            Send Reset Link
                        </Button>
                    </Form.Item>

                    <div className="text-center text-xs text-gray-400">
                        <p> Remember your password? <Link to="/auth/login" className="text-teal-500">Login</Link></p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;
