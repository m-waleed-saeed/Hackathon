import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, message, Upload, Select } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { baseURL } from "../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

const UpdateCampaignForm = () => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        if (campaign?.images) {
            // Preload existing images
            const preloadedFiles = campaign.images.map((url, index) => ({
                uid: `existing-${index}`,
                name: `Image ${index + 1}`,
                status: "done",
                url,
            }));
            setFiles(preloadedFiles);
        }
    }, [campaign]);

    const onFinish = async (values) => {
        setLoading(true);
        setUploading(true);

        try {
            // Upload only new images
            const uploadedUrls = [];
            for (let i = 0; i < files.length; i++) {
                if (files[i].originFileObj) {
                    const data = new FormData();
                    data.append("file", files[i].originFileObj);
                    data.append("upload_preset", "uploads");

                    const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dshqgvgne/image/upload", data);
                    uploadedUrls.push(uploadRes.data.secure_url);
                } else if (files[i].url) {
                    uploadedUrls.push(files[i].url); // keep existing images
                }
            }

            const token = localStorage.getItem("token");
            if (!token) {
                message.error("User not authenticated");
                return;
            }

            const payload = {
                ...values,
                images: uploadedUrls,
            };

           const res= await axios.put(`${baseURL}/campaigns/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCampaign(res.data.data);
            message.success("Campaign updated successfully!");
            navigate("/dashboard/owner");
        } catch (error) {
            console.error(error);
            message.error("Failed to update campaign!");
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
        <Form
            layout="vertical"
            onFinish={onFinish}
            className="max-w-3xl"
            initialValues={{
                title: campaign?.title,
                category: campaign?.category,
                description: campaign?.description,
                goalAmount: campaign?.goalAmount,
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Form.Item
                    name="title"
                    label="Campaign Title"
                    rules={[{ required: true, message: "Please enter campaign title" }]}
                >
                    <Input size="large" placeholder="Enter campaign title" value={campaign?.title} />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: "Please select category" }]}
                >
                    <Select size="large" placeholder="Select category" value={campaign?.category}>
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
                <TextArea rows={4} placeholder="Describe your campaign in detail..." size="large" value={campaign?.description} />
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
                    value={campaign?.goalAmount}
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

            <div className="flex space-x-4">
                <Button
                    type="default"
                    onClick={() => navigate("/dashboard/owner")}
                    size="large"
                    className="h-12 px-6 text-lg"
                >
                    Cancel
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading || uploading}
                    size="large"
                    icon={<PlusOutlined />}
                    className="bg-blue-600 hover:bg-blue-700 border-blue-600 h-12 px-6 text-lg"
                >
                    Update Campaign
                </Button>
            </div>
        </Form>
    );
};

export default UpdateCampaignForm;
