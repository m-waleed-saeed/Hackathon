import React, { useState } from "react";
import { Form, Input, InputNumber, Button, message, Upload, Select } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { baseURL } from "../../../redux/store";

const { Option } = Select;
const { TextArea } = Input;

const AddCampaignForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onFinish = async (values) => {
    if (files.length === 0) {
      message.error("Please select at least one image!");
      return;
    }

    setLoading(true);
    setUploading(true);
    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const data = new FormData();
        data.append("file", files[i]);
        data.append("upload_preset", "uploads");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dshqgvgne/image/upload",
          data
        );
        uploadedUrls.push(uploadRes.data.secure_url);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        message.error("User not authenticated");
        return;
      }
      const userId = JSON.parse(atob(token.split('.')[1]))._id;

      const payload = {
        ...values,
        images: uploadedUrls,
        createdBy: userId,
        createdAt: new Date(),
      };

      await axios.post(`${baseURL}/campaigns`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      message.success("Campaign created successfully!");
      setFiles([]);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      message.error("Failed to create campaign!");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      setFiles((prev) => [...prev, file]);
      return false;
    },
    onRemove: (file) => {
      setFiles((prev) => prev.filter((f) => f.uid !== file.uid));
    },
    multiple: true,
    fileList: files,
  };

  return (
    <Form layout="vertical" onFinish={onFinish} className="max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Form.Item
          name="title"
          label="Campaign Title"
          rules={[{ required: true, message: "Please enter campaign title" }]}
        >
          <Input size="large" placeholder="Enter campaign title" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select category" }]}
        >
          <Select size="large" placeholder="Select category">
            <Option value="health">Health</Option>
            <Option value="education">Education</Option>
            <Option value="disaster">Disaster Relief</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter description" }]}
        className="mb-6"
      >
        <TextArea 
          rows={4} 
          placeholder="Describe your campaign in detail..." 
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="goalAmount"
        label="Goal Amount ($)"
        rules={[{ required: true, message: "Please enter goal amount" }]}
        className="mb-6"
      >
        <InputNumber 
          min={1} 
          style={{ width: "100%" }} 
          size="large"
          placeholder="Enter amount in USD"
        />
      </Form.Item>

      <Form.Item label="Campaign Images" className="mb-6">
        <Upload {...uploadProps} listType="picture-card" className="upload-list-inline">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
        <p className="text-gray-500 text-sm mt-2">Upload at least one image for your campaign</p>
      </Form.Item>

      <Button 
        type="primary" 
        htmlType="submit" 
        loading={loading || uploading}
        size="large"
        icon={<PlusOutlined />}
        className="bg-blue-600 hover:bg-blue-700 border-blue-600 h-12 px-6 text-lg"
      >
        Create Campaign
      </Button>
    </Form>
  );
};

export default AddCampaignForm;