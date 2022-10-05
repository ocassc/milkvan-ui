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
    <div>
      <div
        style={{
          margin: "50px",
        }}
      >
        <h1
          style={{
            margin: "10px",
            fontWeight: "bold",
            fontSize: "40px",
          }}
        >
          Create New Account
        </h1>
      </div>

      <div>
        <div>
          <Form
            style={{
              position: "relative",
              zindex: "5",
              left: "38%",
              overflow: "initial",
              width: "500px",
            }}
          >
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false}>
                  <Input
                    style={{
                      width: "200px",
                      borderRadius: "25px",
                    }}
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
                    style={{
                      width: "200px",
                      borderRadius: "25px",
                    }}
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
                    style={{
                      width: "200px",
                      borderRadius: "25px",
                    }}
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
                    style={{
                      width: "200px",
                      borderRadius: "25px",
                    }}
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
                    style={{
                      width: "200px",
                      borderRadius: "25px",
                    }}
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
                  Signin
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
