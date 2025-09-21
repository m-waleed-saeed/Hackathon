import React, { useEffect, useState } from "react";
import { Table, Card, Row, Col, message, Tag, Statistic, Progress, Image } from "antd";
import { DollarOutlined, CalendarOutlined, HeartOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { baseURL } from "../../redux/store";

const Donations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalDonated: 0,
        totalDonations: 0,
        campaignsSupported: 0
    });

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${baseURL}/donor`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setDonations(data.data || []);
            
            // Calculate statistics
            const totalDonated = data.data.reduce((sum, donation) => sum + donation.amount, 0);
            const campaignsSupported = [...new Set(data.data.filter(d => d.campaignId).map(d => d.campaignId._id))].length;
            
            setStats({
                totalDonated,
                totalDonations: data.data.length,
                campaignsSupported
            });
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch donations");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: "Campaign",
            dataIndex: "campaignId",
            key: "campaign",
            render: (campaign, record) => (
                <div className="flex items-center">
                    {campaign ? (
                        <>
                            <div className="w-12 h-12 bg-gray-100 rounded-lg mr-3 overflow-hidden flex items-center justify-center">
                                {campaign.images && campaign.images.length > 0 ? (
                                    <Image
                                        src={campaign.images[0]}
                                        alt={campaign.title}
                                        className="w-full h-full object-cover"
                                        preview={false}
                                    />
                                ) : (
                                    <HeartOutlined className="text-gray-400 text-xl" />
                                )}
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">{campaign.title}</div>
                                <div className="text-sm text-gray-500">ID: {campaign._id?.substring(0, 8)}...</div>
                            </div>
                        </>
                    ) : (
                        <div className="text-gray-400">Campaign deleted</div>
                    )}
                </div>
            ),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => (
                <div className="flex items-center font-semibold text-green-600">
                    <DollarOutlined className="mr-1" />
                    {amount.toLocaleString()}
                </div>
            ),
            sorter: (a, b) => a.amount - b.amount,
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
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
            defaultSortOrder: 'descend',
        },
        {
            title: "Status",
            key: "status",
            render: () => (
                <Tag color="green" className="rounded-full px-3">
                    Completed
                </Tag>
            ),
        },
    ];

    // Get unique supported campaigns
    const supportedCampaigns = [
        ...new Map(
            donations
                .filter((d) => d.campaignId)
                .map((d) => [d.campaignId._id, d.campaignId])
        ).values(),
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Donations</h1>
                    <p className="text-gray-600 mt-2">Track your donation history and impact</p>
                </div>

                {/* Statistics Section */}
                <Row gutter={[16, 16]} className="mb-8">
                    <Col xs={24} sm={8}>
                        <Card className="rounded-xl shadow-sm border-0 h-full" bodyStyle={{ padding: '20px' }}>
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
                        <Card className="rounded-xl shadow-sm border-0 h-full" bodyStyle={{ padding: '20px' }}>
                            <Statistic
                                title="Total Donations"
                                value={stats.totalDonations}
                                valueStyle={{ color: '#1890ff' }}
                                className="text-center"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card className="rounded-xl shadow-sm border-0 h-full" bodyStyle={{ padding: '20px' }}>
                            <Statistic
                                title="Campaigns Supported"
                                value={stats.campaignsSupported}
                                valueStyle={{ color: '#722ed1' }}
                                className="text-center"
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Donation History Table */}
                <Card 
                    title={
                        <div className="flex items-center">
                            <EyeOutlined className="mr-2 text-blue-500" />
                            <span className="text-lg font-semibold">Donation History</span>
                        </div>
                    } 
                    bordered={false}
                    className="rounded-xl shadow-sm mb-8"
                    extra={
                        <button 
                            onClick={fetchDonations}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Refresh
                        </button>
                    }
                >
                    <Table
                        dataSource={donations}
                        rowKey={(record) => record._id}
                        columns={columns}
                        pagination={{ 
                            pageSize: 5, 
                            showSizeChanger: false,
                            showTotal: (total, range) => 
                                `${range[0]}-${range[1]} of ${total} donations`
                        }}
                        loading={loading}
                        scroll={{ x: true }}
                        className="rounded-lg overflow-hidden"
                    />
                </Card>

                {/* Supported Campaigns Section */}
                {supportedCampaigns.length > 0 && (
                    <Card 
                        title={
                            <div className="flex items-center">
                                <HeartOutlined className="mr-2 text-red-500" />
                                <span className="text-lg font-semibold">Campaigns You Supported</span>
                            </div>
                        } 
                        bordered={false}
                        className="rounded-xl shadow-sm"
                    >
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
                                            <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-1">{camp.title}</h3>
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
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Donations;