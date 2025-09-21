import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { baseURL } from "../../redux/store";

const Subscriber = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get(`${baseURL}/subscribers`);
        setSubscribers(res.data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };
    fetchSubscribers();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_, __, i) => i + 1,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subscribed At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subscribers Dashboard</h1>
      <Table
        columns={columns}
        dataSource={subscribers}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Subscriber;
