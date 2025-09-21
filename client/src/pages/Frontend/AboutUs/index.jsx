import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Avatar, 
  Divider, 
  Button, 
  Typography,
  Tag,
  Progress,
  Modal,
  Statistic
} from 'antd';
import { 
  TeamOutlined, 
  HeartOutlined, 
  DollarOutlined, 
  GlobalOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
  PhoneOutlined,
  MailOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  UserOutlined,
  RiseOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;

const AboutUs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: 'Emma Wilson',
      role: 'Founder & Director',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: 'Passionate about social change with 8+ years in nonprofit leadership.',
      social: {
        linkedin: '#',
        twitter: '#',
      }
    },
    {
      name: 'James Rodriguez',
      role: 'Operations Manager',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: 'Ensures our initiatives reach those who need them most.',
      social: {
        linkedin: '#',
        twitter: '#',
      }
    },
    {
      name: 'Sophia Chen',
      role: 'Community Outreach',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: 'Builds partnerships with local communities and organizations.',
      social: {
        linkedin: '#',
        twitter: '#',
      }
    },
    {
      name: 'Marcus Johnson',
      role: 'Technology Lead',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: 'Develops the platform that makes giving accessible to everyone.',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    }
  ];

  // Values for donation app
  const values = [
    {
      icon: <HeartOutlined className="text-3xl" />,
      title: 'Compassion',
      description: 'We approach every project with empathy and understanding for those we serve.'
    },
    {
      icon: <GlobalOutlined className="text-3xl" />,
      title: 'Global Impact',
      description: 'We believe in creating positive change that transcends borders and communities.'
    },
    {
      icon: <CheckCircleOutlined className="text-3xl" />,
      title: 'Transparency',
      description: 'We maintain open books and clear reporting so donors know exactly where their money goes.'
    },
    {
      icon: <RiseOutlined className="text-3xl" />,
      title: 'Sustainability',
      description: 'We focus on long-term solutions that create lasting change in communities.'
    }
  ];

  // Impact statistics
  const impactStats = [
    { number: '250K+', text: 'Lives Impacted' },
    { number: '45+', text: 'Countries Reached' },
    { number: '98%', text: 'Funds Donated Directly to Causes' },
    { number: '500+', text: 'Projects Funded' }
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-500 to-cyan-600 text-white overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 mr-16 opacity-10">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <path fill="currentColor" d="M45.1,-58.8C63.4,-45.2,85.4,-36.9,91.9,-20.4C98.5,-3.9,89.6,20.9,75.2,39.4C60.8,57.8,40.9,70,19.8,75.8C-1.3,81.6,-23.6,81.1,-39.3,69.2C-55.1,57.3,-64.2,34.1,-68.8,9.4C-73.5,-15.4,-73.6,-41.5,-61.5,-57.7C-49.4,-73.9,-24.7,-80.1,-3.5,-77.6C17.7,-75,35.4,-63.7,45.1,-58.8Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Making Giving Simple & Impactful</h1>
            <p className="text-xl opacity-90 mb-10">
              We connect generous donors with meaningful causes to create positive change in communities around the world.
            </p>
            <Button 
              size="large" 
              className="bg-white text-teal-600 border-0 font-semibold h-12 px-8 rounded-full hover:bg-teal-50 transition-all duration-300"
              icon={<ArrowRightOutlined />}
            >
              Donate Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 container mx-auto px-4">
        <Row gutter={[48, 48]} className="items-center">
          <Col xs={24} lg={12}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={loaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <Tag color="teal" className="mb-4 text-sm font-semibold px-3 py-1">OUR MISSION</Tag>
              <Title level={2} className="font-bold mb-6">Empowering Generosity, Transforming Lives</Title>
              <Paragraph className="text-lg text-gray-700 mb-6">
                Founded in 2017, our donation platform was created with one simple goal: to make giving accessible, 
                transparent, and impactful. We believe that everyone should have the opportunity to make a difference, 
                no matter the size of their contribution.
              </Paragraph>
              <Paragraph className="text-lg text-gray-700 mb-6">
                We've built a trusted platform where 98% of every donation goes directly to the causes you care about, 
                with minimal overhead costs. Our technology ensures that your generosity reaches those who need it most.
              </Paragraph>
              <div className="flex items-center mt-10">
                <Button 
                  type="primary" 
                  size="large" 
                  className="bg-teal-500 border-teal-500 h-12 px-8 rounded-lg mr-4 font-semibold hover:bg-teal-600 transition-colors duration-300"
                  onClick={showModal}
                  icon={<PlayCircleOutlined />}
                >
                  Our Story
                </Button>
                <Button 
                  size="large" 
                  className="h-12 px-8 rounded-lg font-semibold transition-colors duration-300"
                >
                  See Impact
                </Button>
              </div>
            </motion.div>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={loaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white p-2 rounded-2xl shadow-xl transform rotate-2">
                <div className="h-96 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl overflow-hidden">
                  <div className="h-full flex items-center justify-center text-white text-center p-8">
                    <div>
                      <div className="text-6xl font-bold mb-2">5+</div>
                      <div className="text-xl">Years of Service</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg w-40">
                <div className="text-teal-600 font-bold text-2xl">$15M+</div>
                <div className="text-gray-600">Donations</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg w-40">
                <div className="text-teal-600 font-bold text-2xl">98%</div>
                <div className="text-gray-600">To Causes</div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <Row gutter={[32, 32]}>
            {impactStats.map((stat, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={loaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Statistic
                    value={stat.number}
                    valueStyle={{ color: '#0d9488', fontSize: '42px', fontWeight: 'bold' }}
                  />
                  <div className="text-lg text-gray-600 mt-2">{stat.text}</div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <Tag color="teal" className="mb-4 text-sm font-semibold px-3 py-1">OUR VALUES</Tag>
            <Title level={2} className="font-bold mb-4">What Guides Our Work</Title>
            <Text className="text-lg text-gray-600">
              These core principles shape everything we do, from selecting partners to distributing funds.
            </Text>
          </motion.div>
          
          <Row gutter={[32, 32]}>
            {values.map((value, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={loaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-2xl"
                    bodyStyle={{ padding: '32px 24px' }}
                    hoverable
                  >
                    <div className="text-teal-500 mb-6 flex justify-center">
                      {value.icon}
                    </div>
                    <Title level={4} className="font-semibold mb-4">{value.title}</Title>
                    <Text className="text-gray-600">{value.description}</Text>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Tag color="teal" className="mb-4 text-sm font-semibold px-3 py-1">OUR PROCESS</Tag>
          <Title level={2} className="font-bold mb-4">How Your Donation Makes an Impact</Title>
        </motion.div>
        
        <Row gutter={[48, 48]}>
          <Col xs={24} lg={12}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={loaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              {[
                {
                  title: "1. You Donate",
                  description: "Choose from vetted causes and make a secure donation through our platform."
                },
                {
                  title: "2. We Verify",
                  description: "Our team carefully reviews each organization and project to ensure legitimacy."
                },
                {
                  title: "3. Funds Distributed",
                  description: "98% of your donation goes directly to the cause, with minimal processing fees."
                },
                {
                  title: "4. Impact Created",
                  description: "Receive updates on how your contribution is making a tangible difference."
                }
              ].map((step, index) => (
                <div key={index} className="mb-10 flex">
                  <div className="bg-teal-100 text-teal-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-6">
                    {index + 1}
                  </div>
                  <div>
                    <Title level={4} className="font-semibold mb-2">{step.title}</Title>
                    <Text className="text-gray-600">{step.description}</Text>
                  </div>
                </div>
              ))}
            </motion.div>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={loaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-8 h-full text-white"
            >
              <Title level={3} className="text-white font-bold mb-6">Financial Transparency</Title>
              
              <div className="space-y-6 mb-8">
                {[
                  "98% of donations go directly to programs",
                  "1% covers payment processing fees",
                  "1% supports platform maintenance",
                  "Annual independent financial audits",
                  "Real-time donation tracking"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleOutlined className="text-teal-200 mr-4 mt-1" />
                    <Text className="text-white text-opacity-90 text-lg">{item}</Text>
                  </div>
                ))}
              </div>
              
              <Button 
                size="large" 
                className="mt-6 bg-white text-teal-600 border-0 font-semibold h-12 px-8 rounded-lg hover:bg-teal-50 transition-all duration-300"
              >
                View Financial Reports
              </Button>
            </motion.div>
          </Col>
        </Row>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <Title level={2} className="text-white font-bold mb-6">Join Us in Making a Difference</Title>
            <Paragraph className="text-xl opacity-90 mb-10">
              Your donation, no matter the size, can transform lives and create lasting change in communities worldwide.
            </Paragraph>
            <Button 
              size="large" 
              className="bg-white  text-teal-600 border-0 font-semibold h-12 px-8 rounded-lg mr-4 hover:bg-teal-50 transition-all duration-300"
            >
              Donate Now
            </Button>
            <Button 
              size="large" 
              className="bg-transparent text-white border-white h-12 px-8 rounded-lg hover:bg-white hover:text-teal-600 transition-all duration-300"
            >
              Partner With Us
            </Button>
          </motion.div>
        </div>
      </section>      
    </div>
  );
};

export default AboutUs;