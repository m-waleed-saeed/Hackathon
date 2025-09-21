import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const TealSpinner = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48, color: '#0d9488' }} spin />;
  
  return (
    <div className="fixed inset-0 bg-teal-50/80 flex items-center justify-center z-50">
      <Spin indicator={antIcon} tip="Loading..." />
    </div>
  );
};

export default TealSpinner;