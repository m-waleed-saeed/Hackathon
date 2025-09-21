import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Row, 
  Col, 
  Progress, 
  Tag, 
  Image, 
  message, 
  Spin,
  Divider,
  Typography,
  Space,
  Modal,
  Form,
  InputNumber,
  List,
  Avatar,
  Input,
} from 'antd';
import { 
  ArrowLeftOutlined, 
  HeartOutlined, 
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  ShareAltOutlined,
  GiftOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { baseURL } from '../../../redux/store';

const { Title, Paragraph, Text } = Typography;

const CampaignInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [donateModalVisible, setDonateModalVisible] = useState(false);
  const [donateLoading, setDonateLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCampaignDetails();
    fetchDonations();
  }, [id]);

  const fetchCampaignDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/campaigns/${id}`);
      setCampaign(data.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch campaign details");
      navigate('/campaigns');
    } finally {
      setLoading(false);
    }
  };

  const fetchDonations = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/campaigns/${id}`);
      setDonations(data.data || []);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch donations");
    }
  };

  const handleDonate = async (values) => {
    setDonateLoading(true);
    try {
      await axios.post(`${baseURL}/donations`, {
        campaignId: id,
        amount: values.amount,
        message: values.message || ''
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      message.success(`Thank you for your donation of $${values.amount}!`);
      setDonateModalVisible(false);
      form.resetFields();
      
      // Refresh campaign data and donations
      fetchCampaignDetails();
      fetchDonations();
    } catch (error) {
      console.error(error);
      message.error("Donation failed. Please try again.");
    } finally {
      setDonateLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      health: 'red',
      education: 'blue',
      disaster: 'orange',
      others: 'green'
    };
    return colors[category] || 'default';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Title level={2}>Campaign not found</Title>
        <Button type="primary" onClick={() => navigate('/campaigns')}>
          Back to Campaigns
        </Button>
      </div>
    );
  }

  const progressPercentage = Math.round((campaign.raisedAmount / campaign.goalAmount) * 100);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/campaigns')}
          style={{ marginBottom: '16px' }}
        >
          Back to Campaigns
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card>
            {/* Image Gallery */}
            <div style={{ marginBottom: '24px' }}>
              {campaign.images && campaign.images.length > 0 ? (
                <Image.PreviewGroup>
                  <Row gutter={[8, 8]}>
                    {campaign.images.map((image, index) => (
                      <Col key={index} xs={24} sm={12} md={8}>
                        <Image
                          src={image}
                          alt={`${campaign.title} ${index + 1}`}
                          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </Col>
                    ))}
                  </Row>
                </Image.PreviewGroup>
              ) : (
                <div style={{ 
                  height: '300px', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px'
                }}>
                  <HeartOutlined style={{ fontSize: '64px', color: '#ccc' }} />
                </div>
              )}
            </div>

            {/* Campaign Content */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <Title level={1} style={{ margin: 0 }}>
                  {campaign.title}
                </Title>
                <Tag 
                  color={getCategoryColor(campaign.category)} 
                  style={{ fontSize: '14px', padding: '4px 12px' }}
                >
                  {campaign.category?.toUpperCase()}
                </Tag>
              </div>

              <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
                {campaign.description}
              </Paragraph>

              <Divider />

              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarOutlined style={{ color: '#1890ff' }} />
                  <Text>Created on {formatDate(campaign.createdAt)}</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserOutlined style={{ color: '#1890ff' }} />
                  <Text>By {campaign.createdBy?.name || 'Anonymous'}</Text>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Donations */}
          <Card title="Recent Donations" style={{ marginTop: '24px' }}>
            {donations.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={donations.slice(0, 5)}
                renderItem={(donation) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={donation.donorId?.name || 'Anonymous Donor'}
                      description={
                        <div>
                          <div>Donated {formatCurrency(donation.amount)}</div>
                          {donation.message && (
                            <div style={{ fontStyle: 'italic', marginTop: '4px' }}>
                              "{donation.message}"
                            </div>
                          )}
                          <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                            {formatDate(donation.date)}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                <GiftOutlined style={{ fontSize: '32px', marginBottom: '8px' }} />
                <div>No donations yet. Be the first to support this campaign!</div>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Text strong>Raised: {formatCurrency(campaign.raisedAmount)}</Text>
                  <Text strong>Goal: {formatCurrency(campaign.goalAmount)}</Text>
                </div>
                <Progress 
                  percent={progressPercentage} 
                  strokeColor="#52c41a"
                  style={{ marginBottom: '8px' }}
                />
                <Text type="secondary">{progressPercentage}% funded</Text>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button 
                  type="primary" 
                  size="large"
                  onClick={() => setDonateModalVisible(true)}
                  icon={<HeartOutlined />}
                  style={{ height: '48px', fontSize: '16px' }}
                >
                  Donate Now
                </Button>
                <Button 
                  size="large"
                  icon={<ShareAltOutlined />}
                >
                  Share Campaign
                </Button>
              </div>
            </div>
          </Card>

          {/* Campaign Info Card */}
          <Card title="Campaign Details" style={{ marginTop: '24px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Category:</Text>
                <Text strong>{campaign.category}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Status:</Text>
                <Tag color={campaign.status === 'active' ? 'green' : 'red'}>
                  {campaign.status?.toUpperCase()}
                </Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Created:</Text>
                <Text>{formatDate(campaign.createdAt)}</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Donation Modal */}
      <Modal
        title={`Donate to ${campaign.title}`}
        open={donateModalVisible}
        onCancel={() => {
          setDonateModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleDonate}
        >
          <Form.Item
            name="amount"
            label="Donation Amount"
            rules={[{ required: true, message: 'Please enter donation amount' }]}
          >
            <InputNumber
              min={1}
              placeholder="Enter amount"
              style={{ width: '100%' }}
              prefix="$"
            />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message (Optional)"
          >
            <Input.TextArea 
              placeholder="Add an encouraging message"
              rows={3}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={donateLoading}
              style={{ width: '100%' }}
            >
              Donate Now
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CampaignInfo;