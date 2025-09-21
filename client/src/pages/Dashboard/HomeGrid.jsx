import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Upload, message, List, Image } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { baseURL } from "../../redux/store";

const { Dragger } = Upload;

const HomeGrid = () => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Fetch images
  useEffect(() => {
    axios.get(`${baseURL}/hero`).then((res) => setImages(res.data?.images || []));
  }, []);

  // Upload images to Cloudinary + save URLs to backend
  const handleUpload = async () => {
    if (!files || files.length === 0) {
      message.error("Please select images to upload!");
      return;
    }

    setUploading(true);
    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const data = new FormData();
        data.append("file", files[i]);
        data.append("upload_preset", "uploads");

        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dshqgvgne/image/upload", data);

        uploadedUrls.push(uploadRes.data.secure_url);
      }

      const res = await axios.post(`${baseURL}/hero/create`, { images: uploadedUrls });
      setImages(res.data?.images || []);
      message.success("Hero images updated!");
      setFiles([]);
    } catch (error) {
      console.error(error);
      message.error("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // Delete one image
  const handleDelete = async (url) => {
    try {
      const res = await axios.delete(`${baseURL}/hero/delete`, { data: { url } });
      setImages(res.data?.images || []);
      message.success("Image deleted!");
    } catch (error) {
      console.error(error);
      message.error("Delete failed!");
    }
  };

  // Clear all images
  const handleClear = async () => {
    try {
      const res = await axios.delete(`${baseURL}/hero/clear`);
      setImages(res.data?.images || []);
      message.success("All images cleared!");
    } catch (error) {
      console.error(error);
      message.error("Clear failed!");
    }
  };

  const uploadProps = {
    multiple: true,
    beforeUpload: (file, fileList) => {
      setFiles(fileList);
      return false; 
    },
  };

  return (
    <div style={{ display: "flex", gap: "24px" }}>
      {/* Left - Active Hero Images */}
      <Card title="Active Hero Images" style={{ flex: 1 }}>
        <List
          dataSource={images}
          renderItem={(img) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(img)}
                >
                  Delete
                </Button>,
              ]}
            >
              <Image width={120} height={100} src={img} style={{ objectFit: "cover" }} />
            </List.Item>
          )}
        />
        {images.length > 0 && (
          <Button danger onClick={handleClear} style={{ marginTop: "16px" }}>
            Clear All
          </Button>
        )}
      </Card>

      {/* Right - Upload Form */}
      <Card title="Upload New Hero Images" style={{ flex: 1 }}>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag multiple files here</p>
        </Dragger>

        {files.length > 0 &&
          files.map((file, i) => (
            <Image
              key={i}
              src={URL.createObjectURL(file)}
              alt="preview"
              style={{ maxHeight: "150px", marginTop: "10px" }}
            />
          ))}

        <Button
          type="primary"
          onClick={handleUpload}
          loading={uploading}
          style={{ marginTop: "16px" }}
        >
          Upload Images
        </Button>
      </Card>
    </div>
  );
};

export default HomeGrid;
