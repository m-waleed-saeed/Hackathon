import React, { useState } from 'react';
import { Layout, Row, Col, Divider, Input, Button, message } from 'antd';
import {
    FacebookOutlined,
    InstagramOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    CreditCardOutlined,
    ArrowRightOutlined,
    LinkedinOutlined,
    GithubOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Search } = Input;

const Details = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);


    const handleSubscribe = () => {
        if (!email || !email.includes('@')) {
            message.error({
                message: 'Invalid Email',
                description: 'Please enter a valid email address.',
            });
            return;
        }

        message.success({
            message: 'Subscription Successful',
            description: 'You have been subscribed to our newsletter!',
        });
        setEmail('');
    };

    return (
        <AntFooter className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Row gutter={[32, 32]}>
                    {/* Company Info & Newsletter */}
                    <Col xs={24} sm={24} lg={8}>
                        <h3 className="text-xl font-bold mb-4 text-teal-700">Weedimian</h3>
                        <p className="text-[#2d3436] leading-relaxed">Stay updated with our latest products and promotions.</p>
                        <div className="mb-6">
                            <div className="pt-6">
                                <h5 className="text-xl font-bold  tracking-wide text-teal-700 mb-3">Subscribe Now!</h5>
                                <form onSubmit={handleSubscribe}>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            className="w-full bg-white text-[#2d3436] px-4 py-3.5 border border-gray-300 rounded-[12px] 
                 focus:border-[#00927c] focus:outline-none focus:ring-2 focus:ring-[#00927c]  
                 transition-all font-[Poppins]"
                                        />

                                        <button
                                            type="submit"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 
                 bg-[#00927c] text-white px-5 py-2 rounded-[12px] text-base font-medium 
                 tracking-wide hover:brightness-110 hover:scale-[1.05] transition-all 
                 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0288d1]"
                                        >
                                            Subscribe
                                        </button>
                                    </div>
                                </form>

                                {subscribed && (
                                    <p className="mt-2 text-sm text-[#00c853] animate-pulse">
                                        Thank you for subscribing!
                                    </p>
                                )}
                            </div>


                        </div>

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

                    </Col>

                    {/* Customer Service */}
                    <Col xs={24} sm={24} lg={8}>
                        <h3 className="font-bold text-xl mb-4 text-teal-700">Help Center</h3>
                        <ul className="space-y-2">
                            <li><a href='/return-and-refund-policy.html' className='!text-[#2d3436]'><ArrowRightOutlined className="mr-1 text-xs" /> Returns & Exchanges</a></li>
                            <li><Link to='/about-us' className='!text-[#2d3436]'><ArrowRightOutlined className="mr-1 text-xs" /> About Us</Link></li>
                            <li><Link to='/faq' className='!text-[#2d3436]'><ArrowRightOutlined className="mr-1 text-xs" /> FAQ's</Link></li>
                            <li><a href='/privacy-policy.html' className='!text-[#2d3436]'><ArrowRightOutlined className="mr-1 text-xs" /> Privacy Policy</a></li>
                            <li><a href='/terms-and-conditions.html' className='!text-[#2d3436]'><ArrowRightOutlined className="mr-1 text-xs" /> Terms & Conditions</a></li>
                        </ul>
                    </Col>

                    {/* Contact Info */}
                    <Col xs={24} sm={24} lg={8}>
                        <h3 className="font-bold text-xl mb-4 text-teal-700">Contact Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <EnvironmentOutlined className="text-teal-600 mt-1" />
                                <span className="text-[#2d3436]">Lal Mill Rd, Factory Area, Faisalabad</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <PhoneOutlined className="text-teal-600" />
                                <span className="text-[#2d3436]">+92 300 6629413</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MailOutlined className="text-teal-600" />
                                <span className="text-[#2d3436]">weedimian@gmail.coms</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-bold text-xl text-teal-700 mb-3">We Accept</h4>
                            <div className="flex flex-wrap gap-2">
                                <div className="bg-white p-2 rounded-md">
                                    <CreditCardOutlined className="text-gray-700 text-2xl" />
                                </div>
                                <div className="bg-white p-2 rounded-md">
                                    <i className="fab fa-cc-visa text-2xl text-blue-800"></i>
                                </div>
                                <div className="bg-white p-2 rounded-md">
                                    <i className="fab fa-cc-mastercard text-2xl text-red-600"></i>
                                </div>
                                <div className="bg-white p-2 rounded-md">
                                    <i className="fab fa-cc-amex text-2xl text-blue-600"></i>
                                </div>
                                <div className="bg-white p-2 rounded-md">
                                    <i className="fab fa-cc-paypal text-2xl text-blue-700"></i>
                                </div>
                                <div className="bg-white p-2 rounded-md">
                                    <i className="fab fa-cc-apple-pay text-2xl text-gray-800"></i>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Divider className="bg-gray-700 my-8" />

                {/* Bottom Section */}
                <Row justify="space-between" align="middle">
                    <Col xs={24} md={12}>
                        <p className="text-teal-700 text-sm">
                            &copy; {new Date().getFullYear()}. All rights reserved. Developed by <b>Muhammad Waleed</b>.
                        </p>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="flex flex-wrap justify-start md:justify-end gap-4 mt-4 md:mt-0">
                            <a href="/privacy-policy.html" className="!text-[#2d3436] text-sm">
                                Privacy Policy
                            </a>
                            <a href="/terms-and-conditions.html" className="!text-[#2d3436] text-sm">
                                Terms of Service
                            </a>
                            <a href="/return-and-refund-policy.html" className="!text-[#2d3436] text-sm">
                                Return & Refund
                            </a>
                        </div>
                    </Col>
                </Row>
            </div>
        </AntFooter>
    );
};

export default Details;