import React, { useState } from "react";
import axios from "axios";
import { Input, Button, message, Modal} from "antd";
import { MailOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";



const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      message.warning("Please enter your email!");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/subscribers", { email });
      setEmail("");
      setSuccessModal(true);
    } catch (error) {
      message.error("Subscription failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="py-20 px-6 text-center bg-gradient-to-b from-[#f0f9f7] to-[#e0f2ef] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#00927c] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-[#00927c] opacity-10 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-[#2d3436] font-poppins">
            Join Our <span className="text-[#00927c]">Newsletter</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg font-poppins">
            Get exclusive updates, offers, and premium content straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Input
              size="large"
              prefix={<MailOutlined className="text-[#00927c]" />}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-96 rounded-xl font-poppins"
            />
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
              className="px-6 rounded-xl font-poppins font-medium h-10"
            >
              Subscribe
            </Button>
          </form>
        </motion.div>

        {/* Success Modal */}
        <Modal
          open={successModal}
          onCancel={() => setSuccessModal(false)}
          footer={null}
          centered
          className="text-center rounded-xl"
          styles={{
            body: { padding: "30px 24px" },
            content: { borderRadius: "16px" }
          }}
        >
          <h3 className="text-2xl font-semibold text-[#00927c] mb-2 font-poppins">
            🎉 Subscribed!
          </h3>
          <p className="text-gray-600 font-poppins">
            Thank you for joining our community. Stay tuned for updates!
          </p>
        </Modal>
      </div>
  );
};

export default NewsletterSignup;