import React, { useEffect, useState } from "react";
import { Table, Card, Row, Col, message, Spin, Progress, Tag, Statistic } from "antd";
import { DollarOutlined, HistoryOutlined, HeartOutlined, CalendarOutlined } from "@ant-design/icons";
import axios from "axios";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonated: 0,
    campaignsSupported: 0,
    recentDonations: 0
  });

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/donations/my", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDonations(data.data || []);
      
      // Calculate statistics
      const totalDonated = data.data.reduce((sum, donation) => sum + donation.amount, 0);
      const campaignsSupported = [...new Set(data.data.filter(d => d.campaignId).map(d => d.campaignId._id))].length;
      
      setStats({
        totalDonated,
        campaignsSupported,
        recentDonations: data.data.length
      });
    } catch (error) {
      console.error("Failed to fetch donations:", error);
      message.error("Failed to fetch donations");
    } finally {
      setLoading(false);
    }
  };

  const supportedCampaigns = [
    ...new Map(
      donations
        .filter((d) => d.campaignId)
        .map((d) => [d.campaignId._id, d.campaignId])
    ).values(),
  ];

  const columns = [
    {
      title: "Campaign",
      dataIndex: "campaignId",
      key: "campaign",
      render: (campaign, record) => (
        <div className="flex items-center">
          {campaign ? (
            <>
              <div className="w-10 h-10 bg-gray-200 rounded-md mr-3 overflow-hidden">
                {campaign.images && campaign.images.length > 0 ? (
                  <img 
                    src={campaign.images[0]} 
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100">
                    <HeartOutlined className="text-blue-500" />
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">{campaign.title}</div>
                <div className="text-sm text-gray-500">Donated: ${record.amount}</div>
              </div>
            </>
          ) : (
            <span>Campaign no longer exists</span>
          )}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <div className="flex items-center text-gray-600">
          <CalendarOutlined className="mr-2" />
          {new Date(date).toLocaleDateString()}
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color="green" className="rounded-full px-3">
          Completed
        </Tag>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your donations and supported campaigns</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Spin size="large" />
            <p className="mt-4 text-gray-600">Loading your donations...</p>
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <Row gutter={[16, 16]} className="mb-8">
              <Col xs={24} sm={8}>
                <Card className="rounded-xl shadow-sm border-0 h-full">
                  <Statistic
                    title="Total Donated"
                    value={stats.totalDonated}
                    precision={2}
                    prefix="$"
                    valueStyle={{ color: '#3f8600' }}
                    className="text-center"
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card className="rounded-xl shadow-sm border-0 h-full">
                  <Statistic
                    title="Campaigns Supported"
                    value={stats.campaignsSupported}
                    valueStyle={{ color: '#1890ff' }}
                    className="text-center"
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card className="rounded-xl shadow-sm border-0 h-full">
                  <Statistic
                    title="Total Donations"
                    value={stats.recentDonations}
                    valueStyle={{ color: '#722ed1' }}
                    className="text-center"
                  />
                </Card>
              </Col>
            </Row>

            {/* Donation History */}
            <Card 
              title={
                <div className="flex items-center">
                  <HistoryOutlined className="mr-2 text-blue-500" />
                  <span className="text-lg font-semibold">Donation History</span>
                </div>
              } 
              bordered={false}
              className="rounded-xl shadow-sm mb-8"
            >
              <Table
                dataSource={donations}
                rowKey={(record) => record._id}
                columns={columns}
                pagination={{ pageSize: 5 }}
                scroll={{ x: true }}
                className="rounded-lg overflow-hidden"
              />
            </Card>

            {/* Supported Campaigns */}
            <Card 
              title={
                <div className="flex items-center">
                  <HeartOutlined className="mr-2 text-red-500" />
                  <span className="text-lg font-semibold">Supported Campaigns</span>
                </div>
              } 
              bordered={false}
              className="rounded-xl shadow-sm"
            >
              {supportedCampaigns.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <HeartOutlined className="text-4xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns supported yet</h3>
                  <p className="text-gray-600">Your supported campaigns will appear here once you make donations</p>
                </div>
              ) : (
                <Row gutter={[16, 16]}>
                  {supportedCampaigns.map((camp) => {
                    const progressPercent = Math.min((camp.raisedAmount / camp.goalAmount) * 100, 100);
                    return (
                      <Col xs={24} md={12} lg={8} key={camp._id}>
                        <Card 
                          bordered={false} 
                          className="rounded-xl shadow-sm h-full hover:shadow-md transition-shadow duration-300"
                          cover={
                            <div className="h-40 overflow-hidden">
                              {camp.images && camp.images.length > 0 ? (
                                <img 
                                  alt={camp.title} 
                                  src={camp.images[0]} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <HeartOutlined className="text-3xl text-gray-400" />
                                </div>
                              )}
                            </div>
                          }
                        >
                          <h3 className="font-semibold text-lg mb-2 text-gray-900">{camp.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{camp.description}</p>
                          
                          <div className="mb-2">
                            <div className="flex justify-between text-sm text-gray-700 mb-1">
                              <span>Raised: ${camp.raisedAmount?.toLocaleString()}</span>
                              <span>Goal: ${camp.goalAmount?.toLocaleString()}</span>
                            </div>
                            <Progress 
                              percent={progressPercent} 
                              size="small" 
                              status="active" 
                              showInfo={false}
                              strokeColor={{
                                '0%': '#52c41a',
                                '100%': '#1890ff',
                              }}
                            />
                            <div className="text-right text-xs text-gray-500 mt-1">
                              {progressPercent.toFixed(0)}% funded
                            </div>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;