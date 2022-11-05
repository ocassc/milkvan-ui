import { Col, Form, Row, Input, Button, message } from "antd";
import React, { useState, useContext } from "react";
import axiosInstance from "../axiosInstance";
import { UserContext } from "../globalContext";
const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useContext(UserContext);


  if(user.userId !== undefined && user.userId !== null)
  {
    //redict dashboard
    window.location.href="HomeScreen"
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

  return (
    <Row>
      <Col span={12}></Col>

      <Col span={11}>
        <div className="login-page-form">
          <h1 className="head">Login</h1>
          <Form
            name="basic"
            labelCol={{
              span: 10,
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
                  <Input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={7}>
                <Button type="primary" onClick={() => onSignup()}>
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
