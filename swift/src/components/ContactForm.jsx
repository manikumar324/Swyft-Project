import React, { useState, useRef } from "react";
import { Modal, Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined, MessageOutlined, SyncOutlined } from "@ant-design/icons";
import Lottie from "react-lottie";
import Loader from "../assets/loaderemail.json"; // Placeholder animation for loading
import mailsent from "../assets/emailSuccess.json"; // Placeholder animation for success
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();
  const toastShownRef = useRef(false);

  const navigate = useNavigate()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultSuccessOptions = {
    loop: false,
    autoplay: true,
    animationData: mailsent,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log(values)
      await axios.post("https://swyft-server.onrender.com/contact", values);
      setLoading(false);
      setSuccess(true);
      form.resetFields();
      setTimeout(()=>{
        navigate("/")
      },3000)
    } catch (error) {
      if (!toastShownRef.current) {
        toast.error("An error occurred while sending the message.");
        toastShownRef.current = true;
      }
      setLoading(false);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/")
  };

  return (
    <>
      <Toaster />
      <Modal
        open={isModalVisible}
        footer={null}
        onCancel={handleOk}
        className="mx-auto"
      >
        {!success ? (
          <Form form={form} layout="vertical" name="contact_form">
            <Form.Item>
              <div className="text-center">
                {loading ? (
                  <Lottie options={defaultOptions} height={200} width={200} />
                ) : (
                  <h1 className="text-center font-semibold text-xl mt-4">
                    Contact Us
                  </h1>
                )}
              </div>
            </Form.Item>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }, { type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="suggestions"
              rules={[{ required: true, message: "Please input your message!" }]}
            >
              <Input.TextArea
                prefix={<MessageOutlined />}
                placeholder="Message"
                rows={4}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={handleSubmit}
                className="float-right"
                loading={loading}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div className="text-center">
            <Lottie options={defaultSuccessOptions} height={400} width={280} />
            <h1 className="text-green-600 text-2xl font-bold mt-4">Message Sent Successfully!</h1>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ContactForm;