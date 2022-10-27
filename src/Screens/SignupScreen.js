import { Col, Form, Row, Input, Button, message } from "antd";
import React, { useState } from "react";
import axiosInstance from "../axiosInstance";


const SignupScreen = () => {
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();

  const onSignup = () => {
    const data = {
      email: email,
      name: fullname,
      mobile: mobile,
      password: password,
      address: address,
    };
    axiosInstance.post("/member", data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1 className="head">Sign up</h1>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              colon={false}
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input
                placeholder="Name"
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              colon={false}
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              colon={false}
              label="Mobile"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Please input your Mobile!",
                },
              ]}
            >
              <Input
                placeholder="Mobile"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              colon={false}
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              colon={false}
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your Address!",
                },
              ]}
            >
              <Input
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12}>
            <Button type="primary" shape="round" htmlType="submit" onClick={() => onSignup()}>
              Sign up
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SignupScreen;
