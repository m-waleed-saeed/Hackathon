import React, { useEffect, useState } from "react";
import { Row, Col, message, Spin, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import CampaignCard from "../../../components/CampaignCard";
import { baseURL } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/campaigns/status/active`);
      setCampaigns(data.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = () => {
    navigate("/campaigns/create");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Active Campaigns
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Support causes that matter to you and make a difference in your community
          </p>
        </div>

        {/* Campaigns Grid */}
        {loading ? (
          <div className="text-center py-20">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            <p className="mt-4 text-gray-600">Loading campaigns...</p>
          </div>
        ) : campaigns.length > 0 ? (
          <Row gutter={[24, 24]}>
            {campaigns.map((campaign) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={campaign._id}>
                <div className="h-full transition-transform duration-300 hover:transform hover:scale-105">
                  <CampaignCard campaign={campaign} navigate={navigate} />
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No active campaigns</h3>
            <p className="text-gray-500 mb-6">There are no active campaigns at the moment. Check back later or start your own!</p>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateCampaign}
              className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
            >
              Create Campaign
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignList;