import React from 'react';
import { Card, Button, Progress, Tag, Image } from 'antd';
import { EyeOutlined, HeartOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';

const CampaignCard = ({ campaign, navigate }) => {
  const handleCardClick = (e) => {
    e.preventDefault();
    navigate(`/campaign-info/${campaign._id}`);
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

  const progressPercentage = Math.round((campaign.raisedAmount / campaign.goalAmount) * 100);

  return (
    <Card
      onClick={handleCardClick}
      hoverable
      className="h-full border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      cover={
        <div className="relative h-48 overflow-hidden">
          {campaign.images && campaign.images.length > 0 ? (
            <Image
              src={campaign.images[0]}
              alt={campaign.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              preview={false}
              fallback="https://via.placeholder.com/300x200?text=No+Image"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <HeartOutlined className="text-4xl text-gray-400" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Tag 
              color={getCategoryColor(campaign.category)} 
              className="font-semibold border-0 px-2 py-1 rounded-md"
            >
              {campaign.category?.charAt(0).toUpperCase() + campaign.category?.slice(1)}
            </Tag>
          </div>
          <div className="absolute top-3 right-3 flex items-center bg-white bg-opacity-80 rounded-full px-2 py-1">
            <HeartOutlined className="text-red-500 mr-1" />
            <span className="text-sm font-medium">{campaign.likesCount || 0}</span>
          </div>
        </div>
      }
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 h-14 overflow-hidden">
            {campaign.title}
          </h3>
          
          <div className="flex items-center mb-3 text-sm text-gray-500">
            <UserOutlined className="mr-1" />
            <span className="truncate">{campaign.organizer?.name || 'Unknown Organizer'}</span>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-3 h-16 overflow-hidden">
            {campaign.description}
          </p>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span className="font-semibold flex items-center">
              <DollarOutlined className="mr-1 text-green-600" /> 
              ${campaign.raisedAmount?.toLocaleString()}
            </span>
            <span className="text-gray-500">
              raised of ${campaign.goalAmount?.toLocaleString()}
            </span>
          </div>
          
          <Progress 
            percent={progressPercentage} 
            showInfo={false}
            strokeColor={{
              '0%': '#52c41a',
              '100%': '#1890ff',
            }}
            className="mb-2"
          />
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{progressPercentage}% funded</span>
            <span className="text-xs font-medium text-blue-600">
              {campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : 'Completed'}
            </span>
          </div>
        </div>
        
        <Button 
          type="primary" 
          icon={<EyeOutlined />}
          onClick={handleCardClick}
          className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 h-10 font-medium"
          size="middle"
        >
          View Campaign
        </Button>
      </div>
    </Card>
  );
};

export default CampaignCard;