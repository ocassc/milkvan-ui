import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { PageTitle } from "../../PageTitle";

const ForgotPassword = () => {



  const onResetCode=()=>{
alert("Enter OTP")
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
            <Col span={12}>
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
                <Input placeholder="Email Address" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={15}>
              <Button type="primary" htmlType="submit" onClick={() => onResetCode()}>
                Send Reset Code
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
