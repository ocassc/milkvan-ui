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

  return (
    <div className="login-page-form">
      <h1 className="head">Signup</h1>

      <Form>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item colon={false}>
              <Input
                placeholder="Name"
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item colon={false}>
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
            <Form.Item colon={false}>
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
            <Form.Item colon={false}>
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
            <Button type="primary" shape="round" onClick={() => onSignup()}>
              SignUp
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SignupScreen;
