import { Col, Form, Row, Input, Button, message } from "antd";
import React, { useState } from "react";
import axiosInstance from "../axiosInstance";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const onSignin = () => {
    axiosInstance
      .post("/login",{email :email, password:password})
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.responseCode === 1) {
          message.success("Login Successfully");
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
    <div>
      <div
        style={{
          margin: "80px",
        }}
      >
        <h1
          style={{
            margin: "30px",
            fontWeight: "bold",
            fontSize: "40px",
          }}
        >
          Sign in
        </h1>
      </div>
      <div>
        <div className="form-group">
          <Form
            style={{
              position: "relative",
              zindex: "2",
              left: "34%",

              overflow: "initial",
              width: "500px",
            }}
          >
           
            <Row gutter={20}>
              <Col span={16}>
                <Form.Item colon={false}>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
      
                    style={{
                      width: "200px",
                      borderRadius: "25px",
                    }}
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
                    style={{
                      width: "200px",
                      borderRadius: "25px",
                    }}
                    placeholder="Password"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={16}>
                <Button type="primary" shape="round" onClick={() => onSignin()}>
                  Sign-in
                </Button>
              </Col>
            </Row>
            <Row gutter={20} style={{ marginTop: "10px" }}>
              <Col span={16}>
                <h3>Create New Account</h3>
              </Col>
            </Row>
            <Row gutter={20} style={{ marginTop: "10px" }}>
              <Col span={16}>
                <Button type="primary" shape="round" onClick={() => onSignup()}>
                  Sign-up
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
