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
          localStorage.setItem("authtoken", res.data.auth);
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

  return (
    <Row>
      <Col span={15}></Col>

      <Col span={7}>
        <div className="login-page-form">
          <h1 className="head">Login</h1>
          <Form>
            <Row gutter={20}>
              <Col span={16}>
                <Form.Item colon={false}>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email "
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={16}>
                <Form.Item colon={false}>
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
                <Button type="primary" onClick={() => onSignin()}>
                  Sign-in
                </Button>
              </Col>
              <Col span={7}>
                <Button type="link" onClick={() => onSignup()}>
                  Sign-up
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
