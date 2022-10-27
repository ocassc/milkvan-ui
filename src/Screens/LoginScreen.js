import { Col, Form, Row, Input, Button, message } from "antd";
import React, { useState } from "react";
import axiosInstance from "../axiosInstance";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignin = () => {
    axiosInstance
      .post("/login", { email: email, password: password })
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.responseCode === 1) {
          localStorage.setItem("authtoken", JSON.stringify(res.data.auth));
          window.location.href = "HomeScreen";
        } else message.error("Member Not Found");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSignup = () => {
    window.location.href = "SignupScreen";
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col span={15}></Col>

      <Col span={7}>
        <div className="login-page-form">
          <h1 className="head">Login</h1>
          <Form
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSignin();
              }
            }}
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
              <Col span={16}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email "
                    autoFocus={true}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={16}>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={7}>
                <Button type="link" onClick={() => onSignup()}>
                  Sign-up
                </Button>
              </Col>

              <Col span={7}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => onSignin()}
                >
                  Sign-in
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
      <Col span={1}>
        <div className="login-right-bg"></div>
      </Col>
    </Row>
  );
};

export default LoginScreen;
