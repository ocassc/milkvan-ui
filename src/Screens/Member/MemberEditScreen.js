import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";
import { Col, Form, Row, Input, Button, message } from "antd";

const MemberEditScreen = () => {
  const [memberData, setMemberData] = useState({});
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  let { id } = useParams();
  useEffect(() => {
    let mounted = true;
    if (mounted) onReadMember(id);
    return () => (mounted = false);
  }, []);
  const onReadMember = (id) => {
    axiosInstance.get(`/member/${id}`).then((response) => {
      setMemberData(response.data.data);
      console.log(response.data.data);
    });
  };

  const onUpdateMember = () => {
    axiosInstance.put(`/member/${id}`).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record Update successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };
  return (
    <Row>
      <Col span={15}></Col>

      <Col span={7}>
        <div className="login-page-form">
          <h1 className="head">Edit-Member</h1>
          <Form>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Name">
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
                <Form.Item colon={false} label="Email">
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
                <Form.Item colon={false} label="Mobile">
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
                <Form.Item colon={false} label="Address">
                  <Input
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={7}>
                <Button type="primary" onClick={() => onUpdateMember()}>
                  Save
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
export default MemberEditScreen;
