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
  Modal
} from 'antd';
import { 
  TeamOutlined, 
  RocketOutlined, 
  TrophyOutlined, 
  HeartOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined
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
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: '10+ years of industry experience with a passion for innovative solutions.',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: 'Full-stack developer specializing in React and Node.js applications.',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Elena Rodriguez',
      role: 'Product Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: 'Creating beautiful and functional user experiences for over 8 years.',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'David Kim',
      role: 'Marketing Director',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: 'Expert in digital marketing strategies and brand development.',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    }
  ];

  // Company values
  const values = [
    {
      icon: <TeamOutlined className="text-3xl" />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and open communication to achieve extraordinary results.'
    },
    {
      icon: <RocketOutlined className="text-3xl" />,
      title: 'Innovation',
      description: 'We constantly push boundaries and explore new ideas to stay ahead of the curve.'
    },
    {
      icon: <TrophyOutlined className="text-3xl" />,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do, from product to customer service.'
    },
    {
      icon: <HeartOutlined className="text-3xl" />,
      title: 'Passion',
      description: 'We love what we do and are committed to making a positive impact through our work.'
    }
  ];

  // Skills data
  const skills = [
    { name: 'Product Design', percent: 92 },
    { name: 'Web Development', percent: 88 },
    { name: 'Mobile Applications', percent: 85 },
    { name: 'Data Analytics', percent: 78 }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Crafting Digital Excellence</h1>
            <p className="text-xl opacity-90 mb-10">
              We are a team of passionate creators, designers, and developers dedicated to building extraordinary digital experiences.
            </p>
            <Button 
              size="large" 
              className="bg-white text-teal-600 border-0 font-semibold h-12 px-8 rounded-full hover:bg-teal-50 transition-all duration-300"
              icon={<ArrowRightOutlined />}
            >
              Explore Our Work
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 container mx-auto px-4">
        <Row gutter={[48, 48]} className="items-center">
          <Col xs={24} lg={12}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={loaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <Tag color="teal" className="mb-4 text-sm font-semibold px-3 py-1">OUR STORY</Tag>
              <Title level={2} className="font-bold mb-6">From Vision to Reality</Title>
              <Paragraph className="text-lg text-gray-700 mb-6">
                Founded in 2015, our company began as a small startup with a big vision: to transform the way businesses 
                leverage technology for growth. What started as a team of three working out of a garage has now grown into 
                a thriving organization with over 50 employees.
              </Paragraph>
              <Paragraph className="text-lg text-gray-700 mb-6">
                Throughout our journey, we've remained committed to our core principles of innovation, quality, and 
                customer satisfaction. We've had the privilege of working with amazing clients across various industries.
              </Paragraph>
              <div className="flex items-center mt-10">
                <Button 
                  type="primary" 
                  size="large" 
                  className="bg-teal-500 border-teal-500 h-12 px-8 rounded-lg mr-4 font-semibold hover:bg-teal-600 transition-colors duration-300"
                  onClick={showModal}
                  icon={<PlayCircleOutlined />}
                >
                  Watch Our Story
                </Button>
                <Button 
                  size="large" 
                  className="h-12 px-8 rounded-lg font-semibold transition-colors duration-300"
                >
                  Read More
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
                      <div className="text-6xl font-bold mb-2">6+</div>
                      <div className="text-xl">Years of Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg w-40">
                <div className="text-teal-600 font-bold text-2xl">150+</div>
                <div className="text-gray-600">Projects</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg w-40">
                <div className="text-teal-600 font-bold text-2xl">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
            </motion.div>
          </Col>
        </Row>
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
            <Title level={2} className="font-bold mb-4">What We Stand For</Title>
            <Text className="text-lg text-gray-600">
              Our core values guide everything we do, from product development to client relationships.
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

      {/* Skills Section */}
      <section className="py-20 container mx-auto px-4">
        <Row gutter={[48, 48]}>
          <Col xs={24} lg={12}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={loaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <Tag color="teal" className="mb-4 text-sm font-semibold px-3 py-1">OUR EXPERTISE</Tag>
              <Title level={2} className="font-bold mb-6">Skills & Technologies</Title>
              <Paragraph className="text-lg text-gray-700 mb-10">
                We leverage cutting-edge technologies and methodologies to deliver exceptional results across various domains.
              </Paragraph>
              
              {skills.map((skill, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <Text className="font-semibold">{skill.name}</Text>
                    <Text className="text-teal-600 font-semibold">{skill.percent}%</Text>
                  </div>
                  <Progress 
                    percent={skill.percent} 
                    showInfo={false} 
                    strokeColor={{
                      '0%': '#0d9488',
                      '100%': '#0891b2',
                    }}
                    className="h-3 rounded-full"
                  />
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
              <Title level={3} className="text-white font-bold mb-6">Why Choose Us?</Title>
              
              <div className="space-y-6">
                {[
                  "End-to-end solutions from concept to deployment",
                  "Agile development methodology",
                  "Continuous support and maintenance",
                  "User-centered design approach",
                  "Cross-platform compatibility",
                  "Data-driven decision making"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-teal-400 bg-opacity-20 p-2 rounded-full mr-4">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <Text className="text-white text-opacity-90 text-lg">{item}</Text>
                  </div>
                ))}
              </div>
              
              <Button 
                size="large" 
                className="mt-10 bg-white text-teal-600 border-0 font-semibold h-12 px-8 rounded-lg hover:bg-teal-50 transition-all duration-300"
              >
                Our Process
              </Button>
            </motion.div>
          </Col>
        </Row>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <Tag color="teal" className="mb-4 text-sm font-semibold px-3 py-1">OUR TEAM</Tag>
            <Title level={2} className="font-bold mb-4">Meet The Experts</Title>
            <Text className="text-lg text-gray-600">
              Our talented team of professionals brings diverse expertise and a shared commitment to excellence.
            </Text>
          </motion.div>
          
          <Row gutter={[32, 32]}>
            {teamMembers.map((member, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={loaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    className="text-center border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full rounded-2xl overflow-hidden"
                    cover={
                      <div className="h-64 bg-gradient-to-br from-teal-400 to-cyan-500 relative overflow-hidden">
                        <Avatar 
                          size={160} 
                          src={member.avatar} 
                          className="absolute inset-0 m-auto border-4 border-white shadow-lg"
                        />
                      </div>
                    }
                  >
                    <Title level={4} className="mt-6 mb-1">{member.name}</Title>
                    <Text type="secondary" className="text-teal-600 font-semibold">{member.role}</Text>
                    <Paragraph className="mt-4 text-gray-600">{member.bio}</Paragraph>
                    
                    <div className="flex justify-center space-x-3 mt-6">
                      <Button 
                        type="text" 
                        icon={<LinkedinOutlined className="text-teal-600" />} 
                        className="rounded-full w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-teal-300"
                      />
                      <Button 
                        type="text" 
                        icon={<TwitterOutlined className="text-teal-600" />} 
                        className="rounded-full w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-teal-300"
                      />
                      <Button 
                        type="text" 
                        icon={<GithubOutlined className="text-teal-600" />} 
                        className="rounded-full w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-teal-300"
                      />
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
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
            <Title level={2} className="text-white font-bold mb-6">Ready to Start Your Project?</Title>
            <Paragraph className="text-xl opacity-90 mb-10">
              Let's collaborate to bring your ideas to life with our expertise and innovative approach.
            </Paragraph>
            <Button 
              size="large" 
              className="bg-white text-teal-600 border-0 font-semibold h-12 px-8 rounded-lg mr-4 hover:bg-teal-50 transition-all duration-300"
            >
              Get in Touch
            </Button>
            <Button 
              size="large" 
              className="bg-transparent text-white border-white h-12 px-8 rounded-lg hover:bg-white hover:text-teal-600 transition-all duration-300"
            >
              View Our Work
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <Modal
        title="Our Story"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={720}
        bodyStyle={{ padding: 0 }}
        className="rounded-lg overflow-hidden"
      >
        <div className="h-96 bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white">
          <div className="text-center">
            <PlayCircleOutlined className="text-6xl mb-4" />
            <div className="text-xl">Company Story Video</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AboutUs;