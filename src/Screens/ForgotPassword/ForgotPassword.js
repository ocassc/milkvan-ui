import React,{ useState } from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { PageTitle } from "../../PageTitle";


const ForgotPassword = () => {
const [password, setPassword]=useState("");



  const onSetPassword=()=>{
message.success("Password Changed Successfully")
  }
  return (
    <div>
      <Row>
        <Col span={10}>
          <PageTitle title="Forgot Password"></PageTitle>
        </Col>
      </Row>
      <div>
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
              <Col span={20}>
                <Form.Item
                  colon={false}
                  label="New Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your New Password!",
                    },
                  ]}
                >
                  <Input.Password
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  colon={false}
                  label="Confirm Password"
                  name="Confirm Password"
                  rules={[
                    {
                      required: true,
                      message: "Please Confirm Password!",
                    },
                  ]}
                >
                 <Input.Password
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Confirm Password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Col>
            </Row>

          <Row gutter={20}>
            <Col span={15}>
              <Button type="primary" htmlType="submit" onClick={() => onSetPassword()}>
                Set Password
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
