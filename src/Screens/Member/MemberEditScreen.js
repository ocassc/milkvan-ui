import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";
import { Col, Form, Row, Input, Button, message } from "antd";

const MemberEditScreen = () => {
  let { id } = useParams();

  var memberObj = {
    id: id,
    email: "",
    mobile: "",
    name: "",
    address: "",
  };
  const [memberData, setMemberData] = useState(memberObj);

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
    axiosInstance.put(`/member/${id}`, memberData).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record Update successfully");
        window.location.href = "MemberListScreen";
      } else message.error("Something wrong. Please try again...!");
    });
  };

  const onEmailChange = (e) => {
    setMemberData({ ...memberData, email: e.target.value });
  };
  const onNameChange = (e) => {
    setMemberData({ ...memberData, name: e.target.value });
  };
  const onMobileChange = (e) => {
    setMemberData({ ...memberData, mobile: e.target.value });
  };
  const onAddressChange = (e) => {
    setMemberData({ ...memberData, address: e.target.value });
  };
  return (
    <Row>
      <Col span={15}></Col>
      <Col span={10}>
        <div>
          <h1 className="head">Edit-Member</h1>
          <Form
           
          >
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Name">
                  <Input
                    placeholder="Name"
                    onChange={onNameChange}
                    value={memberData.name}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Email">
                  <Input
                    placeholder="Email"
                    onChange={onEmailChange}
                    value={memberData.email}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Mobile">
                  <Input
                    placeholder="Mobile"
                    onChange={onMobileChange}
                    value={memberData.mobile}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Address">
                  <Input
                    placeholder="Address"
                    onChange={onAddressChange}
                    value={memberData.address}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={12}>
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
