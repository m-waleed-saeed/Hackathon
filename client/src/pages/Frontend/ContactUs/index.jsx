import React, { useState } from 'react';
import { Form, Input, Button, message, Typography, Card, Row, Col, Divider } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, InstagramOutlined, FacebookOutlined, LinkedinOutlined, GithubOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import { baseURL } from '../../../redux/store';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const initialState = {
    fullName: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
}

const ContactUs = () => {
    const [form] = Form.useForm();
    const [isProcessing, setIsProcessing] = useState(false);
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        setState((s) => ({ ...s, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async () => {
        setIsProcessing(true);
        try {
          await axios.post(`${baseURL}/contacts`, state);
          message.success("Your message has been sent successfully!");
          form.resetFields();
          setState(initialState);
        } catch (error) {
          message.error(error.response.data.message);
        } finally {
          setIsProcessing(false);
        }
      };
      
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[95%]">
                {/* Heading */}
                <div className="text-center mb-12 transition-all duration-700">
                    <div className='mb-4 inline-flex p-4 bg-blue-100 rounded-full'>
                        <MailOutlined className='text-blue-600 text-3xl' />
                    </div>
                    <Title level={1} className="text-4xl font-bold text-gray-900 mb-4">
                        Get in Touch
                    </Title>
                    <Paragraph className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Have a project in mind or just want to say hello? We'd love to hear from you.
                    </Paragraph>
                </div>

                {/* Contact Section */}
                <Row gutter={[32, 32]} className="mb-20 items-stretch">
                    {/* Contact Information */}
                    <Col xs={24} md={8} className="flex">
                        <Card
                            className="h-full shadow-lg border-0 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl flex flex-col"
                            style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}
                        >
                            <Title level={3} className="text-xl font-semibold mb-8 text-gray-800">
                                Contact Information
                            </Title>

                            <div className="space-y-8">
                                <div className="flex items-start transition-transform duration-300 hover:-translate-y-1">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                                        <MailOutlined className="text-blue-600 text-lg" />
                                    </div>
                                    <div>
                                        <Text strong className="text-gray-700 block mb-1">Email</Text>
                                        <Paragraph className="text-gray-600 m-0">weedimian@gmail.com</Paragraph>
                                    </div>
                                </div>

                                <div className="flex items-start transition-transform duration-300 hover:-translate-y-1">
                                    <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                                        <PhoneOutlined className="text-green-600 text-lg" />
                                    </div>
                                    <div>
                                        <Text strong className="text-gray-700 block mb-1">Phone</Text>
                                        <Paragraph className="text-gray-600 m-0">+92 300 6629314</Paragraph>
                                    </div>
                                </div>

                                <div className="flex items-start transition-transform duration-300 hover:-translate-y-1">
                                    <div className="bg-purple-100 p-3 rounded-full mr-4 flex-shrink-0">
                                        <EnvironmentOutlined className="text-purple-600 text-lg" />
                                    </div>
                                    <div>
                                        <Text strong className="text-gray-700 block mb-1">Location</Text>
                                        <Paragraph className="text-gray-600 m-0">Saylani House، 3rd Floor, Chowk, Lal Mill Rd, Factory Area, Faisalabad</Paragraph>
                                    </div>
                                </div>
                            </div>

                            <Divider className="my-8" />
                            <Title level={5} className="text-lg font-medium mb-6 text-gray-800">
                                Follow Us
                            </Title>
                            <div className="flex justify-center space-x-5 mb-2">
                                <a href="https://www.instagram.com/m.waleed_saeed/" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                                    <InstagramOutlined className="text-xl" />
                                </a>

                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-800 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                                    <FacebookOutlined className="text-xl" />
                                </a>

                                <a href="https://www.linkedin.com/in/muhammad-waleed-7a42a3333" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-400 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                                    <LinkedinOutlined className="text-xl" />
                                </a>

                                <a href="https://github.com/m-waleed-saeed" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-900 hover:to-gray-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                                    <GithubOutlined className="text-xl" />
                                </a>
                            </div>
                        </Card>
                    </Col>

                    {/* Contact Form */}
                    <Col xs={24} md={16} className="flex">
                        <Card
                            className="h-full shadow-lg border-0 rounded-2xl overflow-hidden flex flex-col"
                            style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}
                        >
                            <Title level={3} className="text-xl font-semibold mb-8 text-gray-800">
                                Send us a Message
                            </Title>
                            <Form
                                layout="vertical"
                                className="space-y-3 flex-grow"
                                onFinish={handleSubmit}
                                noValidate
                            >
                                <Form.Item className="m-0">
                                    <Input
                                        size="large"
                                        placeholder="Full name"
                                        name="fullName"
                                        value={state.fullName}
                                        onChange={handleChange}
                                        className="rounded-md"
                                    />
                                </Form.Item>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item className="m-0">
                                            <Input
                                                size="large"
                                                placeholder="Email"
                                                name="email"
                                                value={state.email}
                                                onChange={handleChange}
                                                className="rounded-lg"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item >
                                            <PhoneInput
                                                country={'pk'}
                                                name='phone'
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

                                    </Col>
                                </Row>
                                <Form.Item className="m-0">
                                    <Input
                                        size="large"
                                        placeholder="Subject"
                                        name="subject"
                                        value={state.subject}
                                        onChange={handleChange}
                                        className="rounded-md"
                                    />
                                </Form.Item>

                                <Form.Item className="m-0">
                                    <TextArea
                                        rows={4}
                                        placeholder="Message"
                                        name="message"
                                        value={state.message}
                                        onChange={handleChange}
                                        className="rounded-md"
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
                                        Submit
                                    </Button>
                                </Form.Item>

                                <div className="text-center text-xs text-gray-400">
                                    Already have an account? <Link to="/auth/login" className="text-teal-500">Login</Link>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                {/* FAQ Section */}
                <div className="text-center mb-16">
                    <Title level={2} className="text-3xl font-bold text-gray-900 mb-6">
                        Frequently Asked Questions
                    </Title>
                    <Paragraph className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
                        Find quick answers to common questions about our services and processes.
                    </Paragraph>

                    <Row gutter={[32, 32]} className="mt-8">
                        {[
                            {
                                question: "What is your typical response time?",
                                answer: "We usually respond to emails within 24 hours on weekdays. For urgent matters, please mention 'URGENT' in your subject line."
                            },
                            {
                                question: "Do you work with international clients?",
                                answer: "Yes, we have experience working with clients from all over the world. We're comfortable with remote collaboration across time zones."
                            },
                            {
                                question: "What is your design process?",
                                answer: "Our process involves research, ideation, prototyping, and testing. We believe in iterative design and close collaboration with clients."
                            }
                        ].map((faq, index) => (
                            <Col xs={24} md={8} key={index}>
                                <Card
                                    className="h-full bg-white shadow-md border-0 rounded-2xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                                    bodyStyle={{ padding: '24px' }}
                                >
                                    <Title level={4} className="text-lg font-semibold text-gray-900 mb-4">
                                        {faq.question}
                                    </Title>
                                    <Paragraph className="text-gray-600">
                                        {faq.answer}
                                    </Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

                <Divider className="my-12" />

                {/* Map Section */}
                <div className="">
                    <Title level={2} className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        Find Us Here
                    </Title>
                    <Paragraph className="text-gray-600 text-lg max-w-2xl mx-auto mb-12 text-center">
                        Visit our office or drop by for a coffee and chat about your project.
                    </Paragraph>

                    <div className="w-full h-[450px] mt-8 rounded-2xl overflow-hidden shadow-xl">
                        <iframe
                            className="w-full h-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54495.746323570675!2d73.04504401734194!3d31.3870006937145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922681d444b32e1%3A0xc3887a0e53e91f7!2sSaylani%20Mass%20IT%20Training%20FSD!5e0!3m2!1sen!2s!4v1758199831102!5m2!1sen!2s"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
