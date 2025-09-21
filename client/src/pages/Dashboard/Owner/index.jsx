import React, { useEffect, useState } from "react";
import { Table, message, Card, Row, Col, Modal, Button, Progress, Tag, Statistic, Image } from "antd";
import { EyeOutlined, DollarOutlined, UserOutlined, CalendarOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import AddCampaignForm from "./AddCampaignForm";  
import CampaignInfo from "../../Frontend/CampaignInfo";
import { baseURL } from "../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";

const Owner = () => {
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [editCampaign, setEditCampaign] = useState(null);
  const [campaignInfoVisible, setCampaignInfoVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [donationsLoading, setDonationsLoading] = useState(true);

  const navigate = useNavigate();
  
  const { id } = useParams();
  useEffect(() => {
    fetchCampaigns();
    fetchDonations();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/campaigns`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCampaigns(data.data || []);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchDonations = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/donor`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDonations(data.data || []);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch donations");
    } finally {
      setDonationsLoading(false);
    }
  };
  
  const handleDeleteCampaign = async (campaign) => {
    try {
      await axios.delete(`${baseURL}/campaigns/${campaign._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCampaigns();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete campaign");
    }
  };

  // Toggle active/inactive status
  const toggleCampaignStatus = async (campaign) => {
    try {
      const updatedStatus = campaign.status === "active" ? "inactive" : "active";
      await axios.patch(
        `${baseURL}/campaigns/${id}`,
        { status: updatedStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      message.success(`Campaign is now ${updatedStatus}`);
      fetchCampaigns(); // Refresh campaigns
    } catch (error) {
      console.error(error);
      message.error("Failed to update campaign status");
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

  const totalRaised = campaigns.reduce((sum, camp) => sum + camp.raisedAmount, 0);
  const totalDonations = donations.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Campaign Owner Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your campaigns and track donations</p>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card className="rounded-xl shadow-sm border-0 h-full text-center">
              <Statistic 
                title="Total Campaigns" 
                value={campaigns.length} 
                prefix={<EyeOutlined className="text-blue-500" />} 
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="rounded-xl shadow-sm border-0 h-full text-center">
              <Statistic 
                title="Total Raised" 
                value={totalRaised} 
                prefix={<DollarOutlined className="text-green-500" />} 
                precision={2} 
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="rounded-xl shadow-sm border-0 h-full text-center">
              <Statistic 
                title="Total Donations" 
                value={totalDonations} 
                prefix={<UserOutlined className="text-purple-500" />} 
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="rounded-xl shadow-sm border-0 h-full text-center">
              <Statistic 
                title="Active Campaigns" 
                value={activeCampaigns} 
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Add Campaign Form */}
        <Card 
          title={
            <div className="flex items-center">
              <PlusOutlined className="mr-2 text-green-500" />
              <span className="text-lg font-semibold">Create New Campaign</span>
            </div>
          } 
          bordered={false}
          className="rounded-xl shadow-sm mb-8"
        >
          <AddCampaignForm onSuccess={fetchCampaigns} />
        </Card>

        {/* My Campaigns */}
        <Card 
          title={
            <div className="flex items-center">
              <EyeOutlined className="mr-2 text-blue-500" />
              <span className="text-lg font-semibold">My Campaigns ({campaigns.length})</span>
            </div>
          } 
          bordered={false}
          className="rounded-xl shadow-sm mb-8"
          extra={
            <Button 
              icon={<EyeOutlined />} 
              onClick={fetchCampaigns}
              className="flex items-center"
            >
              Refresh
            </Button>
          }
        >
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading campaigns...</p>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-600">Create your first campaign to get started</p>
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {campaigns.map((camp) => {
                const progressPercentage = Math.round((camp.raisedAmount / camp.goalAmount) * 100);
                
                return (
                  <Col xs={24} sm={12} lg={8} key={camp._id}>
                    <Card 
                      hoverable
                      className="h-full border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
                      cover={
                        camp.images && camp.images.length > 0 ? (
                          <div className="h-48 overflow-hidden">
                            <Image
                              alt={camp.title}
                              src={camp.images[0]}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              preview={false}
                            />
                          </div>
                        ) : (
                          <div className="h-48 bg-gray-100 flex items-center justify-center">
                            <div className="text-gray-400 text-4xl">
                              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                        )
                      }
                      actions={[
                        <Button 
                          type="text" 
                          icon={<EyeOutlined />} 
                          onClick={() => {navigate(`/dashboard/owner/update-campaign/${camp._id}`); setEditCampaign(camp);}}
                          className="flex items-center"
                        >
                          Edit
                        </Button>,
                        <Button 
                          type="text" 
                          icon={<DeleteOutlined className="text-red-500" />} 
                          onClick={() => handleDeleteCampaign(camp)}
                          className="flex items-center"
                        >
                          Delete
                        </Button>
                      ]}
                    >
                      <div className="mb-3">
                        <Tag color={getCategoryColor(camp.category)} className="mb-2 rounded-md font-medium">
                          {camp.category?.charAt(0).toUpperCase() + camp.category?.slice(1)}
                        </Tag>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">{camp.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{camp.description}</p>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-700 mb-1">
                            <span>Raised: ${camp.raisedAmount?.toLocaleString()}</span>
                            <span>Goal: ${camp.goalAmount?.toLocaleString()}</span>
                          </div>
                          <Progress 
                            percent={progressPercentage} 
                            size="small" 
                            status="active" 
                            showInfo={false}
                            strokeColor={{
                              '0%': '#52c41a',
                              '100%': '#1890ff',
                            }}
                          />
                          <div className="text-right text-xs text-gray-500 mt-1">
                            {progressPercentage}% funded
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <div className="flex items-center">
                            <CalendarOutlined className="mr-1" />
                            {new Date(camp.createdAt).toLocaleDateString()}
                          </div>
                          {/* Clickable status tag */}
                          <Tag 
                            color={camp.status === 'active' ? 'green' : 'red'} 
                            className="rounded-full cursor-pointer"
                            onClick={() => toggleCampaignStatus(camp)}
                          >
                            {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
                          </Tag>
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Card>

        {/* Donations Received */}
        <Card 
          title={
            <div className="flex items-center">
              <DollarOutlined className="mr-2 text-green-500" />
              <span className="text-lg font-semibold">Donations Received ({donations.length})</span>
            </div>
          } 
          bordered={false}
          className="rounded-xl shadow-sm"
        >
          {donationsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading donations...</p>
            </div>
          ) : donations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No donations yet</h3>
              <p className="text-gray-600">Donations will appear here once you receive them</p>
            </div>
          ) : (
            <Table
              dataSource={donations}
              rowKey={(record) => record._id}
              columns={[
                { 
                  title: "Donor", 
                  dataIndex: ["donorId", "name"],
                  render: (name) => name || 'Anonymous',
                  key: 'donor'
                },
                { 
                  title: "Campaign", 
                  dataIndex: ["campaignId", "title"],
                  key: 'campaign',
                  render: (title) => title || 'Campaign deleted'
                },
                { 
                  title: "Amount", 
                  dataIndex: "amount",
                  key: 'amount',
                  render: (amount) => <span className="font-semibold text-green-600">${amount}</span>,
                  sorter: (a, b) => a.amount - b.amount,
                },
                { 
                  title: "Date", 
                  dataIndex: "date", 
                  key: 'date',
                  render: (date) => (
                    <div className="flex items-center text-gray-600">
                      <CalendarOutlined className="mr-2" />
                      {new Date(date).toLocaleDateString()}
                    </div>
                  ),
                  sorter: (a, b) => new Date(a.date) - new Date(b.date),
                  defaultSortOrder: 'descend',
                },
              ]}
              pagination={{ pageSize: 5 }}
              scroll={{ x: true }}
              className="rounded-lg overflow-hidden"
            />
          )}
        </Card>

        {/* Campaign Details Modal */}
        <Modal
          title={
            <div className="flex items-center">
              <EyeOutlined className="mr-2 text-blue-500" />
              <span className="text-xl font-semibold">Campaign Details</span>
            </div>
          }
          visible={campaignInfoVisible}
          onCancel={() => setCampaignInfoVisible(false)}
          footer={[
            <Button key="close" onClick={() => setCampaignInfoVisible(false)}>
              Close
            </Button>,
            <Button 
              key="donate" 
              type="primary" 
              icon={<DollarOutlined />}
              onClick={() => {
                setCampaignInfoVisible(false);
                setEditCampaign(selectedCampaign);
              }}
              className="bg-blue-600 hover:bg-blue-700 border-blue-600"
            >
              Donate to Campaign
            </Button>
          ]}
          width={800}
          className="rounded-lg"
        >
          {selectedCampaign && <CampaignInfo campaign={selectedCampaign} />}
        </Modal>
      </div>
    </div>
  );
};

export default Owner;
