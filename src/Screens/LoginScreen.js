import { Col, Form, Row, Input, Button, message, Modal } from "antd";
import React, { useState, useContext } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axiosInstance from "../axiosInstance";
import { UserContext } from "../globalContext";
import logo from "../../src/images/logo.jpg";
const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useContext(UserContext);

  if (user.userId !== undefined && user.userId !== null) {
    //redict dashboard
    window.location.href = "HomeScreen";
  }

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

  const onForgotPassword = () => {
    setIsModalOpen(true);
    // window.location.href = "ForgotPassword";
  };

  const onSendResetCode = () => {
    axiosInstance
      .post("/login/email", { email: email })
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.responseCode === 1) {
          message.success("Code Senden On Your Email")
        } else message.error("Member Not Found");
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalOpen(false);
  };

  return (
    <Row>
      <Col span={13}>Welcome</Col>

      <Col span={11}>
        <div className="login-page-form">
          <Row>
            <Col span={15}>
              <img
                src={logo}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
            </Col>
            <Col span={5}>
              <h1 className="login-page-form">Login</h1>
            </Col>
          </Row>
          <Form
            name="basic"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 16,
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSignin();
              }
            }}
          >
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  colon={false}
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input Valid Email!",
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
              <Col span={20}>
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
                  <Input.Password
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={5}>
              <Col span={13}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => onSignin()}
                >
                  Sign-in
                </Button>
              </Col>
              <Col span={5}>
                <Button type="secondary" onClick={() => onSignup()}>
                  Sign-up
                </Button>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Button type="link" onClick={() => onForgotPassword()}>
                  ForgotPassword
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
      <div>
        <Modal
          title="Verify Email"
          open={isModalOpen}
          okText="Send Reset Code"
          onOk={() => onSendResetCode()}
          onCancel={() => setIsModalOpen(false)}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Row gutter={20}>
              <Col span={18}>
                <Form.Item
                  colon={false}
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Please input Valid Email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus={true}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
      <Col span={2}>
        <div className="login-right-bg"></div>
      </Col>
    </Row>
  );
};

export default LoginScreen;
