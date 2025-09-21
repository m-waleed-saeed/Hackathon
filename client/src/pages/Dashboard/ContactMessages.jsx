import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Typography } from "antd";

const { Title } = Typography;

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/contacts");
        setMessages(res.data.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Message", dataIndex: "message", key: "message" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt", render: (date) => new Date(date).toLocaleString() },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Contact Messages</Title>
      <Table
        columns={columns}
        dataSource={messages}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ContactMessages;
