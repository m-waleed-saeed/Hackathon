import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/users");
      setUsers(res.data);
    } catch (error) {
      message.error("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      message.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete user");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "User ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => text || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">User Dashboard</h1>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="bg-white rounded-lg"
      />
    </div>
  );
};

export default Users;
